from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
from django.conf import settings
import sys
sys.path.append('../')
from mystudio.models_mystudio import PostedSong,Likes
from django.utils import timezone

class CustomUser(AbstractUser):
    followers = models.ManyToManyField(
        settings.AUTH_USER_MODEL,verbose_name='users follow you',through='UserRelations',
        related_name = '+',through_fields=('followee','follower')#through_fields(source,target)
    )

    followees = models.ManyToManyField(
        settings.AUTH_USER_MODEL,verbose_name='users you follow',through = 'UserRelations',
        related_name = '+',through_fields=('follower','followee')
    )

    likes_that_user_casted = models.ManyToManyField(
        PostedSong,
        verbose_name='likes that user casted',
        through=Likes,
        related_name='+',
    )

    def __str__(self):
        return self.username

class UserRelations(models.Model):
    follower = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='followee_userRelations')
    followee = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='follower_userRelations')
    related_day = models.DateTimeField(default=timezone.datetime.today())
    related_time = models.DateTimeField(default=timezone.datetime.now())

    class Meta:
        unique_together = ('follower', 'followee')
