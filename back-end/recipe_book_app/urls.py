from django.urls import path
from .views import All_Recipe_Books, A_Recipe_Book

urlpatterns = [
    path("", All_Recipe_Books.as_view()),
    path("create/", A_Recipe_Book.as_view()),
    path("<int:recipe_book_id>/", A_Recipe_Book.as_view()),
]
