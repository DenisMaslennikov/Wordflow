# Generated by Django 5.2 on 2025-04-15 15:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("blogs", "0002_blog_created_at"),
        ("roles", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="blogauthor",
            name="role",
            field=models.ForeignKey(
                default=2, help_text="Роль пользователя", on_delete=django.db.models.deletion.PROTECT, to="roles.role"
            ),
            preserve_default=False,
        ),
    ]
