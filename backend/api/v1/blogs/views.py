from django.db.transaction import atomic
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.viewsets import ModelViewSet

from api.v1.blogs.filters import PrioritizedBlogSearchFilter
from api.v1.blogs.pagination import BlogPagination
from api.v1.blogs.permissions import IsOwnerOrReadOnly
from api.v1.blogs.serializers import BlogCreateUpdateSerializer, BlogDetailedSerializer, BlogListSerializer
from blogs.models import Blog


class BlogViewSet(ModelViewSet):
    """Вьюсет для модели Blog."""

    permission_classes = (IsOwnerOrReadOnly,)
    serializer_class = BlogListSerializer
    queryset = Blog.objects.all()
    pagination_class = BlogPagination
    filter_backends = (DjangoFilterBackend, PrioritizedBlogSearchFilter, filters.OrderingFilter)
    filterset_fields = ("authors",)
    search_fields = ("title", "description")
    ordering_fields = ("title", "description", "created_at")

    @atomic
    def perform_create(self, serializer):
        """Создание нового блога."""
        blog = serializer.save()
        blog.authors.add(self.request.user)
        blog.save()
        return blog

    def get_queryset(self):
        """Получение кверисета в зависимости от типа запроса."""
        if self.action == "retrieve":
            return Blog.objects.prefetch_related("authors").all()
        return Blog.objects.all()

    def get_serializer_class(self):
        """Получение класса сериализатора в зависимости от действия."""
        if self.action == "retrieve":
            return BlogDetailedSerializer
        elif self.action == "create" or self.action == "update" or self.action == "partial_update":
            return BlogCreateUpdateSerializer
        elif self.action == "list":
            return BlogListSerializer
        return None
