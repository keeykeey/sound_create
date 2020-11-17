from django.shortcuts import render,redirect
from django.contrib.auth.views import LoginView as AuthLoginView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render , redirect
from django.urls import reverse
from django.views import View
from django.views.generic import ListView
from django.contrib.auth.models import User
from django.contrib.auth import login as auth_login,logout as auth_logout, authenticate
from django.views.generic import CreateView
from . forms import UserCreateForm,LoginForm,PostSongForm

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

# for posting a song
class PostSongView(View):
    def post(self,request,*args,**kwargs):
        form = PostSongForm(data=request.POST)
        content_dict = {
            'form':form
        }
        if not form.is_valid():
            return render(request,'postsong',content_dict)
        form.save()
        #user_id = request.user.id
        songTitle = form.cleaned_data.get('song_id')
        artistName = form.cleaned_data.get('artist_name')
        genre = form.cleaned_data.get('genre')
        tag = form.cleaned_data.get('tag')
        audioFile = form.cleaned_data.get('audio_file')
        return redirect('renderpostedsong')

    def get(self,request,*args,**kwargs):
        form = PostSongForm(data=request.POST)
        return render(request,'postsong.html',{'form':form,})

'''
song_id = models.AutoField(primary_key=True)
#user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.PROTECT)
user_id = models.ForeignKey(CustomUser,on_delete=models.PROTECT)
song_title = models.CharField(max_length=50)
artist_name = models.CharField(max_length=50)
genre = models.CharField(max_length = 25)
tag = models.CharField(max_length=50)
audio_file = models.FileField(default='', upload_to='')
'''

'''
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
'''

        #
