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

const myMath = {
  roundNumberDown
}

export default myMath
