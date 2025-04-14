from django.urls import include, path
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

app_name = "v1"

urlpatterns = [
    path("", include(router.urls)),
]
