from django.utils.text import Truncator
from rest_framework import serializers

from api.v1.tags.serializers import TagSerializer
from api.v1.users.serializers import UsernameUserSerializer
from posts.models import Post


class PostListSerializer(serializers.ModelSerializer):

    user = UsernameUserSerializer(read_only=True)
    content = serializers.SerializerMethodField()
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ("id", "user", "slug", "title", "content", "published_at", "tags")

    def get_content(self, obj):
        return Truncator(obj.content).words(30)


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
