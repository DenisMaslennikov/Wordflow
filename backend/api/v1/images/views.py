import os

from rest_framework import viewsets, mixins, parsers, renderers

from api.v1.images.serializers import ImageSerializer
from api.v1.posts.permissions import IsBlogAuthorOrForbidden
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
        """Получение кверисета в зависимости от blog_id."""
        blog_id = self.kwargs["blog_id"]
        queryset = self.queryset.filter(blog_id=blog_id).select_related("user")
        return queryset

    def perform_create(self, serializer):
        """Сохранение нового изображения."""
        blog_id = self.kwargs["blog_id"]
        image = serializer.save(user=self.request.user, blog_id=blog_id)
        return image

    def perform_destroy(self, instance):
        """Удаление изображения."""
        instance.image.delete()
        instance.delete()
