from django.contrib.auth import get_user_model
from django.db import models

from backend.blogs.models import Blog

User = get_user_model()

STATUSES = (
    ("Draft", "Черновик"),
    ("Published", "Опубликованный"),
)


class Post(models.Model):
    """Модель поста."""

    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name="posts", help_text="Идентификатор блога")
    user = models.ForeignKey(User, on_delete=models.SET_DEFAULT, default=2, help_text="Идентификатор пользователя")
    slug = models.SlugField(max_length=270, help_text="Имя поста в ссылке")
    title = models.CharField(max_length=255, help_text="Заголовок поста")
    content = models.TextField(help_text="Содержимое поста")
    status = models.CharField(max_length=9, choices=STATUSES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.title
