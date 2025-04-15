import datetime

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.generics import ListAPIView, RetrieveAPIView

from api.v1.posts.filters import PrioritizedPostSearchFilter
from api.v1.posts.pagination import PostPagination
from api.v1.posts.serializers import PostListSerializer, PostDetailedSerializer
from posts.models import Post


class PostListAPIView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    pagination_class = PostPagination
    filter_backends = (PrioritizedPostSearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    filterset_fields = ("user_id", "tags__id")
    ordering_fields = ("title", "content", "published_at", "user_username")
    ordering = ("-published_at",)

    def get_queryset(self):
        blog_id = self.kwargs["blog_id"]
        return (
            Post.objects.filter(blog_id=blog_id, published_at__lte=datetime.datetime.now(), status__exact="Published")
            .select_related("user")
            .prefetch_related("tags")
        )


class PostRetrieveAPIView(RetrieveAPIView):
    queryset = (
        Post.objects.filter(published_at__lte=datetime.datetime.now(), status__exact="Published")
        .select_related("user")
        .prefetch_related("tags")
    )
    serializer_class = PostDetailedSerializer
    lookup_field = "id"
