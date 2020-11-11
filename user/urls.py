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
from .views import testfunc#, testfunc2, PostedSong,LoginView,LogoutView,Create_account

urlpatterns = [
   path('',testfunc,name = 'test'),
#    path('test2/',testfunc2,name = 'test2'),
#    path('mystudio/',PostedSong.as_view(),name='mystudio'),
#    path('signup/', LoginForm,name = 'signup'),
#    path('login/', LoginView.as_view(),name = 'login'),
#    path('logout/', LogoutView.as_view(),name='logout'),
#    path('signin/',Create_account.as_view(),name='signin'),
    #path('testsignup/',Create_account.as_view(),name='testsignup'),
]
