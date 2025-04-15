from rest_framework import permissions
from rest_framework.request import Request
from rest_framework.viewsets import ModelViewSet

from blogs.models import BlogAuthor
from posts.models import Post
from utils.constants import AUTHOR_ROLES


class IsBlogAuthorOrForbidden(permissions.BasePermission):
    """Автор/Администратор блога или запрещено."""

    def has_object_permission(self, request: Request, view: ModelViewSet, obj: Post) -> bool:
        """Права на конкретный пост."""
        if (
            request.user
            and request.user.is_authenticated
            and BlogAuthor.objects.filter(blog=obj.blog, role__in=AUTHOR_ROLES, user_id=request.user.id).exists()
        ):
            return True
        return False

    def has_permission(self, request: Request, view: ModelViewSet) -> bool:
        """Права на эндпоинты."""
        blog_id = view.kwargs.get("blog_id") or request.query_params.get("blog_id")
        if not blog_id or not request.user.is_authenticated:
            return False
        return BlogAuthor.objects.filter(blog_id=blog_id, user_id=request.user.id, role__in=AUTHOR_ROLES).exists()
