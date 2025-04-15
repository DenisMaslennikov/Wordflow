from rest_framework import viewsets, mixins

from api.v1.tags.serializers import TagSerializer
from tags.models import Tag


class TagsViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin):
    """Вьюсет тегов."""

    queryset = Tag.objects.all()
    serializer_class = TagSerializer
