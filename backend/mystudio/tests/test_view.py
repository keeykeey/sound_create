from django.test import TestCase
from ..models_mystudio import PostedSong, Likes
from ..serializers import PostedSongSerializer
from user.models import CustomUser
from django.core.files import File
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status
from rest_framework.test import APIClient,RequestsClient
from django.utils import timezone

class GetPostedSongTestCase(TestCase):
    def setUp(self):
        #set up users
        self.user1 = CustomUser.objects.create(
                username = 'testuser1',
                email = 'user1@test.com',
                password = 'testuser1Password'
        )
        self.userId1 = CustomUser.objects.get(username='testuser1').id

        self.user2 = CustomUser.objects.create(
                username = 'testuser2',
                email = 'user2@test.com',
                password = 'testuser2Password'
        )
        self.userId2 = CustomUser.objects.get(username='testuser2').id

        #set up songs
        self.URL = 'http://testsertver/drfPostSong/'
        self.audioFile = File(open('mystudio/tests/testAudio.mp3','rb'))
        self.audioFileUpload = SimpleUploadedFile(
            name = 'testAudio.mp3',
            content = b'audioFile'
        )
        self.postedSong = PostedSong.objects.create(
            user_id = self.user1,
            song_title = 'testSongTitle',
            is_public = True,
            genre = 'RO',
            tag = 'tag the song',
            audio_file = self.audioFileUpload,
            posted_day = timezone.datetime.today(),
        )

    def testGetToPostSongEndpoint(self):
        client = APIClient()
        response = client.get(
            self.URL,
        )
        print('print response',response.data)
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def testValidGetToPostSongEndpointDetail(self):
        client = APIClient()
        response = client.get(
            path = self.URL + str(self.userId1),
            follow = True
        )
        print('print response',response.data)
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def testInvalidGetToPostSongEndpointDetail(self):
        client = APIClient()
        response = client.get(
            path = self.URL + '222',
            follow = True
        )
        print('print response',response.data)
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)

class CreatePostSongTestCase(TestCase):
    def setUp(self):
        #set up users
        self.user1 = CustomUser.objects.create(
                username = 'testuser1',
                email = 'user1@test.com',
                password = 'testuser1Password'
        )
        self.userId1 = CustomUser.objects.get(username='testuser1').id

        self.user2 = CustomUser.objects.create(
                username = 'testuser2',
                email = 'user2@test.com',
                password = 'testuser2Password'
        )
        self.userId2 = CustomUser.objects.get(username='testuser2').id

        #set up songs
        self.URL = 'http://testsertver/drfPostSong/'
        self.audioFile = File(open('mystudio/tests/testAudio.mp3','rb'))
        self.audioFileUpload = SimpleUploadedFile(
            name = 'testAudio.mp3',
            content = b'audioFile'
        )

    def testCreateSong(self):
        client = APIClient()
        response = client.post(
            path = self.URL,
            data = {
                "user_id":self.userId1,
                "song_title":'testSongTitle',
                "is_public":"True",
                "genre":"RO",
                "tag":"tagthesong",
                "audio_file":self.audioFileUpload,
                "posted_day":timezone.datetime.today()
            },
            format = None,
        )
        print(response.data)
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)

    def testCreateSongWithoutSongTitle(self):
        client = APIClient()
        response = client.post(
            path = self.URL,
            data = {
                "user_id":self.userId1,
                "is_public":"True",
                "genre":"RO",
                "tag":"tagthesong",
                "audio_file":self.audioFileUpload,
                "posted_day":timezone.datetime.today()
            },
            format = None,
        )
        print(response.data)
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

    def testCreateSongWithoutSongTitle(self):
        client = APIClient()
        response = client.post(
            path = self.URL,
            data = {
                "user_id":self.userId1,
                "is_public":"True",
                "genre":"RO",
                "tag":"tagthesong",
                "audio_file":self.audioFileUpload,
                "posted_day":timezone.datetime.today()
            },
            format = None,
        )
        print(response.data)
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

    def testCreateSongWithoutGenre(self):
        client = APIClient()
        response = client.post(
            path = self.URL,
            data = {
                "user_id":self.userId1,
                "song_title":"testSongTitle",
                "is_public":"True",
                "tag":"tagthesong",
                "audio_file":self.audioFileUpload,
                "posted_day":timezone.datetime.today()
            },
            format = None,
        )
        print(response.data)
        #ジャンルは入力されていなくてもアップロード成功するべき
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)

    def testCreateSongWithoutTag(self):
        client = APIClient()
        response = client.post(
            path = self.URL,
            data = {
                "user_id":self.userId1,
                "song_title":"testSongTitle",
                "is_public":"True",
                "genre":"RO",
                "audio_file":self.audioFileUpload,
                "posted_day":timezone.datetime.today()
            },
            format = None,
        )
        print(response.data)
        #タグは入力されていなくてもアップロード成功するべき
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)

    def testCreateSongWithoutSong(self):
        client = APIClient()
        response = client.post(
            path = self.URL,
            data = {
                "user_id":self.userId1,
                "song_title":'testSongTitle',
                "is_public":"True",
                "genre":"RO",
                "tag":"tagthesong",
                "posted_day":timezone.datetime.today()
            },
            format = None,
        )
        print(response.data)
        #songがない場合はアップロード失敗とするべき。
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

    def testCreateSongWithoutSong(self):
        client = APIClient()
        response = client.post(
            path = self.URL,
            data = {
                "user_id":self.userId1,
                "song_title":'testSongTitle',
                "is_public":"True",
                "genre":"RO",
                "tag":"tagthesong",
                "posted_day":timezone.datetime.today()
            },
            format = None,
        )
        print(response.data)
        #songがない場合はアップロード失敗とするべき。
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

    def testCreateSongWithoutPostedDay(self):
        client = APIClient()
        response = client.post(
            path = self.URL,
            data = {
                "user_id":self.userId1,
                "song_title":'testSongTitle',
                "is_public":"True",
                "genre":"RO",
                "tag":"tagthesong",
                "audio_file":self.audioFileUpload,
            },
            format = None,
        )
        print(response.data)
        #投稿日はデフォルトで入力されるべきなので、ユーザーが指定しなくてもアップロード成功するべき。
        self.assertEqual(response.status_code,status.HTTP_201_CREATED)

