from django.db import models
from django.conf import settings
from audiofield.fields import AudioField
import os.path
#from pydub import AudioSegment
#from pydub.playback import play
import numpy as np
from django.contrib.auth.models import User
from user.models import CustomUser

# Create your models here.

class PostedSong(models.Model):
    song_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(CustomUser,on_delete=models.PROTECT)
    song_title = models.CharField(max_length=50)
    artist_name = models.CharField(max_length=50)
    genre = models.CharField(max_length = 25)
    tag = models.CharField(max_length=50)
    audio_file = models.FileField(default='', upload_to='audio/')

    def __str__(self):
        return self.song_title

class TestPost(models.Model):
    text = models.CharField(max_length=50)
    image = models.ImageField(upload_to='images/',verbose_name='image',null=True,blank=True)
    audio = models.FileField(default='', upload_to='audio/')
    def __str__(self):
        return self.text
