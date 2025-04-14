from rest_framework.viewsets import ModelViewSet

from api.v1.blogs.pagination import BlogPagination
from api.v1.blogs.permissions import IsOwnerOrReadOnly
from api.v1.blogs.serializers import BlogDetailedSerializer, BlogCreateUpdateSerializer, BlogListSerializer
from blogs.models import Blog


class BlogViewSet(ModelViewSet):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = BlogListSerializer
    queryset = Blog.objects.all()
    pagination_class = BlogPagination

    def perform_create(self, serializer):
        """Создание нового блога."""
        blog = serializer.save()
        blog.authors.add(self.request.user)
        blog.save()
        return blog

    def get_queryset(self):
        """Получение кверисета в зависимости от типа запроса."""
        if self.action == 'retrieve':
            queryset = Blog.objects.prefetch_related("authors").all()
        else:
            queryset = Blog.objects.all()
        return queryset

    def get_serializer_class(self):
        """Получение класса сериализатора в зависимости от действия."""
        if self.action == 'retrieve':
            return BlogDetailedSerializer
        elif self.action == 'create' or self.action == 'update' or self.action == 'partial_update':
            return BlogCreateUpdateSerializer
        elif self.action == "list":
            return BlogListSerializer
        else:
            return None

