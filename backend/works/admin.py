from django.contrib import admin
from django.utils.html import format_html

from .models import Work, WorkImage


class WorkImageInline(admin.TabularInline):
    model = WorkImage
    extra = 1

    fields = (
        'image',
        'image_preview',
        'is_main',
    )

    readonly_fields = (
        'image_preview',
    )

    @admin.display(description='Preview')
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="100" height="80" '
                'style="object-fit: cover; border-radius: 6px;" />',
                obj.image.url
            )

        return '-'


@admin.register(Work)
class WorkAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'category',
        'is_featured',
        'is_active',
        'created_at',
    )

    list_filter = (
        'category',
        'is_featured',
        'is_active',
    )

    search_fields = (
        'title',
        'slug',
        'description',
        'category__name',
    )

    prepopulated_fields = {
        'slug': ('title',),
    }

    ordering = (
        '-created_at',
    )

    readonly_fields = (
        'created_at',
        'updated_at',
    )

    fields = (
        'title',
        'slug',
        'category',
        'description',
        'is_featured',
        'is_active',
        'created_at',
        'updated_at',
    )

    inlines = (
        WorkImageInline,
    )


@admin.register(WorkImage)
class WorkImageAdmin(admin.ModelAdmin):
    list_display = (
        'work',
        'image_preview',
        'is_main',
        'created_at',
    )

    list_filter = (
        'is_main',
        'created_at',
    )

    search_fields = (
        'work__title',
    )

    readonly_fields = (
        'created_at',
        'image_preview',
    )

    fields = (
        'work',
        'image',
        'image_preview',
        'is_main',
        'created_at',
    )

    @admin.display(description='Preview')
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="150" height="120" '
                'style="object-fit: cover; border-radius: 8px;" />',
                obj.image.url
            )

        return '-'