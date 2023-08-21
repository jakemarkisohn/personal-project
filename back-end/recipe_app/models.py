from django.db import models
from recipe_book_app.models import Recipe_book

# Create your models here.


class Recipe(models.Model):
    recipe_book = models.ForeignKey(
        Recipe_book, on_delete=models.CASCADE, related_name="recipes"
    )
    title = models.CharField(max_length=255, unique=True)
    ingredients = models.TextField()
    instructions = models.TextField()
    time = models.CharField(max_length=50)
    category = models.CharField(max_length=255)
