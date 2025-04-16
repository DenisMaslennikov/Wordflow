from rest_framework import serializers

from roles.models import Role


class RoleSerializer(serializers.ModelSerializer):
    """Сериализатор ролей."""

    class Meta:
        """Мета класс сериализатора ролей."""

        model = Role
        fields = "id", "name"
