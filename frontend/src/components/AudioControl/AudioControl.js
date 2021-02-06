import {useState} from 'react';
import Style from './AudioControl.module.scss';

const AudioControl_pre = (
   audioFilePath
)=>{
  const playAudio = () => {
    console.log(String(audioFilePath))
    const audio = new Audio();
    audio.src = audioFilePath;
    audio.volume = 0.6;
    audio.load();
    audio.play();
  }
  return(
    <button
      id={audioFilePath}
      onClick={playAudio}
    >
      this audio control:{audioFilePath}
    </button>
  )
}

const AudioControl = (
  song_id,
  audioFilePath
)=>{
  let is_connected = false;
  let is_playing = false;

  const pushPlayButton = async()=>{
    const audioContext = new AudioContext();
    const audioElement = document.querySelector('#audioTagIdOfSong'+String(song_id));
    if (is_connected===false){
      const track = audioContext.createMediaElementSource(audioElement);
      track.connect(audioContext.destination);
      is_connected = true;
    }

    if (audioContext.state === 'suspended'){
      audioContext.resume();
    }

    if (is_playing === false){
      audioElement.play();
      is_playing = true
    }else if (is_playing === true){
      audioElement.pause();
      is_playing = false
    }
  }

  return(
    <button
      id = {'playButtonIdOfSong'+song_id}
      className = {Style.playOrPauseButton}
      onClick = {pushPlayButton}
      data-playing='false'
      role='switch'
      aria-checked='false'
    ><span>Play / Pause</span></button>
  )
}

export default AudioControl
