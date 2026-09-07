from django.contrib import admin

from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'phone',
        'email',
        'is_read',
        'created_at',
    )

    list_filter = (
        'is_read',
        'created_at',
    )

    search_fields = (
        'name',
        'phone',
        'email',
        'message',
    )

    list_editable = (
        'is_read',
    )

    readonly_fields = (
        'created_at',
    )

    ordering = (
        '-created_at',
    )