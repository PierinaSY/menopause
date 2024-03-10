# from celery import shared_task
from django.core.management import call_command

from meno_reminder.models import ReminderPreference
from celery import Celery
from celery import shared_task

celery = Celery('tasks', broker='redis://127.0.0.1:6379/0') #!

@shared_task
def send_daily_reminder_emails():
    call_command('send_daily_reminders')