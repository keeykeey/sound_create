'''django rest framework'''
from .models import PostedSong
from .serializers import PostedSongSerializer
from rest_framework import viewsets

class PostSongViewSet(viewsets.ModelViewSet):
    queryset = PostedSong.objects.all()
    serializer_class = PostedSongSerializer
