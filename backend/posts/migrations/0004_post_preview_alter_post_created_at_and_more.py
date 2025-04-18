# Generated by Django 5.2 on 2025-04-15 14:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("images", "0001_initial"),
        ("posts", "0003_post_check_valid_post_status"),
    ]

    operations = [
        migrations.AddField(
            model_name="post",
            name="preview",
            field=models.ForeignKey(
                blank=True,
                help_text="Превью к посту",
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="images.image",
            ),
        ),
        migrations.AlterField(
            model_name="post",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True, help_text="Создано"),
        ),
        migrations.AlterField(
            model_name="post",
            name="published_at",
            field=models.DateTimeField(blank=True, help_text="Дата публикации", null=True),
        ),
        migrations.AlterField(
            model_name="post",
            name="status",
            field=models.CharField(
                choices=[("Draft", "Черновик"), ("Published", "Опубликованный")], help_text="Статус", max_length=9
            ),
        ),
        migrations.AlterField(
            model_name="post",
            name="updated_at",
            field=models.DateTimeField(auto_now=True, help_text="Изменено"),
        ),
    ]
