from rest_framework import viewsets

from api.v1.comments.permissions import IsAuthorOrAdminOrReadOnly
from api.v1.comments.serializers import CommentSerializer
from comments.models import Comment


class CommentViewSet(viewsets.ModelViewSet):
    """Вьюсет комментариев."""

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthorOrAdminOrReadOnly,)

    def get_queryset(self):
        """Получение кверисета в зависимости от id поста."""
        return Comment.objects.filter(post_id=self.kwargs["post_id"])

    def perform_create(self, serializer):
        """Создание комментария."""
        serializer.save(user=self.request.user, post_id=self.kwargs["post_id"])

    def perform_update(self, serializer):
        """Обновление комментария."""
        serializer.save(edited=True)
