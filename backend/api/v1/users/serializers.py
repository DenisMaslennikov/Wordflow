from django.contrib.auth import get_user_model
from rest_framework import exceptions, serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    """Кастомный сериализатор для получения пары токенов по refresh токену."""

    def validate(self, attrs):
        """Валидация и создание токенов."""
        data = super().validate(attrs)

        # Создаем новый refresh token
        refresh = RefreshToken(attrs["refresh"])
        new_refresh = str(refresh)

        # Добавляем его в ответ
        data["refresh"] = new_refresh
        return data


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Сериализатор получения пару токенов (access & refresh)."""

    def validate(self, attrs):
        """Валидация пользователя."""
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = User.objects.filter(email=email).first()

            if user and user.check_password(password):
                if not user.is_active:
                    raise exceptions.AuthenticationFailed("Пользователь не активен.")

                data = super().validate({self.username_field: email, "password": password})
                return data
            else:
                raise exceptions.AuthenticationFailed("Неверный email или пароль.")
        else:
            raise exceptions.AuthenticationFailed("Не указан email или пароль.")

    @classmethod
    def get_token(cls, user):
        """Получение токена."""
        token = super().get_token(user)
        token["email"] = user.email
        return token


class UsernameAvatarUserSerializer(serializers.ModelSerializer):
    """Сериализатор для случаев когда требуется только имя пользователя и аватар."""

    class Meta:
        """Метакласс сериализатора."""

        model = User
        fields = ("id", "username", "avatar")


class UserSerializer(serializers.ModelSerializer):
    """Сериализатор пользователя."""

    id = serializers.IntegerField(read_only=True)
    password = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(write_only=True, required=True)
    avatar = serializers.ImageField(required=False)

    class Meta:
        """Метакласс сериализатора пользователя."""

        model = User
        fields = ("id", "username", "email", "password", "first_name", "last_name", "bio", "avatar")
        extra_kwargs = {
            "bio": {"required": False},
            "first_name": {"required": False},
            "last_name": {"required": False},
        }

    def create(self, validated_data):
        """Создание пользователя."""
        avatar = validated_data.pop("avatar")
        user = User.objects.create_user(**validated_data)
        if avatar:
            user.avatar = avatar
        user.save()
        return user

    def update(self, instance, validated_data):
        """Обновление пользователя."""
        password = validated_data.pop("password", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
