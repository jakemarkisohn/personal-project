from django.urls import path
from .views import Log_in, Register, Log_out, Info

urlpatterns = [
    path("", Info.as_view()),
    path("register/", Register.as_view()),
    path("login/", Log_in.as_view()),
    path("logout/", Log_out.as_view()),
]
