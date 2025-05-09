from rest_framework import filters, mixins, permissions, viewsets

from api.v1.tags.serializers import TagSerializer
from tags.models import Tag


class TagsViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin):
    """Вьюсет тегов."""

    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ("name",)
