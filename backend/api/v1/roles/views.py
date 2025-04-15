from rest_framework import generics

from api.v1.roles.serializers import RoleSerializer
from roles.models import Role


class RolesListAPIView(generics.ListAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
