from rest_framework import permissions

from blogs.models import BlogAuthor
from comments.models import Comment
from utils.constants import ADMINISTRATOR_ROLE_ID


class IsAuthorOrAdminOrReadOnly(permissions.BasePermission):
    """Только автор и администратор имеет право редактировать/удалять комментарии."""

    def has_object_permission(self, request, view, obj: Comment):
        """Права на комментарий."""
        if request.method in permissions.SAFE_METHODS:
            return True

        if (
            request.user
            and request.user.is_authenticated
            and (
                obj.user == request.user
                or BlogAuthor.objects.filter(
                    user=request.user, role_id=ADMINISTRATOR_ROLE_ID, blog_id=obj.post.blog_id
                ).exists()
            )
        ):
            return True
        return False

    def has_permission(self, request, view):
        """Права на эндпоинты."""
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user and request.user.is_authenticated:
            return True
        return False
