from django.test import TestCase
from ..models_mystudio import PostedSong, Likes
from user.models import CustomUser
from django.core.files import File
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient
from django.utils import timezone


# Create your tests here.

class PostSongTestCase(TestCase):
    def setUp(self):
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

    def testGetmethodToEndpoint(self):
        URL = 'http://127.0.0.1:8000/drfPostSong/'
        client = APIClient()
        response = client.get(
            URL,
        )
        self.assertEqual(response.status_code,200)

    def testPostingDatas(self):
        URL = 'http://127.0.0.1:8000/drfPostSong/'
        client = APIClient()
        audioFile = File(open('mystudio/tests/testAudio.mp3','rb'))
        audioFileUploaded = SimpleUploadedFile(
            name = 'testAudio.mp3',
            content = b'audioFile',
        )

        postData = {
            'user_id' : CustomUser.objects.all()[0].id,
            'song_title' : 'testAudio',
            'is_public' : True,
            'genre' : 'RO',
            'tag' : 'tag',
            'audio_file' : audioFileUploaded,
            'posted_day' : timezone.datetime.today()
        }

        response = client.post(
            URL,
            postData,
            format='multipart',
        )

        self.assertEqual(response.status_code,201)

    def testPuttingDatas(self):
        user_id = CustomUser.objects.all()[0].id
        URL_POST = 'http://127.0.0.1:8000/drfPostSong/'
        URL_PUT = 'http://127.0.0.1:8000/drfPostSong/'+str(user_id)
        client = APIClient()
        audioFile = File(open('mystudio/tests/testAudio.mp3','rb'))
        audioFileUploaded = SimpleUploadedFile(
            name = 'testAudio.mp3',
            content = b'audioFile',
        )

        postData = {
            'user_id' : user_id,
            'song_title' : 'testAudio-v1',
            'is_public' : True,
            'genre' : 'RO',
            'tag' : 'tag',
            'audio_file' : audioFileUploaded,
            'posted_day' : timezone.datetime.today()
        }

        response = client.post(
            URL_POST,
            postData,
            format='multipart',
        )

        check_response = client.get(URL_PUT)
        print('check response...',check_response)
        self.assertEqual(check_response.status_code,201)

        postData2 = {
            'user_id' : user_id,
            'song_title' : 'testAudio-v2',
            'is_public' : True,
            'genre' : 'PO',
            'tag' : 'tag-changed',
            'audio_file' : audioFileUploaded,
            'posted_day' : timezone.datetime.today()
        }

        response2 = client.put(
            URL_PUT,
            postData2,
            format='json',
            follow = True
        )

        print('CustomUser...',CustomUser.objects.all())
        print('user_id...',user_id)
        print('response2...',response2)
        print('response2.data...',response2.data)

        self.assertEqual(response2.status_code,201)
