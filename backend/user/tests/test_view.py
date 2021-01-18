#https://www.codeflow.site/ja/article/test-driven-development-of-a-django-restful-api
from django.test import TestCase
from ..models import CustomUser
from rest_framework import status
from rest_framework.test import APIClient

class GetCustomUserTestCase(TestCase):
    def setUp(self):
        self.username = 'testuser1'
        self.email = 'test@test.com'
        self.password = 'testuser1spassword'
        self.setUpData1 = CustomUser.objects.create(
                username = self.username,
                email = self.email,
                password = self.password
        )
        self.user_id = CustomUser.objects.get(username='testuser1').id
        self.URL = 'http://testserver/user/drfcustomuser/'

    def testValidGetMethodToCustomUserEndPoint(self):
        client = APIClient()
        response = client.get(
            self.URL + str(self.user_id) + '/'
        )
        try:
            print('1response...',response)
            print('1response.data...',response.data)
        except:
            pass

        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def testInvalidGetMethodToCustomUserEndPoint(self):
        unexisting_id = 11111111

        client = APIClient()
        response = client.get(
            self.URL + str(unexisting_id) + '/'
        )
        try:
            print('2response.data...',response.data)
            print('2response...',response)
        except:
            pass

        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)

    def testValidGetMethodToCustomUserEndPointSortByUsername(self):
        client = APIClient()
        response = client.get(
            self.URL+ '?username=' + self.username
        )
        try:
            print('3response',response)
            print('3response.data',response.data)
        except:
            pass

        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def testInvalidGetMethodToCustomUserEndPointSortByUsername(self):
        client = APIClient()
        response = client.get(
            self.URL+ '?username=unexistingusername'
        )
        try:
            print('4response',response)
            print('4response.data',response.data)
        except:
            pass

        self.assertEqual(response.data,[])

class GetCustomUserApiTestCase(TestCase):
    def setUp(self):
        self.URL = 'http://testserver/user/drfcustomuserapi/'
        self.setUpData = CustomUser.objects.create(
            username = 'testuser1',
            email = 'test@test.com',
            password = 'testuser1spassword'
        )
        self.user_id = CustomUser.objects.get(username='testuser1').id

    def testValidGetMethodToApiCustomUserEndPoint(self):
        client = APIClient()
        response = client.get(
            self.URL + str(self.user_id),
        )
        try:
            print('response',response)
            print('response.data',response.data)
        except:
            pass
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def testinvalidGetMethodToApiCustomUserEndPoint(self):
        client = APIClient()
        unexisting_id = 11111111
        response = client.get(
            self.URL + str(unexisting_id),
        )
        try:
            print('response',response)
            print('response.data',response.data)
        except:
            pass
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)


class CreateCustomUserApiTestCase(TestCase):
    def setUp(self):
        self.URL = 'http://testserver/user/drfcustomuserapi/'
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

class DeleteCustomUserTestCase(TestCase):
    def setUp(self):
        self.URL = 'http://testserver/user/drfcustomuserapi/'
        self.setUpData = CustomUser.objects.create(
            username = 'testuser1',
            email = 'test@test.com',
            password = 'testuser1spassword'
        )
        self.user_id = CustomUser.objects.get(username = 'testuser1').id

    def testValidDeleteCustomUser(self):
        client = APIClient()
        response = client.delete(
            path = self.URL + str(self.user_id),
            data = {
                "username":"testuser1",
                "email":"test@test.com",
                "password":"testuser1spassword"
            },
            follow = True,
            format = None,
        )
        self.assertEqual(response.status_code,status.HTTP_204_NO_CONTENT)

    def testInvalidDeleteCustomUser(self):
        client = APIClient()
        unexisting_id = 11111111
        response = client.delete(
            path = self.URL + str(unexisting_id),
            data = {
                "username":"testuser1",
                "email":"test@test.com",
                "password":"testuser1spassword"
            },
            follow = True,
            format = None,
        )
        print('response',response)
        print('response.data',response.data)
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)













        #
