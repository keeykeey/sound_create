from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.utils import timezone

class PostedSong(models.Model):
    genreChoices=[
        ('RO','Rock'),
        ('PO','Pops'),
        ('HH','Hip-hop'),
        ('CL','Classic'),
        ('HR','Hard-rock'),
        ('HM','Heavy-metal'),
        ('GR','Groovy'),
    ]
    song_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    song_title = models.CharField(max_length=50)
    is_public = models.BooleanField(default=True)
    genre = models.CharField(
        max_length = 25,
        choices=genreChoices,
    )
    tag = models.CharField(max_length=50)
    audio_file = models.FileField(default='', upload_to='audio/')
    posted_day = models.DateTimeField(default=timezone.datetime.today())
    like_casted_user = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        verbose_name='users who casted like on the song',
        through='Likes',
        related_name='+',
    )

    def __str__(self):
        return self.song_title

class Likes(models.Model):
    song_id = models.ForeignKey(PostedSong,on_delete=models.CASCADE,related_name='users_who_like_the_song')#related_name後に逆参照する。https://djangobrothers.com/blogs/related_name/
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='songs_which_user_likes')
    like_casted_day = models.DateTimeField(default=timezone.datetime.today())
    like_casted_time = models.DateTimeField(default=timezone.datetime.now())

    class Meta:
        unique_together=('song_id','user_id')
