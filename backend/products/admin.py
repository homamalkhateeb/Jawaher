from django.contrib import admin
from django.utils.html import format_html

from .models import (
    Category,
    Product,
    ProductImage,
    ProductSpecification,
)


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = (
        'image',
        'image_preview',
        'is_main',
    )
    readonly_fields = ('image_preview',)

    @admin.display(description='Preview')
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="100" height="80" '
                'style="object-fit: cover; border-radius: 6px;" />',
                obj.image.url
            )

        return '-'


class ProductSpecificationInline(admin.TabularInline):
    model = ProductSpecification
    extra = 1
    fields = (
        'name',
        'value',
        'sort_order',
    )


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'slug',
        'is_active',
        'product_count',
        'created_at',
    )

    list_filter = (
        'is_active',
    )

    search_fields = (
        'name',
        'slug',
        'description',
    )

    prepopulated_fields = {
        'slug': ('name',),
    }

    ordering = (
        'name',
    )

    readonly_fields = (
        'created_at',
    )

    fields = (
        'name',
        'slug',
        'description',
        'image',
        'is_active',
        'created_at',
    )

    @admin.display(description='Products')
    def product_count(self, obj):
        return obj.products.count()


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'category',
        'price_display',
        'price_type',
        'is_featured',
        'is_active',
        'created_at',
    )

    list_filter = (
        'category',
        'price_type',
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
        'price',
        'price_type',
        'is_featured',
        'is_active',
        'created_at',
        'updated_at',
    )

    inlines = (
        ProductImageInline,
        ProductSpecificationInline,
    )

    @admin.display(description='Price', ordering='price')
    def price_display(self, obj):
        if obj.price_type == 'STARTING_FROM':
            return f'From {obj.price} SAR'

        return f'{obj.price} SAR'


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = (
        'product',
        'image_preview',
        'is_main',
        'created_at',
    )

    list_filter = (
        'is_main',
        'created_at',
    )

    search_fields = (
        'product__title',
    )

    readonly_fields = (
        'created_at',
        'image_preview',
    )

    fields = (
        'product',
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


@admin.register(ProductSpecification)
class ProductSpecificationAdmin(admin.ModelAdmin):
    list_display = (
        'product',
        'name',
        'value',
        'sort_order',
    )

    search_fields = (
        'product__title',
        'name',
        'value',
    )

    list_filter = (
        'name',
    )

    ordering = (
        'product',
        'sort_order',
    )