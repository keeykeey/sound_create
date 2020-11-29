from django import forms
#from django.contrib.auth.forms import UsernameField,get_user_model
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from .models import CustomUser
from mystudio.models import PostedSong,TestPost

class PostSongForm(forms.ModelForm):
    '''form for each users to post their song'''
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        self.fields['song_title'].widget.attrs.update({'class':'form-control','placeholder':'Song Title'})
        self.fields['artist_name'].widget.attrs.update({'class':'form-control','placeholder':'Artist Name'})
        self.fields['genre'].widget.attrs.update({'class':'form-control','placeholder':'Genre'})
        self.fields['tag'].widget.attrs.update({'class':'form-control','placeholder':'Tag'})
        self.fields['audio_file'].widget.attrs.update({'class':'form-control','placeholder':'Audio File'})

    class Meta:
        model = PostedSong
        fields = ('song_title','artist_name','genre','tag','song_id','audio_file')






    #
