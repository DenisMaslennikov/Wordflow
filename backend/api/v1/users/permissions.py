from rest_framework import permissions


class IsMeOrReadOnly(permissions.BasePermission):
    """Пользователь может редактировать только себя."""

    def has_object_permission(self, request, view, obj):
        """Проверяяет права нв объект."""
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj == request.user
