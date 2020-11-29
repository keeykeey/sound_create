from django.shortcuts import render,redirect,get_object_or_404
from django.views.generic.list import ListView
from django.views.generic import CreateView,TemplateView,DetailView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import View
from django.urls import reverse
from .models import PostedSong
from .forms import PostSongForm
from bokeh.plotting import figure,output_file,show
from bokeh.embed import components
from bokeh.resources import CDN
import numpy as np
from .mylib import line_graph_components

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
        return redirect('renderpostsongview')

    def get(self,request,*args,**kwargs):
        form = PostSongForm(data=request.GET)
        return render(request,'postsong.html',{'form':form,})

# for editing a song
class SongEditView(ListView):
    model = PostedSong
    template_name = 'song_edit_view.html'
    def get(self,request,song_id,*args,**kwargs):
        object_list = PostedSong.objects.filter(song_id=song_id)
        script,div,resources=line_graph_components()
        context = {
            'object_list':object_list,
            'script':script,
            'div':div,
            'resources':resources,
            'text':'audio info'
        }

        return render(request,'song_edit_view.html',context)

    def post(self,request,*args,**kwargs):
        pass

class BokehView(ListView):
    def get(self,request,*args,**kwargs):
        _x = np.array([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
        _y = np.sin(_x/5)
        plot = figure(title='line plot',
            x_axis_label='x_label',
            y_axis_label='y_label',
            plot_width=1000,
            plot_height=500,
        )
        plot.line(_x,_y,line_width=3)
        script,div=components(plot)
        context = {
            'script':script,
            'div':div,
            'resources':CDN.render(),
        }
        print('bokeh!')
        return render(request,'bokeh.html',context)

    def post(self,request,*args,**kwargs):
        pass

    #
