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
    def get(self,request,pk=None,format=None):
        if pk is None:
            queryset = CustomUser.objects.all()
        else:
            queryset = CustomUser.objects.filter(id=pk)
        serializer = CustomUserSerializer(queryset,many=True)
        filter_fields = ('username',)
        if serializer.data:
            return Response(serializer.data,status.HTTP_200_OK)
        else:
            return Response(serializer.data,status.HTTP_404_NOT_FOUND)
    def post(self,request,pk=None,format=None):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status.HTTP_400_BAD_REQUEST)
    def delete(self,request,pk,format=None):
        deleting_object = CustomUser.objects.get(id=pk)
        deleting_object.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    def put(self,request,pk,format=None):
        putting_object = CustomUser.objects.get(id=pk)
        serializer = CustomUserSerializer(putting_object,request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

class UserRelationsViewSet(viewsets.ModelViewSet):
    queryset = UserRelations.objects.all()
    serializer_class = UserRelationsSerializer
    filter_fields = ('follower','followee')

class UserRelationsViewSetForView(viewsets.ModelViewSet):
    queryset = UserRelations.objects.all()
    serializer_class = UserRelationsSerializerForView
    filter_fields = ('follower','followee')
