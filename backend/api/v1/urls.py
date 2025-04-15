from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api.v1.blogs.views import BlogViewSet
from api.v1.main_page.views import MainPagePostsAPIView
from api.v1.posts.views import PostListAPIView
from api.v1.users.views import RegisterView

router = DefaultRouter()
router.register("blogs", BlogViewSet)

app_name = "v1"

urlpatterns = [
    path("", include(router.urls)),
    path("user/register/", RegisterView.as_view(), name="register"),
    path("main_page/posts/", MainPagePostsAPIView.as_view(), name="main_page_posts"),
    path("blog_posts/<int:blog_id>", PostListAPIView.as_view(), name="published_posts"),
]
