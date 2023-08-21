from rest_framework import serializers
from .models import Recipe


class RecipeSerializer(serializers.ModelSerializer):
    recipe_book = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = [
            "id",
            "recipe_book",
            "title",
            "ingredients",
            "instructions",
            "time",
            "category",
        ]

    def get_recipe_book(self, obj):
        return obj.title
