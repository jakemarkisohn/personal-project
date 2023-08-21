from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.serializers import serialize
from django.shortcuts import get_object_or_404
import json
from rest_framework.status import (
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


# Create your views here.

from .models import Recipe
from .serializers import RecipeSerializer

from recipe_book_app.models import Recipe_book


# View all recipes
class All_Recipes(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # View all recipes a user has has to a recipe book - search by recipe book id
    def get(self, request, recipe_book_id):
        try:
            recipe_book = Recipe_book.objects.get(pk=recipe_book_id)
        except:
            return Response(
                "error:" f"Recipe book with ID {recipe_book_id} was not found"
            )
        recipes = recipe_book.recipes.all()
        serialized_recipes = RecipeSerializer(recipes, many=True)
        return Response(serialized_recipes.data, status=HTTP_200_OK)


class A_Recipe(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # View a specific recipe a user has saved - search for recipe book id and recipe id
    def get(self, request, recipe_book_id, recipe_id):
        try:
            recipe_book = Recipe_book.objects.get(pk=recipe_book_id)
        except:
            return Response(
                "error:" f"Recipe book with ID {recipe_book_id} was not found"
            )
        recipe = get_object_or_404(recipe_book.recipes, pk=recipe_id)
        serialized_recipe = RecipeSerializer(recipe)
        return Response(serialized_recipe.data, status=HTTP_200_OK)

    # User can create their own recipe - search for recipe book
    def post(self, request):
        print(request.data or "something")
        recipe_book_id = int(request.data.get("recipeData").get("recipe_book_id"))
        print("line 1")
        if not recipe_book_id:
            print("line 2")
            return Response(
                {"error": "recipe_book_id is required in the request data"},
                status=HTTP_400_BAD_REQUEST,
            )
        try:
            print("line 3")
            recipe_book = Recipe_book.objects.get(pk=recipe_book_id)
        except Recipe_book.DoesNotExist:
            print("line 4")
            return Response(
                {"error": f"RecipeBook with ID {recipe_book_id} not found"},
                status=HTTP_404_NOT_FOUND,
            )
        a_recipe = Recipe(recipe_book=recipe_book, **request.data.get("recipeData"))
        a_recipe.save()
        serializer = RecipeSerializer(a_recipe)
        return Response(serializer.data, status=HTTP_201_CREATED)

    # Delete a specific recipe from a specif book - search for recipe book id and recipe id
    def delete(self, request, recipe_book_id, recipe_id):
        a_recipe_book = get_object_or_404(request.user.recipe_book, id=recipe_book_id)
        a_recipe = get_object_or_404(Recipe, id=recipe_id, recipe_book=a_recipe_book)
        a_recipe.delete()
        return Response(status=HTTP_204_NO_CONTENT)

    # Update a specific recipe - search for recipe book id and recipe id
    def put(self, request, recipe_book_id, recipe_id):
        try:
            a_recipe_book = get_object_or_404(
                Recipe_book, id=recipe_book_id, user=request.user
            )
        except:
            return Response("Invalid Recipe Book ID", status=HTTP_400_BAD_REQUEST)
        a_recipe = get_object_or_404(Recipe, id=recipe_id, recipe_book=a_recipe_book)
        serialized_recipe = RecipeSerializer(a_recipe, data=request.data)
        if serialized_recipe.is_valid():
            serialized_recipe.save()
            return Response(serialized_recipe.data, status=HTTP_204_NO_CONTENT)
        else:
            return Response("Invalid Recipe ID", status=HTTP_400_BAD_REQUEST)
