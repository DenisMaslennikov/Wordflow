from django.db import models
from slugify import slugify


class Tag(models.Model):
    """Модель метки для постов."""

    name = models.CharField(max_length=30, help_text="Название тега", unique=True)
    slug = models.SlugField(max_length=40, help_text="Слаг", unique=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        """Сохранение модели."""
        self.slug = slugify(self.name, lowercase=True, max_length=40, separator="_", regex_pattern=r"[^\w-]")
        super().save(*args, **kwargs)
