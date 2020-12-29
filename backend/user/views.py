'''django rest framework'''
from rest_framework import viewsets
from .models import CustomUser, UserRelations
from .serializers import CustomUserSerializer, UserRelationsSerializer
from .permissions import ProfilePermission

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = (ProfilePermission,)

class UserRelationsViewSet(viewsets.ModelViewSet):
    queryset = UserRelations.objects.all()
    serializer_class = UserRelationsSerializer
