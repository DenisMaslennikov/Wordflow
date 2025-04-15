from rest_framework import serializers

from tags.models import Tag
from utils.tools import tag_slugify


class TagSerializer(serializers.ModelSerializer):
    """Сериализатор тегов."""

    id = serializers.IntegerField(read_only=True)
    slug = serializers.CharField(read_only=True)

    class Meta:
        """Метакласс сериализатора."""

        model = Tag
        fields = ("id", "name", "slug")

    def validate_name(self, name):
        """Валидация уникальности тега."""
        if Tag.objects.filter(name=name).exists():
            raise serializers.ValidationError({"name": "Тег с таким именем уже есть"})
        slug = tag_slugify(name)
        if Tag.objects.filter(slug=slug).exists():
            raise serializers.ValidationError({"slug": "Тег с таким слагом уже есть"})
        return name
