from django.db import models
from datetime import datetime
from django.utils.translation import gettext as _
from django.contrib.auth import get_user_model
import uuid

# Create your models here.

User = get_user_model()
    
class Symptom(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name
    
class Treatment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class Symptom_Treatment(models.Model):
    id = models.AutoField(primary_key=True)
    symptom_id = models.ForeignKey(Symptom, on_delete=models.CASCADE)
    treatment_id = models.ForeignKey(Treatment, on_delete=models.CASCADE)

    def __str__(self):
        return self.symptom_id.name + " - " + self.treatment_id.name

class Track_Symptom(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    symptom_id = models.ForeignKey(Symptom, on_delete=models.CASCADE)

    class Severity(models.IntegerChoices):
        NONE = 0, _('None')
        A_LITTLE = 1, _('A Little')
        QUITE_A_LOT = 2, _('Quite A Lot')
        EXTREME = 3, _('Extreme')
    
    severity = models.IntegerField(choices=Severity.choices, default= Severity.NONE)

    class Mood(models.IntegerChoices):
        UPSET = 0, _('Upset')
        SAD = 1, _('Sad')
        ANXIOUS = 2, _('Anxious')
        SCARED = 3, _('Scared')
        CONFUSED = 4, _('Confused') 
        UNSURE = 5, _('Unsure')
        CALM = 6, _('Calm')
        HAPPY = 7, _('Happy')

    mood = models.IntegerField(choices=Mood.choices)
    duration = models.IntegerField()
    date = models.DateField(default=datetime.now)
    notes = models.TextField()

    def __str__(self):
        return self.user_id.first_name + " - " + self.symptom_id.name

class Report(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(default=datetime.now)
    file = models.FileField(upload_to='reports')

class Profile(models.Model):
    #added a profile_id to get a better identification method
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    birthdate = models.DateField()
    menopause = models.BooleanField(default=False)
    last_period = models.DateField()
    daily_reminders = models.BooleanField(default=False)
    current_treatments = models.TextField()

    def __str__(self):
    
        return str(self.id)
    
    def get_id_as_uuid(self):
        return self.id
    
class BaseSymptoms(models.Model):
    id = models.AutoField(primary_key=True)
    profile_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    symptom_id = models.ForeignKey(Symptom, on_delete=models.CASCADE)
    starting_date = models.DateField()

    class Severity(models.IntegerChoices):
        NONE = 0, _('None')
        A_LITTLE = 1, _('A Little')
        QUITE_A_LOT = 2, _('Quite A Lot')
        EXTREME = 3, _('Extreme')
    
    severity = models.IntegerField(choices=Severity.choices, default= Severity.NONE)

    def __str__(self):
        return str(self.id) + "-" + self.symptom_id.name + "-" + self.profile_id.user_id.first_name