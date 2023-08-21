from rest_framework import serializers
from .models import Recipe_book


class RecipeBookSerializer(serializers.ModelSerializer):
    recipes = serializers.SerializerMethodField()

    class Meta:
        model = Recipe_book
        fields = ["id", "user", "title", "recipes"]

    def get_recipes(self, instance):
        recipes = instance.recipes.all()
        recipe_titles = [recipe.title for recipe in recipes]
        return recipe_titles
