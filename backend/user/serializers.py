from rest_framework import serializers
from .models import CustomUser, UserRelations
from rest_framework.authtoken.models import Token

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:#Meta情報
        model = CustomUser
        fields = ("id","username", "email","password")
        extra_kwargs = {
            'password':{'write_only':True,'required':True},
        }

    def create(self,validated_data):
        customUser = CustomUser.objects.create_user(**validated_data)
        Token.objects.create(user=customUser)
        return customUser

class UserRelationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRelations
        fields = ('follower','followee')
