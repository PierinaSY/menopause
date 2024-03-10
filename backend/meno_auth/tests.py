from django.test import TestCase
from django.contrib.auth import get_user_model
from meno_auth.models import AppUser

class AppUserModelTest(TestCase):

    def setUp(self):
        self.user_data = {
            'email': 'testing@meno.com',
            'password': 'testpassword',
        }

    def test_create_user(self):
        user = get_user_model().objects.create_user(**self.user_data)

        self.assertEqual(user.email, self.user_data['email'])
        self.assertTrue(user.check_password(self.user_data['password']))
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        self.assertTrue(user.is_active)

    def test_create_superuser(self):
        superuser = get_user_model().objects.create_superuser(**self.user_data)

        self.assertEqual(superuser.email, self.user_data['email'])
        self.assertTrue(superuser.check_password(self.user_data['password']))
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)
        self.assertTrue(superuser.is_active)

    def test_create_superuser_invalid_flags(self):
        # When a superuser is invalid an error must be thrown
        with self.assertRaises(ValueError):
            get_user_model().objects.create_superuser(
                email=self.user_data['email'],
                password=self.user_data['password'],
                is_staff=False,
                is_superuser=False
            )
