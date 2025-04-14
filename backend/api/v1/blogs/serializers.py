from rest_framework import serializers

from blogs.models import Blog


class BlogSerializer(serializers.ModelSerializer):
    """Сериализатор для модели Blog."""

    id = serializers.IntegerField(read_only=True)

    class Meta:
        """Метакласс сериализатора."""

        model = Blog
        fields = ("id", "slug", "title", "description")
