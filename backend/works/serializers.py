from rest_framework import serializers

from .models import Work, WorkImage
from products.serializers import CategorySerializer


class WorkImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkImage
        fields = (
            'id',
            'image',
            'is_main',
        )


class WorkSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)

    images = WorkImageSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Work
        fields = (
            'id',
            'title',
            'slug',
            'description',
            'category',
            'is_featured',
            'images',
            'created_at',
        )