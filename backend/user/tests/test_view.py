#https://www.codeflow.site/ja/article/test-driven-development-of-a-django-restful-api
from django.test import TestCase
from ..models import CustomUser
from rest_framework import status
from rest_framework.test import APIClient,APIRequestFactory

class GetCustomUserTestCase(TestCase):
    def setUp(self):
        self.setUpData1 = CustomUser.objects.create(
                username = 'testuser1',
                email = 'test@test.com',
                password = 'testuserspassword'
        )

    def testValidGetMethodToCustomUserEndPoint(self):
        user_id = CustomUser.objects.get(username='testuser1').id
        URL = 'http://testserver/user/drfcustomuser/'+str(user_id) + '/'

        client = APIClient()
        response = client.get(
            URL,
        )

        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def testInvalidGetMethodToCustomUserEndPoint(self):
        user_id = 11111111
        URL = 'http://testserver/user/drfcustomuser/'+str(user_id) + '/'

        client = APIClient()
        response = client.get(
            URL,
        )

        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)

class CreateCustomUserTestCase(TestCase):
    def setUp(self):
        self.URL = 'http://testserver/user/drf'
        self.valid_input = {
            "username":"createUser",
            "email":"create@user.com",
            "password":"createPassword"
        }

        self.invalid_input = {
            "username" : "",
            "email" : "create@user.com",
            "password" : "createPassword"
        }

    def testCreateValidCustomUser(self):
        client = APIClient()
        factory = APIRequestFactory()

        response = client.post(
            path = self.URL,
            data = self.valid_input,
            follow = True
        )
        try:
            print('response.data...',response.data)
            print('response...',response)
        except:
            pass
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)

    def testCreateInvalidCustomUser(self):
        client = APIClient()

        response = client.post(
            path = self.URL,
            data = self.invalid_input,
            follow = True
        )
        try:
            print('response.data...',response.data)
            print('response...',response)
        except:
            pass

        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)



















        #
