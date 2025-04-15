from django.utils.text import Truncator
from rest_framework import serializers

from api.v1.tags.serializers import TagSerializer
from api.v1.users.serializers import UsernameUserSerializer
from posts.models import Post
from tags.models import Tag
from utils.constants import POST_STATUS_DRAFT, POST_STATUS_PUBLISHED


class PostListSerializer(serializers.ModelSerializer):
    """Сериализатор списка постов."""

    user = UsernameUserSerializer(read_only=True)
    content = serializers.SerializerMethodField()
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        """Метаклас сериализатора списка постов."""

        model = Post
        fields = ("id", "user", "slug", "title", "content", "published_at", "tags")

    def get_content(self, obj) -> str:
        """Получение поля content для списка постов."""
        return Truncator(obj.content).words(30)


class PostListWithStatusSerializer(serializers.ModelSerializer):
    """Сериализатор поста со статусом."""

    user = UsernameUserSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        """Метакласс сериализатора поста со статусом."""

        model = Post
        fields = ("id", "user", "slug", "title", "published_at", "tags", "status")


class PostDetailedSerializer(serializers.ModelSerializer):
    """Сериализатор детального просмотра поста."""

    user = UsernameUserSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        """Метаклас сериализатора детального просмотра поста."""

        model = Post
        fields = (
            "id",
            "user",
            "slug",
            "title",
            "content",
            "published_at",
            "tags",
        )


class PostForAuthorSerializer(serializers.ModelSerializer):
    """Сериализатор постов для авторов."""

    user = UsernameUserSerializer(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(many=True, queryset=Tag.objects.all(), write_only=True, required=False)

    class Meta:
        """Метакласс сериализатора постов для автора."""

        model = Post
        fields = (
            "id",
            "user",
            "slug",
            "title",
            "content",
            "published_at",
            "created_at",
            "updated_at",
            "status",
            "tags",
            "tag_ids",
        )

    def validate(self, attrs):
        """Валидация уникальности слага для блога."""
        blog_id = self.context["view"].kwargs.get("blog_id")
        slug = attrs.get("slug")

        # Проверяем существование поста с таким slug в этом блоге
        if Post.objects.filter(blog_id=blog_id, slug=slug).exists():
            raise serializers.ValidationError({"slug": "Пост с таким slug уже существует в этом блоге"})

        return attrs

    def validate_status(self, status):
        """Валидируем что у поля статус допустимое значение."""
        if status not in [POST_STATUS_PUBLISHED, POST_STATUS_DRAFT]:
            raise serializers.ValidationError(
                {"status": "Недопустимое значение поля status может быть только Published или Draft"}
            )
        return status

    def create(self, validated_data):
        """Создание нового поста."""
        tags = validated_data.pop("tag_ids", [])
        post = super().create(validated_data)
        post.tags.set(tags)
        return post

    def update(self, instance, validated_data):
        """Обновление поста."""
        tags = validated_data.pop("tag_ids", [])
        post = super().update(instance, validated_data)
        post.tags.set(tags)
        return post
