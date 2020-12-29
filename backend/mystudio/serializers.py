from rest_framework import serializers
from .models import PostedSong

class PostedSongSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostedSong
        fields = ('song_id','user_id','song_title','artist_name','genre','tag','audio_file')
