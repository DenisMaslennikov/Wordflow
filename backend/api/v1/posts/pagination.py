from rest_framework.pagination import LimitOffsetPagination


class PostPagination(LimitOffsetPagination):
    """Настройка пагинации для списка постов."""

    default_limit = 10
    max_limit = 100
