from django.contrib.auth import get_user_model
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiResponse
from rest_framework import decorators, filters, mixins, parsers, renderers, viewsets, status
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .permissions import IsMeOrReadOnly
from .serializers import CustomTokenObtainPairSerializer, UserSerializer, CustomTokenRefreshSerializer, UserMeSerializer
from ..blogs.serializers import BlogListSerializer

User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    """Представление получения пары токенов (refresh & access)."""

    serializer_class = CustomTokenObtainPairSerializer

    @extend_schema(
        request=CustomTokenObtainPairSerializer,
        responses=TokenObtainPairSerializer,
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class CustomTokenRefreshView(TokenRefreshView):
    """Кастомный класс обновления токенов по refresh токену."""

    serializer_class = CustomTokenRefreshSerializer


class UserViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.RetrieveModelMixin):
    """Вьюсет пользователя."""

    queryset = User.objects.all()
    parser_classes = (parsers.MultiPartParser, parsers.FormParser)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = UserSerializer
    permission_classes = (IsMeOrReadOnly,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ("username",)

    @extend_schema(request=UserSerializer)
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @decorators.action(
        detail=False,
        methods=["put", "patch", "get"],
        permission_classes=[IsMeOrReadOnly],
        serializer_class=UserMeSerializer,
    )
    def me(self, request):
        """Эндпоинты для реализации работы с профилем текущего пользователя."""
        user = request.user

        if request.method == "GET":
            if user.is_anonymous:
                return Response(None, status=status.HTTP_401_UNAUTHORIZED)

            serializer = UserMeSerializer(user)
            return Response(serializer.data)
        elif request.method == "PATCH":
            if user.is_anonymous:
                return Response(
                    {"error": "Только авторизированный пользователь может редактировать свой профиль"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
            serializer = UserMeSerializer(user, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        elif request.method == "PUT":
            if user.is_anonymous:
                return Response(
                    {"error": "Только авторизированный пользователь может редактировать свой профиль"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
            serializer = UserMeSerializer(user, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

    @extend_schema(
        responses={
            200: OpenApiResponse(
                response=BlogListSerializer(many=True), description="Список блогов текущего пользователя"
            )
        }
    )
    @decorators.action(
        detail=False, methods=["get"], permission_classes=[IsMeOrReadOnly], serializer_class=BlogListSerializer
    )
    def me_blogs_list(self, request):
        """Эндпоинт для списка блогов текущего пользователя."""
        user = request.user
        if request.method == "GET":
            serializer = BlogListSerializer(user.blogs.all(), many=True)
            return Response(serializer.data)
