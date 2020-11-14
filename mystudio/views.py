from django.shortcuts import render
from django.views.generic.list import ListView
from django.views.generic import TemplateView
from .models import PostedSong
from django.contrib.auth.mixins import LoginRequiredMixin

# Create your views here.

def testfunc(request):
    return render(request,'test.html',{})

def testfunc2(request):
    return render(request,'test2.html',{})


class RenderPostedSong(ListView):
     def get(self,request,*args,**kwargs):
         userId = request.user.id
         object_list = PostedSong.objects.filter(user_id=userId)
         context = {
             'object_list':object_list
         }
         return render(request,'mystudio.html',context)
     def post(self,request,*args,**kwargs):
         pass
