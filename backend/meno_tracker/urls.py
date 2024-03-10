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
    path("api/report/<str:id>", api.ReportDetails.as_view()),
    path('api/get_symptoms/', api.GetSymptoms.as_view(), name='get_symptoms'),
    path('api/get_severity_levels/', api.GetSeverityLevels.as_view(), name='get_severity_levels'),
    path('api/get_mood_levels/', api.GetMoodLevels.as_view(), name='get_mood_levels'),
    path('api/recorded_symptoms/', api.RecordedSymptomsAPIView.as_view(), name='recorded_symptoms'),
    path('api/count_symptoms_date/', api.CountByDateAPIView.as_view(), name='count_symptoms_date'),
    path('api/count_symptoms/', api.CountBySymptomsAPIView.as_view(), name='count_symptoms'),
    path('api/mood_date/', api.MoodByDateAPIView.as_view(), name='mood_date'),
    path('api/recommendations/', api.RecommendationsAPIView.as_view(), name='recommendations'),
    path("api/profile/<str:id>", api.ProfileDetails.as_view()),
    path("api/base_symptoms/<int:id>", api.BaseSymptomsDetails.as_view()),
    path('api/get_profile_id/<int:user_id>', api.GetProfileID.as_view(), name='get_profile_id'),
    path('api/profile/<int:user_id>/', api.UserProfileView.as_view(), name='user-profile'),
    path('api/user_reports/<int:user_id>/', api.UserReportListView.as_view(), name='user-report-list')

]
