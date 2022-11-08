export const commaNumber = (value) => {
  value = value.toString();

  value = value.split('').reverse().reduce((pre, cur, idx) => {
    if (idx > 0 && idx % 3 === 0) {
     pre.push(',')
    }

    return [...pre, cur]
  }, []).reverse().join('');

  return value;
}