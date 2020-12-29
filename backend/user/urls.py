from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import CustomUserViewSet,UserRelationsViewSet

router = routers.DefaultRouter()
router.register('drfcustomuser',CustomUserViewSet)
router.register('drfuserrelaions',UserRelationsViewSet)

urlpatterns = [
    path('',include(router.urls)),
]
