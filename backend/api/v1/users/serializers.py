from django.contrib.auth import get_user_model
from rest_framework import exceptions, serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Сериализатор получения пару токенов (access & refresh)."""

    def validate(self, attrs):
        """Валидация пользователя."""
        email = attrs.get("email")
        password = attrs.get("password")

        if email and password:
            user = get_user_model().objects.filter(email=email).first()

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


class RegisterSerializer(serializers.ModelSerializer):
    """Сериализатор регистрации пользователей."""

    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        """Метакласс серилизатора регистрации."""

        model = get_user_model()
        fields = ("email", "password", "username")

    def create(self, validated_data):
        """Создание нового пользователя."""
        user = get_user_model().objects.create_user(
            email=validated_data["email"], password=validated_data["password"], username=validated_data["username"]
        )
        return user

class UsernameUserSerializer(serializers.ModelSerializer):
    """Сериализатор для случаев когда требуется только имя пользователя."""

    class Meta:
        """Метакласс сериализатора."""
        model = get_user_model()
        fields = ("id", "username")
