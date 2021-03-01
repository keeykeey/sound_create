import React from 'react';
import Style from './DeleteSongControl.module.scss';
import axios from 'axios';
import endPoint from '../../services/endPoint';

const DRFPOSTSONG_API_URL_FORDELETE = endPoint.getPostSongUrlForPutDelete()

const DeleteSongControl = (song_id) => {

  const deleteSong = (songId) =>{
    axios.delete(
      DRFPOSTSONG_API_URL_FORDELETE + String(songId)
    ).then(res=>{
      window.location.reload();
    }).catch(err=>{
      alert('削除に失敗しました。入力内容を確認してください。')
    })
  }

  return(
    <button type='button' className={Style.deleteButton} onClick={(e)=>{deleteSong(song_id)}}>
      <i className="far fa-trash-alt"></i>
    </button>
  )
}

export default DeleteSongControl
