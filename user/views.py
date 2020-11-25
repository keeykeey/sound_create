#https://docs.djangoproject.com/ja/3.1/topics/class-based-views/generic-editing/

from django.shortcuts import render,redirect
from django.contrib.auth.views import LoginView as AuthLoginView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render , redirect
from django.urls import reverse
from django.views import View
from django.views.generic import CreateView,ListView,DetailView
from django.contrib.auth.models import User
from django.contrib.auth import login as auth_login,logout as auth_logout, authenticate
from .forms import UserCreateForm,LoginForm,TestPostForm#PostSongForm,
from django.db import models
from mystudio.models import PostedSong,TestPost

#for register
class Register(CreateView):
    def post(self, request, *args, **kwargs):
        form = UserCreateForm(data=request.POST)
        content_dict = {
            'form':form,
            'errorMessage':'Invalid username.',
        }
        if not form.is_valid():
            return render(request,'register.html',content_dict)

        form.save()
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password1')
        user = authenticate(username=username, password=password)
        auth_login(request, user)
        return redirect('/')

    def get(self, request, *args, **kwargs):
        form = UserCreateForm(request.POST)
        return  render(request, 'register.html', {'form': form,})

# for login
class LoginView(AuthLoginView):
    def get(self,request,*args,**kwargs):
        '''method for GET request '''
        context = {
            'form' :LoginForm()
            }
        return render(request,'login.html',context)

    def post(self,request,*args,**kwargs):
        '''method for POST request'''
        form = LoginForm(data=request.POST)
        if not form.is_valid():
            return render(request,'login.html',{'form':form})
        user = form.get_user()
        auth_login(request,user)
        return redirect('renderpostedsong')

# for logout
class LogoutView(AuthLoginView):
    def get(self,request,*args,**kwargs):
        auth_logout(request)
        return render(request,'logout.html')

class TestPostView(CreateView):
    def post(self,request,*args,**kwargs):
        form = TestPostForm(request.POST,request.FILES)
        content_dict={
            'form':form
        }
        if not form.is_valid():
            print('ooops')
            return render(request,'test.html')
        form.save()
        return redirect('rendertestpost')
    def get(self,request,*args,**kwargs):
        form = TestPostForm(data=request.GET)
        return render(request,'testpost.html',{'form':form,})

class RenderTestPost(DetailView):
     def get(self,request,*args,**kwargs):
         object_list = TestPost.objects
         context = {
             'object_list':object_list,
            }
         return render(request,'testpost.html',context)

     def post(self,request,*args,**kwargs):
         pass

        #
