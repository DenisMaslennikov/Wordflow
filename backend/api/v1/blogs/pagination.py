from rest_framework.pagination import LimitOffsetPagination


class BlogPagination(LimitOffsetPagination):
    """Настройка пагинации для списка блогов."""
    default_limit = 20
    max_limit = 100
