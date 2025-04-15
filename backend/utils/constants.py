from functools import partial

from slugify import slugify

POST_STATUS_PUBLISHED = "Published"
POST_STATUS_DRAFT = "Draft"

tag_slugify = partial(slugify, lowercase=True, max_length=40, separator="_", regex_pattern=r"[^\w-]")
