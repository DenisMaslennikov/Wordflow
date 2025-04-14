from rest_framework import permissions

from blogs.models import Blog


class IsOwnerOrReadOnly(permissions.BasePermission):
    """Владелец блога или только чтение."""

    def has_permission(self, request, view):
        """Проверяет что только зарегистрированный пользователь может создавать блоги."""
        if request.method == "POST":
            return request.user and request.user.is_authenticated
        return True

    def has_object_permission(self, request, view, obj: Blog):
        """Проверяет наличие прав на объект."""
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user in obj.authors.all()
