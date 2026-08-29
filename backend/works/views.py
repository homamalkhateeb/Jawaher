from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
)

from .models import Work
from .serializers import WorkSerializer

from rest_framework.filters import (
    SearchFilter,
    OrderingFilter,
)

class WorkListAPI(ListAPIView):
    serializer_class = WorkSerializer

    filter_backends = [
        SearchFilter,
        OrderingFilter,
    ]

    search_fields = [
        'title',
        'description',
    ]

    ordering_fields = [
        'title',
        'created_at',
    ]

    ordering = [
        '-created_at',
    ]

    def get_queryset(self):
        queryset = (
            Work.objects
            .filter(is_active=True)
            .select_related('category')
            .prefetch_related('images')
        )

        category_slug = self.request.query_params.get(
            'category'
        )

        if category_slug:
            queryset = queryset.filter(
                category__slug=category_slug
            )

        featured = self.request.query_params.get(
            'featured'
        )

        if featured == 'true':
            queryset = queryset.filter(
                is_featured=True
            )

        return queryset


class WorkDetailAPI(RetrieveAPIView):
    queryset = (
        Work.objects
        .filter(is_active=True)
        .select_related('category')
        .prefetch_related('images')
    )

    serializer_class = WorkSerializer
    lookup_field = 'slug'