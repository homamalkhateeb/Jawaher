from django.db import models

# Create your models here.

from core.utils import generate_safe_filename


def product_image_upload_path(instance, filename):
    safe_filename = generate_safe_filename(
        filename,
        prefix=instance.product.slug
    )

    return f'products/{instance.product.slug}/{safe_filename}'

def category_image_upload_path(instance, filename):
    safe_filename = generate_safe_filename(
        filename,
        prefix=instance.slug
    )

    return f'categories/{safe_filename}'
class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True)
    description = models.TextField(blank=True)
    image = models.ImageField(
        upload_to=category_image_upload_path,
        blank=True,
        null=True
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def __str__(self):
        return self.name

class Product(models.Model):
    PRICE_TYPE_CHOICES = [
        ('FIXED', 'Fixed Price'),
        ('STARTING_FROM', 'Starting From'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)

    description = models.TextField(blank=True)

    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name='products'
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    price_type = models.CharField(
        max_length=20,
        choices=PRICE_TYPE_CHOICES,
        default='STARTING_FROM'
    )

    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='images'
    )

    image = models.ImageField(
        upload_to=product_image_upload_path
    )

    is_main = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-is_main', 'created_at']

    def __str__(self):
        return f"{self.product.title} - Image"

class ProductSpecification(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='specifications'
    )

    name = models.CharField(max_length=100)
    value = models.CharField(max_length=255)

    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return f"{self.product.title} - {self.name}"

