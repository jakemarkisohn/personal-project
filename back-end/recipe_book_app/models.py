from django.db import models
from user_app.models import App_user

# Create your models here.


class Recipe_book(models.Model):
    user = models.ForeignKey(
        App_user, on_delete=models.CASCADE, related_name="recipe_book"
    )
    title = models.CharField(max_length=255, unique=True)
