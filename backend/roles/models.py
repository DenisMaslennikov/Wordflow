from django.db import models


class Role(models.Model):
    """Модель ролей пользователя."""

    name = models.CharField(help_text="Название роли", max_length=15)
