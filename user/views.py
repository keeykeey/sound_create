from django.shortcuts import render,redirect
from django.contrib.auth.views import LoginView as AuthLoginView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render , redirect
from django.urls import reverse
from django.views import View

from django.views.generic import ListView
#from .models import PostedSong


# Create your views here.
def testfunc(request):
    return render(request,'test.html',{})

def testfunc2(request):
    return render(request,'test2.html',{})

#class PostedSong(ListView):
#    template_name = 'mystudio.html'
#    #model = PostedSong.objects.get(pk=pk)
#    model = PostedSong


#for signup
from django.contrib.auth.models import User
from django.contrib.auth import login as auth_login,logout as auth_logout, authenticate
from django.views.generic import CreateView
from . forms import UserCreateForm
class Create_account(CreateView):
    def post(self, request, *args, **kwargs):
        form = UserCreateForm(data=request.POST)
        if form.is_valid():
            form.save()
            #フォームから'username'を読み取る
            username = form.cleaned_data.get('username')
            #フォームから'password1'を読み取る
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            auth_login(request, user)
            return redirect('/')
        return render(request, 'create.html', {'form': form,})

    def get(self, request, *args, **kwargs):
        form = UserCreateForm(request.POST)
        return  render(request, 'create.html', {'form': form,})

''' write again under below'''
from .forms import LoginForm
class LoginView(AuthLoginView):
    #form_class = LoginForm
    #template_name = 'login.html'
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
        #user = authenticate(request,username=username2,password=password2)
        auth_login(request,user)
        #return redirect('mystudio')
        return redirect('mystudio')

class LogoutView(AuthLoginView):
    def get(self,request,*args,**kwargs):
        auth_logout(request)
        return redirect('test')
