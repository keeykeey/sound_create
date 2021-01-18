from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import CustomUserViewSet, CustomUserViewSetApi,UserRelationsViewSet, UserRelationsViewSetForView

router = routers.DefaultRouter()
router.register('drfcustomuser',CustomUserViewSet)
router.register('drfuserrelations',UserRelationsViewSet)
router.register('drfuserrelationsforview',UserRelationsViewSetForView)

urlpatterns = [
    path('',include(router.urls)),
    path('drfcustomuserapi/',CustomUserViewSetApi.as_view()),
    path('drfcustomuserapi/<int:pk>',CustomUserViewSetApi.as_view(),name='drfcustomuser_api'),
#    path('drfcustomuserapi/<str:username>',CustomUserViewSetApi.as_view(),name='drfcustomuser_api')
]
