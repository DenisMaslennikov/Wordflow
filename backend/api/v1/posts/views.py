import datetime

from rest_framework.generics import ListAPIView

from api.v1.posts.pagination import PostPagination
from api.v1.posts.serializers import PostListSerializer
from posts.models import Post


class PostListAPIView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    pagination_class = PostPagination

    def get_queryset(self):
        blog_id = self.kwargs["blog_id"]
        return (
            Post.objects.filter(blog_id=blog_id, published_at__lte=datetime.datetime.now(), status__exact="Published")
            .select_related("user")
            .prefetch_related("tags")
        )
