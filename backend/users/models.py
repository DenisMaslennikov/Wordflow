from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    """Менеджер пользователей."""

    def create_user(self, email, password=None, **extra_fields):
        """Создание пользователя."""
        if not email:
            raise ValueError("Email обязателен")
        if extra_fields.get("is_staff"):
            raise ValueError("Пользователь не может иметь статус is_staff.")
        if extra_fields.get("is_superuser"):
            raise ValueError("Пользователь не может иметь статус is_superuser.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """Создание суперпользователя."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Суперпользователь должен иметь is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Суперпользователь должен иметь is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser):
    """Модель пользователя."""

    bio = models.TextField(blank=True, null=True, help_text="О себе")
    email = models.EmailField(unique=True, help_text="Email")
    username = models.CharField(max_length=30, unique=True, help_text="Имя пользователя", null=False)
    first_name = models.CharField(max_length=30, blank=True, help_text="Имя")
    last_name = models.CharField(max_length=30, blank=True, help_text="Фамилия")
    is_active = models.BooleanField(default=True, help_text="Пользователь активен")
    is_staff = models.BooleanField(default=False, help_text="Персонал")
    is_superuser = models.BooleanField(default=False, help_text="Суперпользователь")
    date_joined = models.DateTimeField(auto_now_add=True, help_text="Дата регистрации")
    avatar = models.ImageField(help_text="Аватар пользователя", upload_to="users", null=True, blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
