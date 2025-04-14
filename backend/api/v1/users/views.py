from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import CustomTokenObtainPairSerializer, RegisterSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    """Представление получения пары токенов (refresh & access)."""

    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    """Представление регистрации пользователей."""

    serializer_class = RegisterSerializer
