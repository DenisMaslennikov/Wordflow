from rest_framework import permissions
from rest_framework.request import Request
from rest_framework.viewsets import ModelViewSet

from blogs.models import Blog
from posts.models import Post


class IsBlogAuthorOrForbidden(permissions.BasePermission):
    """Автор блога или запрещено."""

    def has_object_permission(self, request: Request, view: ModelViewSet, obj: Post) -> bool:
        """Права на конкретный пост."""
        if request.user and request.user.is_authenticated and request.user in obj.blog.authors.all():
            return True
        return False

    def has_permission(self, request: Request, view: ModelViewSet) -> bool:
        """Права на эндпоинты."""
        blog_id = view.kwargs.get("blog_id") or request.query_params.get("blog_id")
        if not blog_id or not request.user.is_authenticated:
            return False
        return Blog.objects.filter(id=blog_id, authors=request.user).exists()
