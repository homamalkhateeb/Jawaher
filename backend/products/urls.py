from django.urls import path

from .views import (
    CategoryListAPI,
    ProductDetailAPI,
    ProductListAPI,
)


urlpatterns = [
    path(
        '',
        ProductListAPI.as_view(),
        name='product-list',
    ),

    path(
        'categories/',
        CategoryListAPI.as_view(),
        name='category-list',
    ),

    path(
        '<slug:slug>/',
        ProductDetailAPI.as_view(),
        name='product-detail',
    ),
]