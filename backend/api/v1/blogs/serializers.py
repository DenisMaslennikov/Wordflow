from rest_framework import serializers

from api.v1.users.serializers import UsernameUserSerializer
from blogs.models import Blog


class BlogDetailedSerializer(serializers.ModelSerializer):
    """Детальный сериализатор для модели Blog."""

    id = serializers.IntegerField(read_only=True)
    authors = UsernameUserSerializer(many=True, read_only=True)

    class Meta:
        """Метакласс сериализатора."""

        model = Blog
        fields = ("id", "slug", "title", "description", "authors", "created_at")


class BlogCreateUpdateSerializer(serializers.ModelSerializer):
    """Сериализатор для операций записи модели Blog."""

    id = serializers.IntegerField(read_only=True)
    authors = UsernameUserSerializer(many=True, read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        """Метакласс сериализатора."""

        model = Blog
        fields = ("slug", "title", "description", "created_at", "authors", "id")


class BlogListSerializer(serializers.ModelSerializer):
    """Сериализатор для списков модели Blog."""

    id = serializers.IntegerField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        """Метакласс сериализатора."""

        model = Blog
        fields = ("id", "title", "description", "created_at")
