from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models

from blogs.models import Blog

User = get_user_model()


class Image(models.Model):
    """Модель для хранения изображений."""

    user = models.ForeignKey(
        User, on_delete=models.SET_DEFAULT, default=2, help_text="Идентификатор пользователя загрузившего изображение"
    )
    blog = models.ForeignKey(
        Blog, on_delete=models.CASCADE, help_text="Идентификатор блога в который было загружено изображение"
    )
    alt = models.CharField(max_length=100, null=True, blank=True, help_text="Описание изображения")
    image = models.ImageField(upload_to="blog_images", help_text="Изображение")
