from pathlib import Path
from datetime import timedelta
import environ,os
env = environ.Env()
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent
env.read_env(os.path.join(BASE_DIR,'.env'))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')

ALLOWED_HOSTS = [
    '127.0.0.1',
    'django',
    'www.keeykeey.com',
]

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'mystudio',
    'user',
    'rest_framework',#added for django rest frameworks
    'rest_framework.authtoken',#added for django rest frameworks
    'djoser',#added for JWT-auth endpoint
    'corsheaders',#,added for django rest framework
    'django_filters' #for adding filtering function on endpoint through url
]

#added below for JWT-auth
from datetime import timedelta
REST_FRAMEWORK = {
    #'DEFAULT_AUTHENTICATION_CLASSES':[
    #    'rest_framework_simplejwt.authentication.JWTAuthentication',
    #],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend'
    ],
}

#SIMPLE_JWT = {
    #'AHTU_HEADER_TYPES':('JWT',),
#    'AUTH_HEADER_TYPES':('JWT',),
#    'ACCESS_TOKEN_LIFETIME':timedelta(minutes=30),
#    'USER_ID_CLAIM':'id',
#}

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ORIGIN_WHITELIST = (
    'http://127.0.0.1',
    'https://www.keeykeey.com',
)

ROOT_URLCONF = 'sound_create.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR,'templates','staticfiles','mediafiles'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                #'django.template.context_processors.media',
                #'django.template.context_processors.static',
            ],
        },
    },
]

WSGI_APPLICATION = 'sound_create.wsgi.application'

# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': env('DB_ENGINE'),
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT'),
    }
}

#DATABASES = {
#    'default':{
#        'ENGINE':'django.db.backends.sqlite3',
#        'NAME':os.path.join(BASE_DIR,'db.sqlite3')
#    }
#}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'ja'

TIME_ZONE = 'Asia/Tokyo'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# make custom user to make it easy for customizeing user model
# https://docs.djangoproject.com/ja/3.1/topics/auth/customizing/#using-a-custom-user-model-when-starting-a-project
AUTH_USER_MODEL = 'user.CustomUser'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

PROJECT_NAME = os.path.basename(BASE_DIR)

STATIC_ROOT = '/staticfiles/'
MEDIA_ROOT = '/mediafiles/'

#if DEBUG:
#    STATIC_ROOT = os.path.join(BASE_DIR,'static/')
#    MEDIA_ROOT = os.path.join(BASE_DIR,'media/')
#else:
#    STATIC_ROOT = os.path.join(BASE_DIR,'static/')
#    MEDIA_ROOT = os.path.join(BASE_DIR,'media/')

STATIC_URL = '/staticfiles/'
MEDIA_URL = '/mediafiles/'

LOGIN_URL = 'login'
