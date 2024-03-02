from django.contrib import admin
from .models import Symptom, Treatment, Symptom_Treatment, Track_Symptom, Report, Profile, BaseSymptoms

# Register your models here.
admin.site.register(Symptom)
admin.site.register(Treatment)
admin.site.register(Symptom_Treatment)
admin.site.register(Track_Symptom)
admin.site.register(Report)
admin.site.register(Profile)
admin.site.register(BaseSymptoms)