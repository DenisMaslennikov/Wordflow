from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, mixins, filters

from api.v1.posts.filters import PrioritizedPostSearchFilter
from api.v1.posts.pagination import PostPagination
from api.v1.posts.serializers import PostListSerializer
from posts.models import Post


class MainPagePostsViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    """Вью сет для постов на главной странице."""

    queryset = Post.objects.all().select_related("user")
    serializer_class = PostListSerializer
    filter_backends = (PrioritizedPostSearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    search_fields = ("title", "content")
    filterset_fields = ("user__username",)
    ordering_fields = ("title", "content", "published_at", "user__username")
    ordering = ("-published_at",)
    pagination_class = PostPagination
