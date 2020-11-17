from django import forms
from django.contrib.auth.forms import UsernameField,get_user_model
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from .models import CustomUser
from mystudio.models import PostedSong

class UserCreateForm(UserCreationForm):
    def __init__(self, *args, **kwargs):
        #super().__init__()...親クラスUserCreationFormの__init__を実行するの意味
        super().__init__(*args, **kwargs)
        #htmlの表示を変更可能にする
        self.fields['username'].widget.attrs.update({'class':'form-control','placeholder':'Username'})
        self.fields['email'].widget.attrs.update({'class':'form-control','placeholder':'email adress'})
        self.fields['password1'].widget.attrs.update({'class':'form-control','placeholder':'Password'})
        self.fields['password2'].widget.attrs.update({'class':'form-control','placeholder':'Password(confirmation)'})

    class Meta:#Meta情報
        db_table='havingAccountUsers'
        #model = get_user_model
        model = CustomUser
        fields = ("username", "email","password1","password2")

class LoginForm(AuthenticationForm):
    '''form for login screen '''
    def __init__(self,*args,**kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({'class':'form-control','placeholder':'Username'})
        self.fields['password'].widget.attrs.update({'class':'form-control','placeholder':'Password'})

    class Meta:
       #model = get_user_model
       model = CustomUser
       fields = ("username", "password")

class PostSongForm(forms.ModelForm):
    '''form for each users to post their song'''
    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)
        self.fields['song_title'].widget.attrs.update({'class':'form-control','placeholder':'Song Title'})
        self.fields['artist_name'].widget.attrs.update({'class':'form-control','placeholder':'Artist Name'})
        self.fields['genre'].widget.attrs.update({'class':'form-control','placeholder':'Genre'})
        self.fields['tag'].widget.attrs.update({'class':'form-control','placeholder':'Tag'})
        self.fields['song_id'].widget.attrs.update({'class':'form-control','placeholder':'Song Id'})
        self.fields['audio_file'].widget.attrs.update({'class':'form-control','placeholder':'Audio File'})

    class Meta:
        model = PostedSong
        fields = ('song_title','artist_name','genre','tag','song_id','audio_file')


'''
class PostedSong(models.Model):
    song_id = models.AutoField(primary_key=True)
    #user_id = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.PROTECT)
    user_id = models.ForeignKey(CustomUser,on_delete=models.PROTECT)
    song_title = models.CharField(max_length=50)
    artist_name = models.CharField(max_length=50)
    genre = models.CharField(max_length = 25)
    tag = models.CharField(max_length=50)
    audio_file = models.FileField(default='', upload_to='')

    def __str__(self):
        return self.song_title
'''





    #
