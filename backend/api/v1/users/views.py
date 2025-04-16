from django.contrib.auth import get_user_model
from rest_framework import viewsets, parsers, renderers, mixins, decorators, filters
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .permissions import IsMeOrReadOnly
from .serializers import CustomTokenObtainPairSerializer, UserSerializer

User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    """Представление получения пары токенов (refresh & access)."""

    serializer_class = CustomTokenObtainPairSerializer


class UserViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.RetrieveModelMixin):
    """Вьюсет пользователя."""

    queryset = User.objects.all()
    parser_classes = (parsers.MultiPartParser, parsers.FormParser)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = UserSerializer
    permission_classes = (IsMeOrReadOnly,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ("username",)

    @decorators.action(detail=False, methods=["put", "patch", "get"], permission_classes=[IsMeOrReadOnly])
    def me(self, request):
        """Эндпоинты для реализации работы с профилем текущего пользователя."""

        user = request.user

        if request.method == "GET":
            serializer = UserSerializer(user)
            return Response(serializer.data)
        elif request.method == "PATCH":
            serializer = self.get_serializer(user, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        elif request.method == "PUT":
            serializer = self.get_serializer(user, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
