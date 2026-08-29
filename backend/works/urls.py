from django.urls import path

from .views import (
    WorkDetailAPI,
    WorkListAPI,
)


urlpatterns = [
    path(
        '',
        WorkListAPI.as_view(),
        name='work-list',
    ),

    path(
        '<slug:slug>/',
        WorkDetailAPI.as_view(),
        name='work-detail',
    ),
]