function roundNumberDown(number,n){
  const arr = String(number).split('.');
  if (arr.length === 1){
    return number;
  }else if (arr.length === 2){
    const integer_string = arr[0];
    const decimal_string = arr[1];
    return Number(integer_string + '.' + decimal_string.slice(0,n))
  }
}

function convertSecondsToMinutes_string(number){
  const integerNumber = roundNumberDown(number,0)
  const minutes = String(integerNumber / 60).split('.')[0]
  const seconds = String(integerNumber % 60)
  if (seconds.length === 1){
    return String(minutes) + ':0' + String(seconds)
  }else if(seconds.length===2){
    return String(minutes) + ':' + String(seconds)
  }
}

const myMath = {
  roundNumberDown,
  convertSecondsToMinutes_string
}

export default myMath
