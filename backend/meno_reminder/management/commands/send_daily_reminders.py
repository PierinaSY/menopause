from django.core.management.base import BaseCommand
from django.core.mail import send_mail
from django.contrib.auth.models import User
from meno_reminder.models import ReminderPreference
from datetime import datetime

# User = get_user_model()


class Command(BaseCommand):
    help = 'Send daily reminder emails to users'

    @staticmethod
    def should_send_reminder_today(user):
        # Implement your logic to check if a reminder should be sent today
        # For example, check if the user has already recorded symptoms today
        # You may need to store symptom records and check the last recorded date
        return True

    def handle(self, *args, **options):
        # Get users who want to receive reminders
        users_with_reminder = ReminderPreference.objects.filter(daily_reminders=True).select_related('user')

        for user_pref in users_with_reminder:
            user = user_pref.user

            # Implement your logic to check if a reminder should be sent today
            if self.should_send_reminder_today(user):
                # Send reminder email
                send_mail(
                    'Recordatorio Diario',
                    'Registra tus síntomas de hoy. Visita Menopause App -> http://127.0.0.1:3000/',
                    'hola@menopause.com',
                    [user.email],
                    fail_silently=False,
                )

        self.stdout.write(self.style.SUCCESS('Reminder emails sent successfully'))