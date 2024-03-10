# from celery import shared_task
from django.core.management import call_command

from meno_reminder.models import ReminderPreference

# from menopause.Celery import shared_task
# from menopause.Celery import Celery
# from meno_reminder import task

# from Celery import shared_task

from celery import Celery

from celery import shared_task



celery = Celery('tasks', broker='redis://127.0.0.1:6379/0') #!


@shared_task
# @task
def send_daily_reminder_emails():
    call_command('send_daily_reminders')