from django.db import models


class Role(models.Model):
    name = models.CharField(help_text="Название роли")
