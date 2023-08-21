from django.urls import path
from .views import All_Recipes, A_Recipe

urlpatterns = [
    path("", All_Recipes.as_view()),
    path("<int:recipe_book_id>/", All_Recipes.as_view()),
    path("create/", A_Recipe.as_view()),
    path("<int:recipe_id>/", A_Recipe.as_view()),
    path("<int:recipe_book_id>/<int:recipe_id>/", A_Recipe.as_view()),
]
