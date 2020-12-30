'''django rest framework'''
from .models_mystudio import PostedSong,Likes
from .serializers import PostedSongSerializer, LikesSerializer
from rest_framework import viewsets

class PostSongViewSet(viewsets.ModelViewSet):
    queryset = PostedSong.objects.all()
    serializer_class = PostedSongSerializer

class LikesViewSet(viewsets.ModelViewSet):
    queryset = Likes.objects.all()
    serializer_class = LikesSerializer
