from rest_framework import serializers

from .models import SiteSettings


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = (
            'id',
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