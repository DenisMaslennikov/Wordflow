from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Blog(models.Model):
    """Модель блога."""

    slug = models.SlugField(unique=True, max_length=100, help_text="Имя блога для url")
    title = models.CharField(unique=True, max_length=255, help_text="Заголовок блога")
    description = models.CharField(max_length=500, null=True, blank=True, help_text="Описание блога")

    authors = models.ManyToManyField(User, related_name="blogs", help_text="Авторы блога", through="BlogAuthor")

    def __str__(self):
        return self.title


class BlogAuthor(models.Model):
    """Модель для связи авторов с блогом."""

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        help_text="Идентификатор автора",
    )
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, help_text="Идентификатор блога")
    added_at = models.DateTimeField(auto_now_add=True, help_text="Когда добавлен")

    def __str__(self):
        return f"{self.blog} - {self.user}: {self.added_at}"
