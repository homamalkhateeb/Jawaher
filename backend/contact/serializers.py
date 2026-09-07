from rest_framework import serializers

from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=150, trim_whitespace=True)
    phone = serializers.RegexField(
        regex=r'^[0-9+\-\s()]{7,30}$',
        required=False,
        allow_blank=True,
    )
    email = serializers.EmailField(
        max_length=254,
        required=False,
        allow_blank=True,
    )
    message = serializers.CharField(max_length=2000)

    class Meta:
        model = ContactMessage
        fields = (
            'id',
            'name',
            'phone',
            'email',
            'message',
            'created_at',
        )
        read_only_fields = (
            'id',
            'created_at',
        )