from rest_framework import serializers

from blogs.models import Blog


class BlogSerializer(serializers.ModelSerializer):
    """Сериализатор для модели Blog."""

    class Meta:
        """Метакласс сериализатора."""

        model = Blog
        fields = ("slug", "title", "description")
