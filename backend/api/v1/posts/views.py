import datetime

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets
from rest_framework.generics import ListAPIView, RetrieveAPIView

from api.v1.posts.filters import PrioritizedPostSearchFilter
from api.v1.posts.pagination import PostPagination
from api.v1.posts.permissions import IsBlogAuthorOrForbidden
from api.v1.posts.serializers import (
    PostDetailedSerializer,
    PostForAuthorSerializer,
    PostListSerializer,
    PostListWithStatusSerializer,
)
from posts.models import Post
from utils.constants import POST_STATUS_PUBLISHED


class PostListAPIView(ListAPIView):
    """Просмотр списка постов блога."""

    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    pagination_class = PostPagination
    filter_backends = (PrioritizedPostSearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    filterset_fields = ("user_id", "tags__id")
    ordering_fields = ("title", "content", "published_at", "user_username")
    ordering = ("-published_at",)

    def get_queryset(self):
        """Получение кверисета."""
        blog_slug = self.kwargs["blog_slug"]
        return (
            Post.objects.filter(
                blog__slug=blog_slug,
                published_at__lte=datetime.datetime.now(tz=datetime.timezone.utc),
                status__exact=POST_STATUS_PUBLISHED,
            )
            .select_related("user")
            .prefetch_related("tags")
        )


class PostRetrieveAPIView(RetrieveAPIView):
    """Просмотр конкретного опубликованного поста."""

    queryset = (
        Post.objects.filter(
            published_at__lte=datetime.datetime.now(tz=datetime.timezone.utc), status__exact=POST_STATUS_PUBLISHED
        )
        .select_related("user")
        .prefetch_related("tags")
    )
    serializer_class = PostDetailedSerializer
    lookup_field = "id"


class PostForAuthorViewSet(viewsets.ModelViewSet):
    """Вьюсет для работы автора с постами в блоге."""

    queryset = Post.objects.all()
    permission_classes = [IsBlogAuthorOrForbidden]
    pagination_class = PostPagination
    filter_backends = (PrioritizedPostSearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    filterset_fields = ("user_id", "tags__id")
    ordering_fields = ("title", "content", "published_at", "user_username")
    ordering = ("-published_at",)

    def get_queryset(self):
        """Возвращает кверисет с постами блога если пользователь автор этого блога."""
        return Post.objects.filter(blog=self.kwargs["blog_id"]).prefetch_related("tags").select_related("user")

    def get_serializer_class(self):
        """Возвращает класс сериализатора в зависимости от типа запроса."""
        if self.action == "list":
            return PostListWithStatusSerializer
        return PostForAuthorSerializer

    def perform_create(self, serializer):
        """Создание нового поста."""
        serializer.save(user=self.request.user, blog_id=self.kwargs["blog_id"])

    def perform_update(self, serializer):
        """Обновление поста."""
        serializer.save(user=self.request.user)
