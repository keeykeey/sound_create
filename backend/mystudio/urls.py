from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import PostSongViewSet,PostSongViewSetForView,LikesViewSet,TestAudioPostViewSet

router = routers.DefaultRouter()
router.register('drfPostSong',PostSongViewSet)
router.register('drfPostSongForView',PostSongViewSetForView)
router.register('drfLikes',LikesViewSet)
router.register('drfTest',TestAudioPostViewSet)

urlpatterns = [
    path('',include(router.urls))
]
