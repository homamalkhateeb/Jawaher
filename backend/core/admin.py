from django.contrib import admin

from .models import SiteSettings


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = (
        'site_name',
        'phone',
        'email',
        'updated_at',
    )

    search_fields = (
        'site_name',
        'phone',
        'email',
        'address',
    )

    readonly_fields = (
        'updated_at',
    )

    fields = (
        'site_name',
        'description',
        'phone',
        'whatsapp',
        'email',
        'instagram_url',
        'address',
        'google_maps_url',
        'latitude',
        'longitude',
        'updated_at',
    )
    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()