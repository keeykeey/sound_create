from rest_framework import serializers
from .models_mystudio import PostedSong,Likes

class PostedSongSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostedSong
        fields = ('song_id','user_id','song_title','is_public','genre','tag','audio_file')

class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = ('song_id','user_id','like_casted_day','like_casted_time')
