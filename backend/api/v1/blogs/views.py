from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from api.v1.blogs.serializers import BlogSerializer
from blogs.models import Blog


class BlogViewSet(ModelViewSet):
    queryset = Blog.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = BlogSerializer
