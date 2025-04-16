from rest_framework import serializers

from comments.models import Comment


class CommentSerializer(serializers.ModelSerializer):
    """Серилазатор комментариев."""

    id = serializers.IntegerField(read_only=True)
    edited = serializers.BooleanField(read_only=True)

    class Meta:
        """Мета класс сериалзатора комментариев."""

        model = Comment
        fields = ("id", "content", "created_at", "edited")
