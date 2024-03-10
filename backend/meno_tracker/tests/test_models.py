from django.test import TestCase
from datetime import datetime
from django.contrib.auth import get_user_model
from meno_tracker.models import Symptom, Treatment, Symptom_Treatment, Track_Symptom, Report, Profile, BaseSymptoms

User = get_user_model()

class SymptomModelTest(TestCase):
    def setUp(self):
        self.symptom = Symptom.objects.create(name="Headache", description="Pain in the head")

    def test_symptom_str_representation(self):
        self.assertEqual(str(self.symptom), "Headache")

class TreatmentModelTest(TestCase):
    def setUp(self):
        self.treatment = Treatment.objects.create(name="Hormone shot", description="Relieves hot flashes")

    def test_treatment_str_representation(self):
        self.assertEqual(str(self.treatment), "Hormone shot")

class SymptomTreatmentModelTest(TestCase):
    def setUp(self):
        self.symptom = Symptom.objects.create(name="Headache", description="Pain in the head")
        self.treatment = Treatment.objects.create(name="Hormone shot", description="Relieves hot flashes")
        self.symptom_treatment = Symptom_Treatment.objects.create(symptom_id=self.symptom, treatment_id=self.treatment)

    def test_symptom_treatment_str_representation(self):
        expected_str = f"{self.symptom.name} - {self.treatment.name}"
        self.assertEqual(str(self.symptom_treatment), expected_str)

class TrackSymptomModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(email="testuser-juanita@m.com", first_name="Juanita")
        self.symptom = Symptom.objects.create(name="Headache", description="Pain in the head")
        self.track_symptom = Track_Symptom.objects.create(
            user_id=self.user,
            symptom_id=self.symptom,
            severity=Track_Symptom.Severity.QUITE_A_LOT,
            mood=Track_Symptom.Mood.ANXIOUS,
            duration=2,
            notes="Feeling overwhelmend"
        )

    def test_track_symptom_str_representation(self):
        expected_str = f"{self.user.first_name} - {self.symptom.name}"
        self.assertEqual(str(self.track_symptom), expected_str)


class ProfileModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(email="testuser-juanita@m.com", first_name="Juanita")
        self.profile = Profile.objects.create(
            user_id=self.user,
            birthdate="1970-01-01",
            menopause=False,
            last_period="2023-01-01",
            daily_reminders=True,
            current_treatments="Ninguno"
        )

    def test_profile_str_representation(self):
        self.assertEqual(str(self.profile), str(self.profile.id))

class BaseSymptomsModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(email="testuser-juanita@m.com", first_name="Juanita")
        self.profile = Profile.objects.create(
            user_id=self.user,
            birthdate="1970-01-01",
            menopause=False,
            last_period="2023-01-01",
            daily_reminders=True,
            current_treatments="Ninguno"
        )
        self.symptom = Symptom.objects.create(name="Headache", description="Pain in the head")
        self.base_symptom = BaseSymptoms.objects.create(
            profile_id=self.profile,
            symptom_id=self.symptom,
            starting_date="2022-02-01",
            severity=BaseSymptoms.Severity.QUITE_A_LOT
        )

    def test_base_symptoms_str_representation(self):
        expected_str = f"{self.base_symptom.id}-{self.symptom.name}-{self.profile.user_id.first_name}"
        self.assertEqual(str(self.base_symptom), expected_str)

