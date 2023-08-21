from django.db import models
from django.contrib.auth.models import AbstractUser


class App_user(AbstractUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField()
    last_name = models.CharField()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
