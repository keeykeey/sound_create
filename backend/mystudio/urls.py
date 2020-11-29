"""sound_studio URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from .views import testfunc2,BokehView,RenderPostedSong,RenderPostedSongToPublic,PostSongFormView,SongEditView

urlpatterns = [
    path('',testfunc2,name = 'test2'),
    path('bokeh/',BokehView.as_view(),name='bokehview'),
    path('public/',RenderPostedSongToPublic.as_view(),name='public'),
    path('postsong/',PostSongFormView.as_view(),name='postsongformview'),
    path('mypage/',RenderPostedSong.as_view(),name='renderpostsongview'),
    path('mysong/<int:song_id>',SongEditView.as_view(),name='songeditview'),
]
