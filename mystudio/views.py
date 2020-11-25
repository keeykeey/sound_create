from django.shortcuts import render,get_object_or_404
from django.views.generic.list import ListView
from django.views.generic import CreateView,TemplateView,DetailView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import View
from django.urls import reverse
from .models import PostedSong
from .forms import PostSongForm

# Create your views here.

def testfunc(request):
    return render(request,'test.html',{})

def testfunc2(request):
    username = request.user
    return render(request,'test2.html',{'username':username})

class RenderPostedSongToPublic(ListView):
    model = PostedSong
    template_name = 'public.html'

#class RenderPostedSong(ListView):
#class RenderPostedSong(LoginRequiredMixin,View):
class RenderPostedSong(DetailView):
     def get(self,request,*args,**kwargs):
         userId = request.user.id
         userName=request.user
         object_list = PostedSong.objects.filter(user_id=userId)
         context = {
             'object_list':object_list,
             'user_id':userId,
         }
         return render(request,'mystudio.html',context)

     def post(self,request,*args,**kwargs):
         pass

# for posting a song
class PostSongFormView(CreateView):
    def post(self,request,*args,**kwargs):
        form = PostSongForm(request.POST,request.FILES)

        content_dict = {
            'form':form
        }
        if not form.is_valid():
            print('validation failed... the error is ...')
            print(form.errors)
            return render(request,'postsong.html',content_dict)
        print('check the form...')
        print(form)
        print('print post...')
        print(request.POST)
        print('request.files...')
        print(request.FILES)
        posted_info = form.save(False)
        posted_info.user_id = request.user
        posted_info.save()
        return redirect('renderpostedsong')

    def get(self,request,*args,**kwargs):
        form = PostSongForm(data=request.GET)
        return render(request,'postsong.html',{'form':form,})

# for editing a song
class SongEditView(ListView):
    model = PostedSong
    template_name = 'song_edit_view.html'
    #context_object_name = 'ob_name'





    #
