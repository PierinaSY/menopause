# Generated by Django 5.0.1 on 2024-03-02 17:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meno_tracker', '0002_profile_basesymptoms'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='user_id',
        ),
        migrations.DeleteModel(
            name='BaseSymptoms',
        ),
        migrations.DeleteModel(
            name='Profile',
        ),
    ]