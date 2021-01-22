#https://docs.djangoproject.com/ja/3.1/topics/testing/overview/#writing-tests

from django.test import TestCase
from ..models_mystudio import PostedSong,Likes,TestAudioPost
from django.core.files import File
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status
from rest_framework.test import APIClient
from django.utils import timezone
import sys
sys.path.append('../')
from user.models import CustomUser

#test for PostedSong

class CreatePostedSongTestCase(TestCase):
    def setUp(self):
        #At first,set up user that post songs
        self.USER = CustomUser.objects.create(
            username = 'testuser',
            email = 'testuser@email.com',
            password ='I dont need password'
        )

        self.userId = CustomUser.objects.filter(username='testuser')
        self.song_title = 'testSongTitle'
        self.audioFile = File(open('mystudio/tests/testAudio.mp3','rb'))
        self.audioFileUpLoad = SimpleUploadedFile(
            name = 'testAudio.mp3',
            content = b'audioFile',
        )

    def testCreatePostedSongTestCase(self):
        self.postedSong = PostedSong.objects.create(
            user_id=self.USER,
            song_title = self.song_title,
            is_public = True,
            genre = 'RO',
            tag = 'tag the song',
            audio_file = self.audioFileUpLoad,
            posted_day = timezone.datetime.today(),
        )

        self.assertEqual(self.postedSong.song_title,self.song_title)

    def testPostedSongAudioFileNameTestCase(self):
        self.postedSong = PostedSong.objects.create(
            user_id=self.USER,
            song_title = self.song_title,
            is_public = True,
            genre = 'RO',
            tag = 'tag the song',
            audio_file = self.audioFileUpLoad,
            posted_day = timezone.datetime.today(),
        )

        self.assertEqual(len(self.postedSong.audio_file.name) > 0,True)

    #invalid case
    def testCreatePostedSongWithoutSongTitle(self):
        self.postedSong = PostedSong.objects.create(
            user_id=self.USER,
            song_title = '',
            is_public = True,
            genre = 'RO',
            tag = 'tag the song',
            audio_file = self.audioFileUpLoad,
            posted_day = timezone.datetime.today(),
        )

        try:
            print('song_title in invalid creation test',self.song_title)
        except:
            print("it's inside the exception")
        self.assertEqual(self.postedSong.song_title==self.song_title,False)

    def testCreatePostedSongWithTooLognSongTitle(self):
        is_valid =False
        try:
            self.postedSong = PostedSong.objects.create(
                user_id=self.USER,
                song_title = 'hellowmynameisnewsongandiamgladtobeheretoseeyou.hellomynameis....',
                is_public = True,
                genre = 'RO',
                tag = 'tag the song',
                audio_file = self.audioFileUpLoad,
                posted_day = timezone.datetime.today(),
            )

            is_valid=True
        except:
            pass

        self.assertEqual(is_valid,False)

    def testCreatePostedSongWithTooLongGenre(self):
        is_valid =False
        try:
            self.postedSong = PostedSong.objects.create(
                user_id=self.USER,
                song_title = self.song_title,
                is_public = True,
                genre = 'isthissongratherROCKthanPOPS?Idonotknowwhich',
                tag = 'tag the song',
                audio_file = self.audioFileUpLoad,
                posted_day = timezone.datetime.today(),
            )

            is_valid=True
        except:
            pass

        self.assertEqual(is_valid,False)

    def testCreatePostedSongWithTooLongTag(self):
        is_valid =False
        try:
            self.postedSong = PostedSong.objects.create(
                user_id=self.USER,
                song_title = self.song_title,
                is_public = True,
                genre = 'HH',
                tag = 'heyyou,justtagmeandyouwontmisswhoIam.heyyou,justtagme...',
                audio_file = self.audioFileUpLoad,
                posted_day = timezone.datetime.today(),
            )

            is_valid=True
        except:
            pass

        self.assertEqual(is_valid,False)

class CreateLikesTestCase(TestCase):
    def setUp(self):
        #set up user
        self.USER = CustomUser.objects.create(
            username = 'testuser',
            email = 'testuser@email.com',
            password ='I dont need password'
        )
        self.userId = CustomUser.objects.filter(username='testuser')

        #set up song
        self.song_title = 'testSongTitle'
        self.audioFile = File(open('mystudio/tests/testAudio.mp3','rb'))
        self.audioFileUpLoad = SimpleUploadedFile(
            name = 'testAudio.mp3',
            content = b'audioFile',
        )

        self.postedSong = PostedSong.objects.create(
            user_id=self.USER,
            song_title = self.song_title,
            is_public = True,
            genre = 'GR',
            tag = 'tag the song',
            audio_file = self.audioFileUpLoad,
            posted_day = timezone.datetime.today(),
        )

    def testCreateLike(self):
        instance = Likes.objects.create(
            song_id = self.postedSong,
            user_id = self.USER,
            like_casted_day = timezone.datetime.today()
        )

        #If Id is positive,it means that Like was successfully created
        self.assertEqual(int(instance.id)>0,True)

    def testCreateLikeWithOutSongId(self):
        is_valid = False
        try:
            instance = Likes.objects.create(
                song_id = '',
                user_id = self.USER,
                like_casted_day = timezone.datetime.today()
            )
            is_valid = True
        except:
            pass
        self.assertEqual(is_valid,False)

    def testCreateLikeWithoutUserId(self):
        is_valid = False
        try:
            instance = Likes.objects.create(
                song_id = self.postedSong,
                user_id = '',
                like_casted_day = timezone.datetime.today()
            )
            is_valid = True
        except:
            pass
        self.assertEqual(is_valid,False)

    def testCreateLikeWithoutLikeCastedDay(self):
        is_valid = True
        try:
            instance = Likes.objects.create(
                song_id = self.postedSong,
                user_id = self.USER,
            )
        except:
            is_valid = False
        self.assertEqual(is_valid,True)














#
