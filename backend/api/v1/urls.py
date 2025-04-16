from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api.v1.blogs.views import BlogViewSet
from api.v1.comments.views import CommentViewSet
from api.v1.main_page.views import MainPagePostsListAPIView
from api.v1.posts.views import PostForAuthorViewSet, PostListAPIView, PostRetrieveAPIView
from api.v1.roles.views import RolesListAPIView
from api.v1.tags.views import TagsViewSet
from api.v1.users.views import UserViewSet

router = DefaultRouter()
router.register("blogs", BlogViewSet)
router.register("tags", TagsViewSet)
router.register("user", UserViewSet)
blog_router = DefaultRouter()
blog_router.register("posts", PostForAuthorViewSet)
comments_router = DefaultRouter()
comments_router.register("comments", CommentViewSet)


app_name = "v1"

urlpatterns = [
    path("", include(router.urls)),
    path("post_editor/<int:blog_id>/", include(blog_router.urls)),
    path("post_comments/<int:post_id>/", include(comments_router.urls)),
    path("main_page/posts/", MainPagePostsListAPIView.as_view(), name="main_page_posts"),
    path("blog_posts/<int:blog_id>/", PostListAPIView.as_view(), name="blog_posts"),
    path("blog_post/<int:id>/", PostRetrieveAPIView.as_view(), name="blog_post"),
    path("roles/", RolesListAPIView.as_view(), name="roles"),
]
