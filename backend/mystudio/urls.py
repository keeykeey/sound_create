from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import PostSongViewSet,LikesViewSet

router = routers.DefaultRouter()
router.register('drfPostSong',PostSongViewSet)
router.register('drfLikes',LikesViewSet)

urlpatterns = [
    path('',include(router.urls))
]
