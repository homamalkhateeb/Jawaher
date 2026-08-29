from rest_framework import serializers

from .models import (
    Category,
    Product,
    ProductImage,
    ProductSpecification,
)


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = (
            'id',
            'image',
            'is_main',
        )


class ProductSpecificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSpecification
        fields = (
            'id',
            'name',
            'value',
            'sort_order',
        )


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            'id',
            'name',
            'slug',
            'description',
            'image',
        )


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    images = ProductImageSerializer(
        many=True,
        read_only=True
    )

    specifications = ProductSpecificationSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Product
        fields = (
            'id',
            'title',
            'slug',
            'description',
            'category',
            'price',
            'price_type',
            'is_featured',
            'images',
            'specifications',
        )