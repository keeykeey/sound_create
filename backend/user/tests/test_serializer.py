from django.test import TestCase
from ..models import CustomUser
from ..serializers import CustomUserSerializer,UserRelationsSerializer,UserRelationsSerializer

#test for "CustomUser" Models

class CustomUserSerializerTestCase(TestCase):
    # test about username
    def testIfDataIsValid(self):
        #normal case suposed to be valid
        inputData = {
            'username' : 'testuser',
            'email' : 'testuser@test.com',
            'password' : 'testusersPassword'
        }
        serializer = CustomUserSerializer(data=inputData)
        self.assertEqual(serializer.is_valid(),True)

    def testIfUsernameIsNotUnique(self):
        #check if validation would be invalid when username is duplicated
        inputData = {
            'username' : 'testuser',
            'email' : 'testuser@test.com',
            'password' : 'testusersPassword'
        }
        inputData2 = {
            'username' : 'testuser',
            'email' : 'testuser@test.com',
            'password' : 'testusersPassword'
        }

        serializer = CustomUserSerializer(data=inputData)
        self.assertEqual(serializer.is_valid(),True)

        serializer = CustomUserSerializer(data=inputData2)
        self.assertEqual(serializer.is_valid(),False)

    def testIfUsernameHas151Chars(self):
        #150字の文字制限オーバー.model自身の制限文字数。
        inputData = {
            'username' : 'testuser10testuser20testuser30testuser40testuseru50\
                          testuser60testuser70testuser80testuser90testuse100\
                          testuse110testuse120testuse130testuse140testuse150t',
            'email' : 'testuser@test.com',
            'password' : 'testusersPassword',
        }
        serializer = CustomUserSerializer(data=inputData)
        self.assertEqual(serializer.is_valid(),False)

    def testIfUsernameHas21Chars(self):
        #20字の文字制限オーバー。validationで20字までに制限している。
        inputData = {
            'username' : 'testuser10testuser20t',
            'email' : 'testuser@test.com',
            'password' : 'testusersPassword',
        }
        serializer = CustomUserSerializer(data=inputData)
        self.assertEqual(serializer.is_valid(),False)

    def testIfUserNameHasChineseLetter(self):
        #chinese-letter for username
        inputData = {
            'username' : '赤青黄色上下右左',
            'email' : 'testuser@test.com',
            'password' : 'testuserPassword',
        }
        serializer = CustomUserSerializer(data = inputData)
        self.assertEqual(serializer.is_valid(),True)

    def testIfUserNameHasKanaMoji(self):
        #kana-moji for username
        inputData = {
            'username' : 'テストユーザーイチ',
            'email' : 'testuser@test.com',
            'password' : 'testuserPassword',
        }
        serializer = CustomUserSerializer(data = inputData)
        self.assertEqual(serializer.is_valid(),True)

    def testIfUserNameIsTooShort(self):
        #let short word to pass validation but instead,regect by frontend
        inputData = {
            'username' : 'sevenlt',
            'email' : 'testuser@test.com',
            'password' : 'testuserPassword',
        }
        serializer = CustomUserSerializer(data = inputData)
        self.assertEqual(serializer.is_valid(),False)

    # test about email
    def testIfEmailHasNoAt(self):
        inputData = {
            'username' : 'testuser',
            'email' : 'testuser.com',
            'password' : 'testuserPassword'
        }
        serializer = CustomUserSerializer(data = inputData)
        self.assertEqual(serializer.is_valid(),False)

    def testIfEmailHasTwoAt(self):
        inputData = {
            'username':'testuser',
            'email' : 'testuser@test@test.com',
            'password' : 'testuserPassword'
        }
        serializer = CustomUserSerializer(data=inputData)
        self.assertEqual(serializer.is_valid(),False)

    def testIfEmailHasNoDot(self):
        inputData = {
            'username' : 'testuser',
            'email' : 'testuser@testcom',
            'password' : 'testuserPassword'
        }
        serializer = CustomUserSerializer(data = inputData)
        self.assertEqual(serializer.is_valid(),False)

    def testIfEmailHasTwoDot(self):
        inputData = {
            'username' : 'testuser',
            'email' : 'testuser@test..com',
            'password' : 'testuserPassword'
        }
        serializer = CustomUserSerializer(data=inputData)
        self.assertEqual(serializer.is_valid(),False)

    def testIfEmailHasTwoDot2(self):
        inputData = {
            'username' : 'testuser',
            'email' : 'testuser@test.com.t',
            'password' : 'testuserPassword'
        }
        serializer = CustomUserSerializer(data=inputData)
        self.assertEqual(serializer.is_valid(),False)

    def testIfEmailHasTwoDot3(self):
        inputData = {
            'username' : 'testuser',
            'email' : 'testuser@test.t.com',
            'password' : 'testuserPassword'
        }
        serializer = CustomUserSerializer(data = inputData)
        self.assertEqual(serializer.is_valid(),True)

    # about password
    def testIfPasswordIsTooShort(self):
        #PW must have at least 8 letters
        inputData = {
            'username' : 'testuser',
            'email' : 'testuser@test.com',
            'password' : 'shortpw'
        }
        serializer = CustomUserSerializer(data=inputData)
        self.assertEqual(serializer.is_valid(),False)

class UserRelationsSerializer(TestCase):
    def test_setUp(self):
        _username = ['testuser1','testuser2','testuser3','testuser4','testuser5']
        _email = ['user1@test.com','user2@test.com','user3@test.com',
            'user4@test.com','user5@test.com'
        ]
        _password = ['testuser1Password','testuser2Password','testuser3Password',
            'testuser4Password','testuser5Password'
        ]

        for i in range(len(_username)):
            CustomUser.objects.create(
                username=_username[i],
                email=_email[i],
                password=_password[i]
            )








   #
