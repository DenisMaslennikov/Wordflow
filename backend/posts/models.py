from django.contrib.auth import get_user_model
from django.db import models

from blogs.models import Blog
from utils.constants import POST_STATUS_PUBLISHED, POST_STATUS_DRAFT
from tags.models import Tag

User = get_user_model()

STATUSES = (
    (POST_STATUS_DRAFT, "Черновик"),
    (POST_STATUS_PUBLISHED, "Опубликованный"),
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

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["blog", "slug"],
                name="unique_blog_post_slug",
            ),
            models.CheckConstraint(
                check=models.Q(status__in=dict(STATUSES).keys()),
                name="check_valid_post_status",
                violation_error_message="Статус должен быть 'Draft' или 'Published'",
            ),
        ]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        """При сохранении проверяем что статус является допустимым значением."""
        if self.status not in dict(STATUSES).keys():
            raise ValueError(f"Invalid status value: {self.status}. Allowed values: {dict(STATUSES).keys()}")
        super().save(*args, **kwargs)


class PostTag(models.Model):
    """Модель для связи постов и тегов."""

    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, help_text="Идентификатор тега")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, help_text="Идентификатор Поста")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.tag} - {self.post}"
