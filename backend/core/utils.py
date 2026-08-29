import uuid
from pathlib import Path

from django.utils.text import slugify


def generate_safe_filename(filename, prefix=None):
    extension = Path(filename).suffix.lower()

    original_name = Path(filename).stem

    safe_name = slugify(
        original_name,
        allow_unicode=False
    )

    if not safe_name:
        safe_name = 'image'

    if prefix:
        safe_prefix = slugify(
            prefix,
            allow_unicode=False
        )

        if safe_prefix:
            safe_name = f'{safe_prefix}-{safe_name}'

    unique_id = uuid.uuid4().hex[:8]

    return f'{safe_name}-{unique_id}{extension}'