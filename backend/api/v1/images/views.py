from rest_framework import mixins, parsers, renderers, viewsets

from api.v1.images.serializers import ImageSerializer
from api.v1.posts.permissions import IsBlogAuthorOrForbidden
from blogs.models import Blog
from images.models import Image


class ImageViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
):
    """Вьюсет для модели Image."""

    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    parser_classes = (parsers.MultiPartParser, parsers.FormParser)
    renderer_classes = (renderers.JSONRenderer,)
    permission_classes = (IsBlogAuthorOrForbidden,)

    def get_queryset(self):
        """Получение кверисета в зависимости от blog_slug."""
        blog_slug = self.kwargs["blog_slug"]
        queryset = self.queryset.filter(blog__slug=blog_slug).select_related("user")
        return queryset

    def perform_create(self, serializer):
        """Сохранение нового изображения."""
        blog_slug = self.kwargs["blog_slug"]
        blog_id = Blog.objects.get(slug=blog_slug).id
        image = serializer.save(user=self.request.user, blog_id=blog_id)
        return image

    def perform_destroy(self, instance):
        """Удаление изображения."""
        instance.image.delete()
        instance.delete()
