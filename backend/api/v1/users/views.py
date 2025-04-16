from django.contrib.auth import get_user_model
from rest_framework import generics, viewsets, parsers, renderers
from rest_framework_simplejwt.views import TokenObtainPairView

from .permissions import IsMeOrReadOnly
from .serializers import CustomTokenObtainPairSerializer, UserSerializer

User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    """Представление получения пары токенов (refresh & access)."""

    serializer_class = CustomTokenObtainPairSerializer


class UserViewSet(viewsets.ModelViewSet):
    """Вьюсет пользователя."""

    queryset = User.objects.all()
    parser_classes = (parsers.MultiPartParser, parsers.FormParser)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = UserSerializer
    permission_classes = (IsMeOrReadOnly,)
