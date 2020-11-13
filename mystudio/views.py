from django.shortcuts import render
from django.views.generic.list import ListView
from .models import PostedSong


# Create your views here.

def testfunc(request):
    return render(request,'test.html',{})

def testfunc2(request):
    return render(request,'test2.html',{})

class PostedSong(ListView):
    def get_loginUsersName(self):
        return self.request.user.username

    template_name='mystudio.html'
    queryset = PostedSong.objects.filter(user_id=1)
