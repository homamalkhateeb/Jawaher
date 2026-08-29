from django.urls import path

from .views import ContactMessageCreateAPI


urlpatterns = [
    path(
        '',
        ContactMessageCreateAPI.as_view(),
        name='contact-create',
    ),
]