from django.db import models


class Tag(models.Model):
    """Модель метки для постов."""

    name = models.CharField(max_length=30, help_text="Название тега", unique=True)
    slug = models.SlugField(max_length=40, help_text="Слаг", unique=True)

    def __str__(self):
        return self.name