class DeletePostSongTestCase(TestCase):
    def setUp(self):
        #set up users
        self.user1 = CustomUser.objects.create(
                username = 'testuser1',
                email = 'user1@test.com',
                password = 'testuser1Password'
        )
        self.userId1 = CustomUser.objects.get(username='testuser1').id

        self.user2 = CustomUser.objects.create(
                username = 'testuser2',
                email = 'user2@test.com',
                password = 'testuser2Password'
        )
        self.userId2 = CustomUser.objects.get(username='testuser2').id

        #set up songs
        self.URL = 'http://testsertver/drfPostSong/'
        self.audioFile = File(open('mystudio/tests/testAudio.mp3','rb'))
        self.audioFileUpload = SimpleUploadedFile(
            name = 'testAudio.mp3',
            content = b'audioFile'
        )
        self.postedSong = PostedSong.objects.create(
            user_id = self.user1,
            song_title = 'testSongTitle',
            is_public = True,
            genre = 'RO',
            tag = 'tag the song',
            audio_file = self.audioFileUpload,
            posted_day = timezone.datetime.today(),
        )

    def testDeleteSongValidCase(self):
        client = APIClient()
        response = client.delete(
            path = self.URL + str(self.userId1),
            data = {
                "user_id" : str(self.userId1),
                "song_title" : "testSongTitle",
                "is_public" : True,
                "genre" : "RO",
                "tag" : "tag the song",
                "audio_file" : self.audioFileUpload,
                "posted_day" : timezone.datetime.today()
            },
            format = None,
            follow = True
        )
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def testDeleteSongWithWrongUrl(self):
        client = APIClient()
        response = client.delete(
            path = self.URL + '22222',
            data = {
                "user_id" : str(self.userId1),
                "song_title" : "testSongTitle",
                "is_public" : True,
                "genre" : "RO",
                "tag" : "tag the song",
                "audio_file" : self.audioFileUpload,
                "posted_day" : timezone.datetime.today()
            },
            format = None,
            follow = True
        )
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)


