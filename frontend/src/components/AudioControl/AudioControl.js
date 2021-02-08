import Style from './AudioControl.module.scss';
import myMath from '../../mylibrary/myMath'

const AudioControl = (
  song_id,
  audioFilePath
)=>{
  let is_playing = false;
  const defaultAudioVolume = 0.5

  function showAudioCurrentTime(){
    const audioElement = document.querySelector('#audioTagIdOfSong'+String(song_id));
    const placeToShowCurrentTime = document.querySelector('#currentTimeOfSong'+String(song_id))

    audioElement.addEventListener('timeupdate',(event)=>{
      placeToShowCurrentTime.innerHTML = myMath.convertSecondsToMinutes_string(audioElement.currentTime)
    })
  }

  function showAudioDuration(){
    const audioElement = document.querySelector('#audioTagIdOfSong'+String(song_id));
    const placeToShowAudioDuration = document.querySelector('#durationOfSong'+String(song_id))
    placeToShowAudioDuration.innerHTML = myMath.convertSecondsToMinutes_string(audioElement.duration)
  }

  function stopAudio(){
    const audioElement = document.querySelector('#audioTagIdOfSong'+String(song_id));
    audioElement.pause();
    audioElement.currentTime = 0
    is_playing = false;
  }

  function playAndPauseAudio(){
    const audioElement = document.querySelector('#audioTagIdOfSong'+String(song_id));
    audioElement.volume = defaultAudioVolume;
    showAudioCurrentTime()
    showAudioDuration()
    if (is_playing === false){
      audioElement.play();
      is_playing = true;
    }else if(is_playing === true){
      audioElement.pause()
      is_playing = false;
    }
  }

  function handleChangeAudioVolume(event){
    const value = event.target.value;
    const audioElement = document.querySelector('#audioTagIdOfSong'+String(song_id));
    audioElement.volume = myMath.roundNumberDown(Number(value)/100,2)
  }

  return(
    <div className={Style.col}>
      <div className={Style.row}>
        <div
          className={Style.audioCurrentTime}
          id = {'currentTimeOfSong'+String(song_id)}
          >0:00</div>
        <div className = {Style.betweenTimes}>  / </div>
        <div
          className={Style.audioDuration}
          id = {'durationOfSong'+String(song_id)}
          >0:00</div>
      </div>
      <div>
        <button
        className = {Style.stopButton}
        onClick = {stopAudio}
        ><i className="fas fa-stop"></i></button>
        <button
          className = {Style.playOrPauseButton}
          onClick={playAndPauseAudio}
        ><i className="fas fa-pause"/> / <i className="fas fa-play"/></button>
        <i className="fas fa-volume-up"></i>
        <input
          type='range'
          className = {Style.audioVolumeAdjuster}
          min='0'
          max='100'
          onChange={handleChangeAudioVolume}
          />
      </div>
    </div>
  )
}

const AudioControl_api = (
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
    ><i className="fas fa-pause"/> / <i className="fas fa-play"/></button>
  )
}

export default AudioControl
