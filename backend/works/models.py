from django.db import models
from products.models import Category

from django.db import models

from core.utils import generate_safe_filename


def work_image_upload_path(instance, filename):
    safe_filename = generate_safe_filename(
        filename,
        prefix=instance.work.slug
    )

    return f'works/{instance.work.slug}/{safe_filename}'

class Work(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)

    description = models.TextField(blank=True)

    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name='works'
    )

    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class WorkImage(models.Model):
    work = models.ForeignKey(
        Work,
        on_delete=models.CASCADE,
        related_name='images'
    )

    image = models.ImageField(
        upload_to=work_image_upload_path
    )

    is_main = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-is_main', 'created_at']

    def __str__(self):
        return f"{self.work.title} - Image"