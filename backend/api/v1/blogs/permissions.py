from rest_framework import permissions
from rest_framework.request import Request

from blogs.models import Blog, BlogAuthor
from utils.constants import ADMINISTRATOR_ROLE_ID


class IsAdminOrReadOnly(permissions.BasePermission):
    """Администратор блога или только чтение."""

    def has_permission(self, request: Request, view):
        """Проверяет что только зарегистрированный пользователь может создавать блоги."""
        if request.method == "POST":
            return request.user and request.user.is_authenticated
        return True

    def has_object_permission(self, request, view, obj: Blog):
        """Проверяет наличие прав на объект."""
        if request.method in permissions.SAFE_METHODS:
            return True
        return BlogAuthor.objects.filter(user=request.user, role_id=ADMINISTRATOR_ROLE_ID).exists()


class IsAdminOrForbidden(permissions.BasePermission):
    """Администратор блога или запрещено."""

    def has_permission(self, request: Request, view):
        """Проверка прав на эндпоинт."""
        blog_id = view.kwargs.get("pk")
        return BlogAuthor.objects.filter(
            blog_id=blog_id, user_id=request.user.id, role_id=ADMINISTRATOR_ROLE_ID
        ).exists()
