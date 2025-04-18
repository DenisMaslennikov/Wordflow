# Generated by Django 5.2 on 2025-04-14 11:18

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Blog",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("slug", models.SlugField(help_text="Имя блога для url", max_length=100, unique=True)),
                ("title", models.CharField(help_text="Заголовок блога", max_length=255, unique=True)),
                ("description", models.CharField(blank=True, help_text="Описание блога", max_length=500, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="BlogAuthor",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("added_at", models.DateTimeField(auto_now_add=True, help_text="Когда добавлен")),
                (
                    "blog",
                    models.ForeignKey(
                        help_text="Идентификатор блога", on_delete=django.db.models.deletion.CASCADE, to="blogs.blog"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        help_text="Идентификатор автора",
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="blog",
            name="authors",
            field=models.ManyToManyField(
                help_text="Авторы блога", related_name="blogs", through="blogs.BlogAuthor", to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
