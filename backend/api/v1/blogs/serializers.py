from django.contrib.auth import get_user_model
from rest_framework import serializers

from api.v1.roles.serializers import RoleSerializer
from api.v1.users.serializers import UsernameAvatarUserSerializer
from blogs.models import Blog, BlogAuthor
from roles.models import Role

User = get_user_model()


class BlogDetailedSerializer(serializers.ModelSerializer):
    """Детальный сериализатор для модели Blog."""

    id = serializers.IntegerField(read_only=True)
    authors = UsernameAvatarUserSerializer(many=True, read_only=True)

    class Meta:
        """Метакласс сериализатора."""

        model = Blog
        fields = ("id", "slug", "title", "description", "authors", "created_at")


class BlogCreateUpdateSerializer(serializers.ModelSerializer):
    """Сериализатор для операций записи модели Blog."""

    id = serializers.IntegerField(read_only=True)
    authors = UsernameAvatarUserSerializer(many=True, read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        """Метакласс сериализатора."""

        model = Blog
        fields = ("slug", "title", "description", "created_at", "authors", "id")


class BlogListSerializer(serializers.ModelSerializer):
    """Сериализатор для списков модели Blog."""

    id = serializers.IntegerField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        """Метакласс сериализатора."""

        model = Blog
        fields = ("id", "title", "description", "created_at", "slug")


class BlogShortSerializer(serializers.ModelSerializer):
    """Сериализатор короткого представления блога."""

    id = serializers.IntegerField(read_only=True)

    class Meta:
        """Метакласс сериализатора."""

        model = Blog
        fields = ("id", "title", "slug")


class UserRoleListSerializer(serializers.ModelSerializer):
    """Сериализатор списка ролей пользователей."""

    id = serializers.IntegerField(read_only=True)
    user = UsernameAvatarUserSerializer(read_only=True)
    role = RoleSerializer(read_only=True)

    class Meta:
        """Метакласс сериализатора списка ролей пользователей."""

        model = BlogAuthor
        fields = ("id", "role", "user", "added_at")


class BlogUserRoleSerializer(serializers.ModelSerializer):
    """Сериализатор ролей пользователя для добавления роли пользователю."""

    user = serializers.PrimaryKeyRelatedField(many=False, queryset=User.objects.all(), write_only=True, required=True)
    role = serializers.PrimaryKeyRelatedField(many=False, queryset=Role.objects.all(), write_only=True, required=True)
    blog = serializers.PrimaryKeyRelatedField(many=False, queryset=Blog.objects.all(), write_only=True, required=False)

    class Meta:
        """Метаклас сериализатора добавления ролей пользователям."""

        model = BlogAuthor
        fields = ("user", "role", "blog")

    def validate(self, attrs):
        """Валидация роли пользователя в блоге."""
        if BlogAuthor.objects.filter(blog=attrs["blog"], user=attrs["user"], role_id=attrs["role"]).exists():
            raise serializers.ValidationError({"error": "Этот пользователь уже имеет такую роль"})
        return attrs

    # def create(self, validated_data):
    #     print(validated_data)


class UserRoleSerializer(serializers.ModelSerializer):
    """Сериализатор ролей пользователя для добавления роли пользователю."""

    user = serializers.PrimaryKeyRelatedField(many=False, queryset=User.objects.all(), write_only=True, required=True)
    role = serializers.PrimaryKeyRelatedField(many=False, queryset=Role.objects.all(), write_only=True, required=True)

    class Meta:
        """Метаклас сериализатора добавления ролей пользователям."""

        model = BlogAuthor
        fields = ("user", "role")
