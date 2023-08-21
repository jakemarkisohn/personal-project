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

from .models import Recipe_book
from .serializers import RecipeBookSerializer


class All_Recipe_Books(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # View ALL recipe books
    def get(self, request):
        recipe_books = RecipeBookSerializer(
            Recipe_book.objects.filter(user=request.user).order_by("id"), many=True
        )
        return Response(recipe_books.data)


class A_Recipe_Book(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    # View A SPECIFIC recipe book
    def get(self, request, recipe_book_id):
        recipe_book = get_object_or_404(
            Recipe_book, id=recipe_book_id, user=request.user
        )
        serialized_recipe_book = RecipeBookSerializer(recipe_book)
        return Response(serialized_recipe_book.data)

    # Create new recipe book
    def post(self, request):
        request.data["user"] = request.user.id
        a_recipe_book = RecipeBookSerializer(data=request.data)
        if a_recipe_book.is_valid():
            a_recipe_book.save()
            return Response(a_recipe_book.data, status=HTTP_201_CREATED)
        return Response(a_recipe_book.errors, status=HTTP_400_BAD_REQUEST)

    # Delete entire recipe book
    def delete(self, request, recipe_book_id):
        a_recipe_book = get_object_or_404(
            Recipe_book, id=recipe_book_id, user=request.user
        )
        a_recipe_book.delete()
        return Response(status=HTTP_204_NO_CONTENT)

    # Update title of a recipe_book
    def put(self, request, recipe_book_id):
        try:
            a_recipe_book = get_object_or_404(
                request.user.recipe_book, id=recipe_book_id
            )
            a_recipe_book.title = request.data.get("title")
            a_recipe_book.save()
            return Response(status=HTTP_204_NO_CONTENT)
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)


# See all recipes inside of a recipe book
# class Recipe_Book_Contents(APIView):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]

#     def get(self, request, id):
#         a_recipe_book = get_object_or_404(Recipe_book, id=id, user=request.user)
#         return Response(
#             RecipeBookSerializer(
#                 a_recipe_book.recipes.order_by("id"),
#                 many=True,
#             ).data
#         )
