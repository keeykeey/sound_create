#https://www.codeflow.site/ja/article/test-driven-development-of-a-django-restful-api
from django.test import TestCase
from ..models import CustomUser,UserRelations
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

class CreateCustomUserTestCase(TestCase):
    def setUp(self):
        self.URL = 'http://testserver/user/drfcustomuser/'

    def testCreateValidCustomUser(self):
        client = APIClient()
        response = client.post(
            path = self.URL,
            data = {
                "username" : "testuser",
                "email" : "test@test.com",
                "password" : "p@ssword"
            },
            format = None
        )
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)

    def testCreateInvalidCustomUSer(self):
        client = APIClient()
        response = client.post(
            path = self.URL,
            data = {
                "username" : "a",
                "email" : "test@test.com",
                "password" : "p@ssword"
            },
            format = None
        )
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

class DeleteCustomUserTestCase(TestCase):
    def setUp(self):
        self.URL = 'http://testserver/user/drfcustomuser/'
        self.username = 'testuser'
        self.email = 'email@mail.com'
        self.password = 'p@ssword'
        self.custom_user = CustomUser.objects.create(
            username = self.username,
            email = self.email,
            password = self.password
        )
        self.user_id = CustomUser.objects.get(username = self.username).id

    def testDeleteCustomUserTestCase(self):
        client = APIClient()
        response = client.delete(
            path = self.URL + str(self.user_id),
            data = {
                "username" : self.username,
                "email" : self.email,
                "password" : self.password
            },
            format = None,
            follow = True
        )
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def testDeleteInvalidCustomUserTestCase(self):
        client = APIClient()
        invalid_user_id = '330'
        response = client.delete(
            path = self.URL + invalid_user_id,
            data = {
                "username" : self.username,
                "email" : self.email,
                "password" : self.password
            },
            format =None,
            follow = True
        )
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)

class PutCustomUserTestCase(TestCase):
    def setUp(self):
        self.URL = 'http://testserver/user/drfcustomuser/'
        self.username = 'testuser'
        self.email = 'email@mail.com'
        self.password = 'p@ssword'
        self.custom_user = CustomUser.objects.create(
            username = self.username,
            email = self.email,
            password = self.password
        )
        self.user_id = CustomUser.objects.get(username = self.username).id

    def testPutCustomUserTestCase(self):
        client = APIClient()
        response = client.put(
            path = self.URL,
            data = {
                "username" : self.username,
                "email" : 'changingEmail@mail.com',
                "password" : self.password
            },
            format = None
        )

        try:
            print('response...',response)
            print('response.data...',response.data)
        except:
            pass

        self.assertEqual(response.status_code,status.HTTP_405_METHOD_NOT_ALLOWED)

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

class DeleteCustomUserApiTestCase(TestCase):
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

class CreateUserRelationsTestCase(TestCase):
    def setUp(self):
        self.URL = 'http://testserver/user/drfuserrelations/'
        self.followeeData = CustomUser.objects.create(
            username = 'followee' ,
            email = 'followee@test.com',
            password = 'followeePw'
        )
        self.followerData = CustomUser.objects.create(
            username = 'follower',
            email = 'follower@test.com',
            password = 'followerPw'
        )
        self.followeeId = CustomUser.objects.get(
            username = 'followee'
        ).id
        self.followerId = CustomUser.objects.get(
            username = 'follower'
        ).id

    def testCreateUserRelations(self):
        client = APIClient()
        response = client.post(
            path = self.URL,
            data = {
                "follower" : int(self.followerId),
                "followee" : int(self.followeeId)
            },
            format = None
        )
        try:
            print('response',response)
            print('response.data',response.data)
        except :
            pass

        self.assertEqual(response.status_code,status.HTTP_201_CREATED)

    def testCreateInvalidUserRelations(self):
        client = APIClient()
        response = client.post(
            path = self.URL,
            data = {
                "follower":1111,
                "followee":2222
            },
            format =None
        )
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

class GetUserRelationsTestCase(TestCase):
    def setUp(self):
        self.URL = 'http://testserver/user/drfuserrelations/'
        self.follower = CustomUser.objects.create(
            username = 'follower',
            email = 'follower@email.com',
            password = 'followerpassword'
        )
        self.followerId = CustomUser.objects.get(username = 'follower').id

        self.followee = CustomUser.objects.create(
            username = 'followee',
            email = 'followee@mail.com',
            password = 'followeepassword'
        )
        self.followeeId = CustomUser.objects.get(username = 'followee').id

        self.userRelations = UserRelations.objects.create(
            follower = (self.follower),
            followee = (self.followee)
        )

    def testGetUserRelationsTestCase(self):
        client = APIClient()
        response = client.get(
            self.URL
        )
        try:
            print('response....',response)
            print('response.data...',response.data)
        except:
            pass

        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def testGetAnUserRelationsTestCase(self):
        client = APIClient()
        response = client.get(
            self.URL+ str(self.userRelations.id),
            follow = True
        )

        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def testGetAnInvalidUserRelationsTestCase(self):
        client = APIClient()
        response = client.get(
            self.URL+ str(50),
            follow = True
        )

        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)



















        #
