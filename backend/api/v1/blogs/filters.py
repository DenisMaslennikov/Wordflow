from django.db.models import Case, IntegerField, Q, Value, When
from rest_framework.filters import BaseFilterBackend


class PrioritizedBlogSearchFilter(BaseFilterBackend):
    """Бэкенд поиска по блогам."""

    def filter_queryset(self, request, queryset, view):
        """Получаем фильтрованный кверисет."""
        search_query = request.query_params.get("search", "")

        term = search_query.strip()

        if not term:
            return queryset

        prioritized_filtered_qs = (
            queryset.annotate(
                priority=Case(
                    When(title__icontains=term, then=Value(1)),
                    When(description__icontains=term, then=Value(2)),
                    default=Value(3),
                    output_field=IntegerField(),
                )
            )
            .filter(Q(title__icontains=term) | Q(description__icontains=term))
            .order_by("priority")
        )

        return prioritized_filtered_qs
