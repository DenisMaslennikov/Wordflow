from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api.v1.blogs.views import BlogViewSet
from api.v1.main_page.views import MainPagePostsListAPIView
from api.v1.posts.views import PostListAPIView, PostRetrieveAPIView
from api.v1.users.views import RegisterView

router = DefaultRouter()
router.register("blogs", BlogViewSet)
router.register(r"posts", PostListAPIView)

app_name = "v1"

urlpatterns = [
    path("", include(router.urls)),
    path("user/register/", RegisterView.as_view(), name="register"),
    path("main_page/posts/", MainPagePostsListAPIView.as_view(), name="main_page_posts"),
    path("blog_posts/<int:blog_id>", PostListAPIView.as_view(), name="blog_posts"),
    path("blog_post/<int:id>", PostRetrieveAPIView.as_view(), name="blog_post"),
]
