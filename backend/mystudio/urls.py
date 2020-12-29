from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import PostSongViewSet

router = routers.DefaultRouter()
router.register('drfPostSong',PostSongViewSet)

urlpatterns = [
    path('',include(router.urls))
]