class PutPostSongTestCase(TestCase):
    def setUp(self):
        #set up users
        self.user1 = CustomUser.objects.create(
                username = 'testuser1',
                email = 'user1@test.com',
                password = 'testuser1Password'
        )
        self.userId1 = CustomUser.objects.get(username='testuser1').id

        self.user2 = CustomUser.objects.create(
                username = 'testuser2',
                email = 'user2@test.com',
                password = 'testuser2Password'
        )
        self.userId2 = CustomUser.objects.get(username='testuser2').id

        #set up songs
        self.URL = 'http://testsertver/drfPostSong/'
        self.audioFile = File(open('mystudio/tests/testAudio.mp3','rb'))
        self.audioFileUpload = SimpleUploadedFile(
            name = 'testAudio.mp3',
            content = b'audioFile'
        )
        self.postedSong = PostedSong.objects.create(
            user_id = self.user1,
            song_title = 'testSongTitle',
            is_public = True,
            genre = 'RO',
            tag = 'tag the song',
            audio_file = self.audioFileUpload,
            posted_day = timezone.datetime.today(),
        )

    def testPutSongValidCase(self):
        client = APIClient()
        response = client.put(
            path = self.URL + str(self.userId1),
            data = {
                "user_id" : str(self.userId1),
                "song_title" : "ChangingTestSongTitle",
                "is_public" : True,
                "genre" : "RO",
                "tag" : "tag the song",
                "audio_file" : self.audioFileUpload,
                "posted_day" : timezone.datetime.today()
            },
            format = None,
            follow = True
        )
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def testPutSongWithWrongUrl(self):
        client = APIClient()
        response = client.put(
            path = self.URL + '222222',
            data = {
                "user_id" : str(self.userId1),
                "song_title" : "ChangingTestSongTitle",
                "is_public" : True,
                "genre" : "RO",
                "tag" : "tag the song",
                "audio_file" : self.audioFileUpload,
                "posted_day" : timezone.datetime.today()
            },
            format = None,
            follow = True
        )
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)

class GetLikesTestCase(TestCase):
    def setUp(self):
        self.user1 = CustomUser.objects.create(
                username = 'testuser1',
                email = 'user1@test.com',
                password = 'testuser1Password'
        )
        self.userId1 = CustomUser.objects.get(username='testuser1').id

        self.user2 = CustomUser.objects.create(
                username = 'testuser2',
                email = 'user2@test.com',
                password = 'testuser2Password'
        )
        self.userId2 = CustomUser.objects.get(username='testuser2').id

        #set up songs
        self.audioFile = File(open('mystudio/tests/testAudio.mp3','rb'))
        self.audioFileUpload = SimpleUploadedFile(
            name = 'testAudio.mp3',
            content = b'audioFile'
        )
        self.postedSong = PostedSong.objects.create(
            user_id = self.user1,
            song_title = 'testSongTitle',
            is_public = True,
            genre = 'RO',
            tag = 'tag the song',
            audio_file = self.audioFileUpload,
            posted_day = timezone.datetime.today(),
        )

        #set up Likes
        self.likes = Likes.objects.create(
            song_id = self.postedSong,
            user_id = self.user2,
            like_casted_day = timezone.datetime.today(),
            like_casted_time = timezone.datetime.now()
        )

        #set endpoint url
        self.URL = 'http://testsertver/drfLikes/'

    def testGetLikes(self):
        client = APIClient()
        response = client.get(
            path = self.URL
        )

        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def testGetALike(self):
        client = APIClient()
        response = client.get(
            path = self.URL + str(self.likes.id),
            follow = True
        )

        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def testGetALikeWithWrongUrl(self):
        client = APIClient()
        response = client.get(
            path = self.URL + '2222',
            follow = True
        )

        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)

