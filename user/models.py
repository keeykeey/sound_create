from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
from django.conf import settings

# Create your models here.

# custom user  :  https://selfs-ryo.com/detail/compare_django_user_models
class CustomUser(AbstractUser):
    followers = models.ManyToManyField(
        settings.AUTH_USER_MODEL,verbose_name='users follow you',through='UserRelations',
        related_name = '+',through_fields=('followee','follower')#through_fields(source,target)
    )
    followees = models.ManyToManyField(
        settings.AUTH_USER_MODEL,verbose_name='users you follow',through = 'UserRelations',
        related_name = '+',through_fields=('follower','followee')
    )

    def __str__(self):
        return self.username

class UserRelations(models.Model):
    follower = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='followee_userRelations')
    followee = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='follower_userRelations')

    class Meta:
        unique_together = ('follower', 'followee')
