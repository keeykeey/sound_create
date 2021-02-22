#!/bin/sh
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py collectstatic --no-input
gunicorn sound_create.wsgi:application --bind 0.0.0.0:8000
