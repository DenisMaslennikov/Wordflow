import datetime

from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import filters
from rest_framework.generics import ListAPIView

from api.v1.posts.filters import PrioritizedPostSearchFilter
from api.v1.posts.pagination import PostPagination
from api.v1.posts.serializers import MainPagePostListSerializer
from posts.models import Post
from utils.constants import POST_STATUS_PUBLISHED


class MainPagePostsListAPIView(ListAPIView):
    """Апи вью для постов на главной странице."""

    queryset = (
        Post.objects.select_related("user")
        .select_related("blog")
        .prefetch_related("tags")
        .filter(published_at__lte=datetime.datetime.now(tz=datetime.timezone.utc), status__exact=POST_STATUS_PUBLISHED)
    )
    serializer_class = MainPagePostListSerializer
    filter_backends = (PrioritizedPostSearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    filterset_fields = ("user_id", "tags__id")
    ordering_fields = ("title", "content", "published_at", "user_username")
    ordering = ("-published_at",)
    pagination_class = PostPagination

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="search",
                type=str,
                location=OpenApiParameter.QUERY,
                description="Search by title and content",
            ),
        ]
    )
    def get(self, request, *args, **kwargs):
        """GET метод для получения списка постов."""
        return super().get(request, *args, **kwargs)
