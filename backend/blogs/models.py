from django.db import models

# Create your models here.


class Blogs(models.Model):
    """Модель блога."""

    slug = models.SlugField(unique=True, max_length=100, help_text="Имя блога для url")
    title = models.CharField(unique=True, max_length=255, help_text="Заголовок блога")
    description = models.CharField(max_length=500, null=True, blank=True, help_text="Описание блога")
