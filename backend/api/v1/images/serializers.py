from rest_framework import serializers

from api.v1.users.serializers import UsernameAvatarUserSerializer
from images.models import Image


class ImageSerializer(serializers.ModelSerializer):
    """Сериализатор модели Image."""

    id = serializers.IntegerField(read_only=True)
    user = UsernameAvatarUserSerializer(read_only=True)

    class Meta:
        """Мета класс сериализатора Image."""

        model = Image
        fields = ("id", "image", "alt", "user")


class ImageShortSerializer(serializers.ModelSerializer):
    """Короткий сериализатор модели Image."""

    id = serializers.IntegerField(read_only=True)

    class Meta:
        """Мета класс сериализатора Image."""

        model = Image
        fields = (
            "id",
            "image",
            "alt",
        )
