from django.contrib.auth import get_user_model
from django.db import models

from tags.models import Tag
from blogs.models import Blog

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

    tags = models.ManyToManyField(Tag, related_name="posts", through="PostTag", help_text="Теги")

    def __str__(self):
        return self.title


class PostTag(models.Model):
    """Модель для связи постов и тегов."""

    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, help_text="Идентификатор тега")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, help_text="Идентификатор Поста")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.tag} - {self.post}"