class CreateLikesTestCase(TestCase):
    def setUp(self):
        self.user1 = CustomUser.objects.create(
                username = 'testuser1',
                email = 'user1@test.com',
                password = 'testuser1Password'
        )
        self.userId1 = CustomUser.objects.get(username='testuser1').id

        self.user2 = CustomUser.objects.create(
                username = 'testuser2',
                email = 'user2@test.com',
                password = 'testuser2Password'
        )
        self.userId2 = CustomUser.objects.get(username='testuser2').id

        #set up songs
        self.audioFile = File(open('mystudio/tests/testAudio.mp3','rb'))
        self.audioFileUpload = SimpleUploadedFile(
            name = 'testAudio.mp3',
            content = b'audioFile'
        )
        self.postedSong = PostedSong.objects.create(
            user_id = self.user1,
            song_title = 'testSongTitle',
            is_public = True,
            genre = 'RO',
            tag = 'tag the song',
            audio_file = self.audioFileUpload,
            posted_day = timezone.datetime.today(),
        )

        #set endpoint url
        self.URL = 'http://testsertver/drfLikes/'

    def testCreateLikes(self):
        client = APIClient()
        response = client.post(
            path = self.URL,
            data = {
                "song_id":self.postedSong.song_id,
                "user_id":self.userId2,
                "like_casted_day" : timezone.datetime.today(),
                "like_casted_time" : timezone.datetime.now()
            },
            format = None
        )

        self.assertEqual(response.status_code,status.HTTP_201_CREATED)

    def testCreateLikesWithUnexistingSongId(self):
        client = APIClient()
        response = client.post(
            path = self.URL,
            data = {
                "song_id":'22222',
                "user_id":self.userId2,
                "like_casted_day" : timezone.datetime.today(),
                "like_casted_time" : timezone.datetime.now()
            },
            format = None
        )
        print('print...',response.data)
        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

    def testCreateLikesWithUnexistingUserId(self):
        client = APIClient()
        response = client.post(
            path = self.URL,
            data = {
                "song_id":self.postedSong.song_id,
                "user_id":'22222',
                "like_casted_day" : timezone.datetime.today(),
                "like_casted_time" : timezone.datetime.now()
            },
            format = None
        )

        self.assertEqual(response.status_code,status.HTTP_400_BAD_REQUEST)

    def testCreateUnUniqueLikesInstance(self):
        client = APIClient()
        fst_response = client.post(
            path = self.URL,
            data = {
                "song_id":self.postedSong.song_id,
                "user_id":self.userId2,
                "like_casted_day" : timezone.datetime.today(),
                "like_casted_time" : timezone.datetime.now()
            },
            format = None
        )

        scd_response = client.post(
            path = self.URL,
            data = {
                "song_id":self.postedSong.song_id,
                "user_id":self.userId2,
                "like_casted_day" : timezone.datetime.today(),
                "like_casted_time" : timezone.datetime.now()
            },
            format = None
        )
        print('print...',scd_response.data)
        self.assertEqual(scd_response.status_code,status.HTTP_400_BAD_REQUEST)

class DeleteLikesTestCase(TestCase):
    def setUp(self):
        self.user1 = CustomUser.objects.create(
                username = 'testuser1',
                email = 'user1@test.com',
                password = 'testuser1Password'
        )
        self.userId1 = CustomUser.objects.get(username='testuser1').id

        self.user2 = CustomUser.objects.create(
                username = 'testuser2',
                email = 'user2@test.com',
                password = 'testuser2Password'
        )
        self.userId2 = CustomUser.objects.get(username='testuser2').id

        #set up songs
        self.audioFile = File(open('mystudio/tests/testAudio.mp3','rb'))
        self.audioFileUpload = SimpleUploadedFile(
            name = 'testAudio.mp3',
            content = b'audioFile'
        )
        self.postedSong = PostedSong.objects.create(
            user_id = self.user1,
            song_title = 'testSongTitle',
            is_public = True,
            genre = 'RO',
            tag = 'tag the song',
            audio_file = self.audioFileUpload,
            posted_day = timezone.datetime.today(),
        )

        #set up Likes
        self.likes = Likes.objects.create(
            song_id = self.postedSong,
            user_id = self.user2,
            like_casted_day = timezone.datetime.today(),
            like_casted_time = timezone.datetime.now()
        )

        #set endpoint url
        self.URL = 'http://testsertver/drfLikes/'

    def testDeleteLikes(self):
        client = APIClient()
        response = client.delete(
            path = self.URL + str(self.likes.id),
            follow = True
        )
        self.assertEqual(response.status_code,status.HTTP_200_OK)

    def testDeleteLikesWithUnexistingId(self):
        client = APIClient()
        response = client.delete(
            path = self.URL + '33333',
            follow = True
        )
        self.assertEqual(response.status_code,status.HTTP_404_NOT_FOUND)
