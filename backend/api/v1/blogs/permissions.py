
from rest_framework import permissions

from blogs.models import Blog


class IsOwnerOrReadOnly(permissions.BasePermission):
    """Владелец блога или только чтение."""
    def has_object_permission(self, request, view, obj: Blog):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user in obj.authors.all()

