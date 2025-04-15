from django.utils.text import Truncator
from rest_framework import serializers

from api.v1.tags.serializers import TagSerializer
from api.v1.users.serializers import UsernameUserSerializer
from config.constants import POST_STATUS_PUBLISHED, POST_STATUS_DRAFT
from posts.models import Post


class PostListSerializer(serializers.ModelSerializer):

    user = UsernameUserSerializer(read_only=True)
    content = serializers.SerializerMethodField()
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ("id", "user", "slug", "title", "content", "published_at", "tags")

    def get_content(self, obj) -> str:
        return Truncator(obj.content).words(30)


class PostListWithStatusSerializer(serializers.ModelSerializer):

    user = UsernameUserSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ("id", "user", "slug", "title", "published_at", "tags", "status")


class PostDetailedSerializer(serializers.ModelSerializer):

    user = UsernameUserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = (
            "id",
            "user",
            "slug",
            "title",
            "content",
            "published_at",
        )


class PostForAuthorSerializer(serializers.ModelSerializer):
    user = UsernameUserSerializer(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
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
