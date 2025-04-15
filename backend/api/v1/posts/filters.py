from django.db.models import Case, IntegerField, Q, Value, When
from rest_framework import filters


class PrioritizedPostSearchFilter(filters.BaseFilterBackend):
    """Фильтр поиска с приоритетом."""

    def filter_queryset(self, request, queryset, view):
        """Фильтрация кверисета."""
        search_query = request.query_params.get("search", "")

        term = search_query.strip()

        if not term:
            return queryset

        prioritized_filtered_qs = (
            queryset.annotate(
                priority=Case(
                    When(title__icontains=term, then=Value(1)),
                    When(content__icontains=term, then=Value(2)),
                    default=Value(3),
                    output_field=IntegerField(),
                )
            )
            .filter(Q(title__icontains=term) | Q(content__icontains=term))
            .order_by("priority")
        )

        return prioritized_filtered_qs
