from django.utils.text import Truncator
from rest_framework import serializers

from api.v1.blogs.serializers import BlogListSerializer
from api.v1.images.serializers import ImageShortSerializer
from api.v1.tags.serializers import TagSerializer
from api.v1.users.serializers import UsernameAvatarUserSerializer
from posts.models import Post
from tags.models import Tag
from utils.constants import POST_STATUS_DRAFT, POST_STATUS_PUBLISHED, TRUNCATE_TEXT_IN_POST_LIST_TO_WORDS


class PostListSerializer(serializers.ModelSerializer):
    """Сериализатор списка постов."""

    user = UsernameAvatarUserSerializer(read_only=True)
    content = serializers.SerializerMethodField()
    tags = TagSerializer(many=True, read_only=True)
    blog = BlogListSerializer(read_only=True)
    preview = ImageShortSerializer(read_only=True)

    class Meta:
        """Метаклас сериализатора списка постов."""

        model = Post
        fields = ("id", "user", "slug", "title", "content", "published_at", "tags", "blog", "preview")

    def get_content(self, obj) -> str:
        """Получение поля content для списка постов."""
        return Truncator(obj.content).words(30)


class MainPagePostListSerializer(serializers.ModelSerializer):
    """Сериализатор списка постов для главной страницы."""

    user = UsernameAvatarUserSerializer(read_only=True)
    content = serializers.SerializerMethodField()
    tags = TagSerializer(many=True, read_only=True)
    blog = BlogListSerializer(read_only=True)

    class Meta:
        """Метаклас сериализатора списка постов для главной страницы."""

        model = Post
        fields = ("id", "user", "slug", "title", "content", "published_at", "tags", "blog")

    def get_content(self, obj) -> str:
        """Получение поля content для списка постов."""
        return Truncator(obj.content).words(TRUNCATE_TEXT_IN_POST_LIST_TO_WORDS, html=True)


class PostListWithStatusSerializer(serializers.ModelSerializer):
    """Сериализатор поста со статусом."""

    user = UsernameAvatarUserSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        """Метакласс сериализатора поста со статусом."""

        model = Post
        fields = ("id", "user", "slug", "title", "published_at", "tags", "status")


class PostDetailedSerializer(serializers.ModelSerializer):
    """Сериализатор детального просмотра поста."""

    user = UsernameAvatarUserSerializer(read_only=True)
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

    user = UsernameAvatarUserSerializer(read_only=True)
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
        instance = self.instance
        blog_id = self.context["view"].kwargs.get("blog_id")
        slug = attrs.get("slug")

        if slug is None:
            return attrs

        qs = Post.objects.filter(blog_id=blog_id, slug=slug)

        if instance:
            qs = qs.exclude(pk=instance.pk)

        if qs.exists():
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
        tags = validated_data.pop("tag_ids", None)
        post = super().update(instance, validated_data)
        if tags is not None:
            if set(tags) != set(instance.tags.all()):
                instance.tags.set(tags)
        return post
