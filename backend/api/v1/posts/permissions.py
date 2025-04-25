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
        blog_slug = view.kwargs.get("blog_slug") or request.query_params.get("blog_slug")
        if not blog_slug or not request.user.is_authenticated:
            return False
        return BlogAuthor.objects.filter(blog__slug=blog_slug, user_id=request.user.id, role__in=AUTHOR_ROLES).exists()
