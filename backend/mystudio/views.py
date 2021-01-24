from .models_mystudio import PostedSong,Likes,TestAudioPost
from .serializers import PostedSongSerializer,PostedSongSerializerForView, LikesSerializer, TestAudioPostSerializer
from rest_framework import viewsets

class PostSongViewSet(viewsets.ModelViewSet):
    queryset = PostedSong.objects.all()
    serializer_class = PostedSongSerializer
    filter_fields = ('is_public',)

class PostSongViewSetForView(viewsets.ModelViewSet):
    queryset = PostedSong.objects.all()
    serializer_class = PostedSongSerializerForView
    filter_fields = ('is_public',)

class LikesViewSet(viewsets.ModelViewSet):
    queryset = Likes.objects.all()
    serializer_class = LikesSerializer
    filter_fields = ('song_id','user_id',)

class TestAudioPostViewSet(viewsets.ModelViewSet):
    queryset = TestAudioPost.objects.all()
    serializer_class = TestAudioPostSerializer
