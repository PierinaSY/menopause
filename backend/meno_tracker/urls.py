from django.urls import path

from . import api, views

urlpatterns = [
    path("api/users", api.UserList.as_view()),
    path("api/symptom/<str:id>", api.SymptomDetails.as_view()),
    path("api/symptoms", api.SymptomList.as_view()),
    path("api/treatment/<str:id>", api.TreatmentDetails.as_view()),
    path("api/treatments", api.TreatmentList.as_view()),
    path("api/track_symptom/<str:id>", api.Track_SymptomDetails.as_view()),
    path("api/track_symptoms", api.Track_SymptomList.as_view()),
    path("api/symptom_treatment/<str:id>", api.Symptom_TreatmentDetails.as_view()),
    path("api/symptom_treatments", api.Symptom_TreatmentList.as_view()),
    path("api/reports", api.ReportList.as_view()),
    path('api/recorded_symptoms/', api.RecordedSymptomsAPIView.as_view(), name='recorded_symptoms'),
    path('api/get_symptoms/', api.GetSymptoms.as_view(), name='get_symptoms'),
    path('api/get_severity_levels/', api.GetSeverityLevels.as_view(), name='get_severity_levels'),
    path('api/get_mood_levels/', api.GetMoodLevels.as_view(), name='get_mood_levels'),
]