from functools import partial

from slugify import slugify

tag_slugify = partial(slugify, lowercase=True, max_length=40, separator="_", regex_pattern=r"[^\w-]")
