from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class APITests(APITestCase):
    def setUp(self):
        # Create a user for authentication
        self.user = User.objects.create_user(email='testuser@m.com', password='testpassword')

    def test_user_list_endpoint(self):
        url = '/api/users'
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), User.objects.count())

    def test_symptom_list_endpoint(self):
        url = '/api/symptoms'  
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_track_symptoms_endpoint(self):
        url = '/api/track_symptoms'  
        self.client.force_authenticate(user=self.user)
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

