from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class ReminderPreference(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    daily_reminders = models.BooleanField(default=False)

    def __str__(self):
        return self.user.first_name