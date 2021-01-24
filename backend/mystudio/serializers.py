from rest_framework import serializers
from .models_mystudio import PostedSong,Likes,TestAudioPost
import sys
sys.path.append('../')
from user.serializers import CustomUserSerializer
from user.models import CustomUser

class PostedSongSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostedSong
        fields = ('song_id','user_id','song_title','is_public','genre','tag','audio_file')

class PostedSongSerializerForView(serializers.ModelSerializer):
    user_id=CustomUserSerializer()
    class Meta:
        model = PostedSong
        fields = ('song_id','user_id','song_title','is_public','genre','tag','audio_file')

class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = ('id','song_id','user_id','like_casted_day','like_casted_time')

class TestAudioPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestAudioPost
        fields = ('id','audio_file')
