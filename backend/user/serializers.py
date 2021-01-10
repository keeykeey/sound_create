from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import CustomUser, UserRelations
from django.core.validators import MinLengthValidator
from django.contrib.auth.validators import UnicodeUsernameValidator
#from rest_framework.authtoken.models import Token

class CustomUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        max_length=20,
        validators = [
            UnicodeUsernameValidator(),
            MinLengthValidator(8),
            UniqueValidator(queryset=CustomUser.objects.all())
            ]
        )

    email = serializers.EmailField(
        validators = [
            UniqueValidator(queryset = CustomUser.objects.all())
        ]
    )

    password = serializers.CharField(
        validators = [
            MinLengthValidator(8)
            ]
    )


    class Meta:#Meta情報
        model = CustomUser
        fields = ("id","username", "email","password")
        extra_kwargs = {
            'password':{'write_only':True,'required':True},
        }


    def create(self,validated_data):
        customUser = CustomUser.objects.create_user(**validated_data)
        #Token.objects.create(user=customUser)
        return customUser

class UserRelationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRelations
        fields = ('id','follower','followee','related_day','related_time')

class UserRelationsSerializerForView(serializers.ModelSerializer):
    follower = CustomUserSerializer()
    followee = CustomUserSerializer()
    class Meta:
        model = UserRelations
        fields = ('id','follower','followee','related_day','related_time')
