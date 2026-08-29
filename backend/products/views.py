from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
)

from rest_framework.filters import (
    SearchFilter,
    OrderingFilter,
)

from django_filters.rest_framework import DjangoFilterBackend

from .models import Product, Category
from .serializers import (
    CategorySerializer,
    ProductSerializer,
)
from .filters import ProductFilter


class ProductListAPI(ListAPIView):
    serializer_class = ProductSerializer

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_class = ProductFilter

    search_fields = [
        'title',
        'description',
    ]

    ordering_fields = [
        'title',
        'created_at',
        'price',
    ]

    ordering = [
        '-created_at',
    ]

    def get_queryset(self):
        return (
            Product.objects
            .filter(is_active=True)
            .select_related('category')
            .prefetch_related(
                'images',
                'specifications',
            )
        )


class ProductDetailAPI(RetrieveAPIView):
    queryset = (
        Product.objects
        .filter(is_active=True)
        .select_related('category')
        .prefetch_related(
            'images',
            'specifications',
        )
    )

    serializer_class = ProductSerializer
    lookup_field = 'slug'


class CategoryListAPI(ListAPIView):
    queryset = Category.objects.filter(
        is_active=True
    )

    serializer_class = CategorySerializer