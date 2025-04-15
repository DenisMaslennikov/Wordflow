import datetime

from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework import viewsets, mixins, filters
from rest_framework.generics import ListAPIView

from api.v1.posts.filters import PrioritizedPostSearchFilter
from api.v1.posts.pagination import PostPagination
from api.v1.posts.serializers import PostListSerializer
from posts.models import Post


class MainPagePostsAPIView(ListAPIView):
    """Апи вью для постов на главной странице."""

    queryset = (
        Post.objects.select_related("user")
        .prefetch_related("tags")
        .filter(published_at__lte=datetime.datetime.now(), status__exact="Published")
    )
    serializer_class = PostListSerializer
    filter_backends = (PrioritizedPostSearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    search_fields = ("title", "content")
    filterset_fields = ("user_id", "tags_id")
    ordering_fields = ("title", "content", "published_at", "user__username")
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
        return super().get(request, *args, **kwargs)
