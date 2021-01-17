'''django rest framework'''
from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import CustomUser, UserRelations
from .serializers import CustomUserSerializer, UserRelationsSerializer, UserRelationsSerializerForView
from .permissions import ProfilePermission

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = (ProfilePermission,)
    filter_fields = ('username',)

class CustomUserViewSetApi(APIView):
    def get_extra_actions():
        return {}
    def get(self,request,format=None):
        queryset = CustomUser.objects.all()
        serializer = CustomUserSerializer(queryset,many=True)
        return Response(serializer.data)
    def post(self,request,format=None):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status.HTTP_400_BAD_REQUEST)

class UserRelationsViewSet(viewsets.ModelViewSet):
    queryset = UserRelations.objects.all()
    serializer_class = UserRelationsSerializer
    filter_fields = ('follower','followee')

class UserRelationsViewSetForView(viewsets.ModelViewSet):
    queryset = UserRelations.objects.all()
    serializer_class = UserRelationsSerializerForView
    filter_fields = ('follower','followee')
