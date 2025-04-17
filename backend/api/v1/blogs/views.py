from django.db.transaction import atomic
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import decorators, filters
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from api.v1.blogs.filters import PrioritizedBlogSearchFilter
from api.v1.blogs.pagination import BlogPagination
from api.v1.blogs.permissions import IsAdminOrForbidden, IsAdminOrReadOnly
from api.v1.blogs.serializers import (
    BlogCreateUpdateSerializer,
    BlogDetailedSerializer,
    BlogListSerializer,
    BlogUserRoleSerializer,
    UserRoleListSerializer,
    UserRoleSerializer,
)
from blogs.models import Blog, BlogAuthor
from utils.constants import ADMINISTRATOR_ROLE_ID


class BlogViewSet(ModelViewSet):
    """Вьюсет для модели Blog."""

    permission_classes = (IsAdminOrReadOnly,)
    serializer_class = BlogListSerializer
    queryset = Blog.objects.all()
    pagination_class = BlogPagination
    filter_backends = (DjangoFilterBackend, PrioritizedBlogSearchFilter, filters.OrderingFilter)
    filterset_fields = ("authors",)
    ordering_fields = ("title", "description", "created_at")

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="search",
                type=str,
                location=OpenApiParameter.QUERY,
                description="Search by title and description",
            ),
        ]
    )
    def list(self, request, *args, **kwargs):
        """Получение списка постов."""
        return super().list(request, *args, **kwargs)

    @atomic
    def perform_create(self, serializer):
        """Создание нового блога."""
        blog = serializer.save()
        admin = BlogAuthor.objects.create(blog=blog, user=self.request.user, role_id=ADMINISTRATOR_ROLE_ID)
        admin.save()

        return blog

    def get_queryset(self):
        """Получение кверисета в зависимости от типа запроса."""
        if (
            self.action == "retrieve"
            or self.action == "update"
            or self.action == "partial_update"
            or self.action == "create"
        ):
            return Blog.objects.prefetch_related("authors").all()
        return Blog.objects.all()

    def get_serializer_class(self):
        """Получение класса сериализатора в зависимости от действия."""
        if self.action == "retrieve":
            return BlogDetailedSerializer
        elif self.action == "create" or self.action == "update" or self.action == "partial_update":
            return BlogCreateUpdateSerializer
        return BlogListSerializer

    @extend_schema(responses=UserRoleListSerializer)
    @decorators.action(
        detail=True,
        methods=["get"],
        permission_classes=[IsAdminOrForbidden],
        serializer_class=UserRoleListSerializer,
        url_path="list_users",
    )
    def get_list_blog_users_with_roles(self, request, pk):
        """Получение списка пользователей блога с их ролями."""
        blog_users = BlogAuthor.objects.filter(blog_id=pk).select_related("user").select_related("role")
        return Response(self.serializer_class(blog_users, many=True).data)

    @extend_schema(
        request=UserRoleSerializer,
        responses=UserRoleListSerializer,
    )
    @decorators.action(
        detail=True,
        methods=["post"],
        permission_classes=[IsAdminOrForbidden],
        serializer_class=BlogUserRoleSerializer,
    )
    def create_user_role(self, request: Request, pk):
        """Добавление роли пользователю."""
        data = request.data.copy()
        data["blog"] = pk
        serializer = BlogUserRoleSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        return Response(UserRoleListSerializer(instance).data)
