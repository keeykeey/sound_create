FROM python:3.8
ENV PYTHONBUFFERD 1
RUN mkdir /workspace
WORKDIR /workspace
COPY requirements.txt /workspace/
RUN apt-get update && \
    apt-get -y install ffmpeg libavcodec-extra && \
    pip install --upgrade pip && \
    pip install -r requirements.txt 
#CMD ["python3","manage.py","runserver","0.0.0.0:8000"]
EXPOSE 8000
