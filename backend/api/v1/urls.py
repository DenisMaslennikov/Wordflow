from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api.v1.users.views import RegisterView

router = DefaultRouter()

app_name = "v1"

urlpatterns = [
    path("", include(router.urls)),
    path("user/register/", RegisterView.as_view(), name="register"),
]
