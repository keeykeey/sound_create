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
    '''or perhaps this writing pattern ...
    class User(AbstractUser):
        followers = models.ManyToManyField(
            'User', verbose_name='フォローされているユーザー', through='FriendShip',
            related_name='followees', through_fields=('followee', 'follower')
        )
    '''

    def __str__(self):
        return self.username

class UserRelations(models.Model):
    follower = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='followee_userRelations')
    followee = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='follower_userRelations')

    class Meta:
        unique_together = ('follower', 'followee')


#'''
#class UserManager(BaseUserManager):
#    """カスタムユーザーマネージャーモデル"""
#    use_in_migrations = True

#    def _create_user(self, username, email, password, **extra_fields):
#        if not username:
#            raise ValueError('The given username must be set')
#        email = self.normalize_email(email)
#        username = self.model.normalize_username(username)
#        user = self.model(username=username, email=email, **extra_fields)
#        user.set_password(password)
#        user.save(using=self.db)
#        return user

#    def create_user(self, username, email=None, password=None, **extra_fields):
#        extra_fields.setdefault('is_staff', False)
#        extra_fields.setdefault('is_superuser', False)
#        return self._create_user(username, password, **extra_fields)

#    def create_superuser(self, username, email, password, **extra_fields):
#        extra_fields.setdefault('is_staff', True)
#        extra_fields.setdefault('is_superuser', True)
#        if extra_fields.get('is_staff') is not True:
#            raise ValueError('Superuser must have is_staff=True')
#        if extra_fields.get('is_superuser') is not True:
#            raise ValueError('Superuser must have is_superuser=True')
#        return self._create_user(username, password, **extra_fields)


#class User(AbstractBaseUser, PermissionsMixin):
#    """カスタムユーザーモデル"""
#    username = models.CharField(max_length=100)
    #フォロイーフィールドをUser自身に持たせる
#    followees = models.ManyToManyField('self', blank=True, symmetrical=False)
#    is_staff = models.BooleanField("is_staff", default=False)
#    is_active = models.BooleanField("is_active", default=True)
#    date_joined = models.DateTimeField("date_joined", default=timezone.now)

#    objects = UserManager()

#    USERNAME_FIELD = "username"
#    EMAIL_FIELD = "email"
#    REQUIRED_FIELDS = []

#    class Meta:
#        verbose_name = "user"
#        verbose_name_plural = "users"
#'''
