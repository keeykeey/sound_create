from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/',obtain_auth_token),
    path('',include('mystudio.urls')),
    path('user/',include('user.urls')),
    path('api/auth/',include('djoser.urls.jwt')),#added for JWT-auth
]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)+static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [path('__debug__/',include(debug_toolbar.urls))] + urlpatterns
