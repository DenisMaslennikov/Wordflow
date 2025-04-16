from django.contrib.auth import get_user_model
from django.db import models

from posts.models import Post

User = get_user_model()


class Comment(models.Model):
    """Класс комментария к посту."""

    post = models.ForeignKey(Post, on_delete=models.CASCADE, help_text="Пост к которому сделан комментарий")
    user = models.ForeignKey(User, on_delete=models.CASCADE, help_text="Пользователь сделавший комментарий")
    content = models.TextField(help_text="Содержимое комментария")
    created_at = models.DateTimeField(auto_now_add=True)
    edited = models.BooleanField(default=False)
