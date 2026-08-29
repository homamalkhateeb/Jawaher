from django.urls import path

from .views import SiteSettingsAPI


urlpatterns = [
    path(
        '',
        SiteSettingsAPI.as_view(),
        name='site-settings',
    ),
]