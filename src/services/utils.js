/* eslint-disable func-names */
function addZero(number) {
  if (number >= 10) { return number; }
  return `0${number}`;
}

// eslint-disable-next-line no-extend-native
Date.prototype.formatedDateTime = function () {
  const month = addZero(this.getMonth() + 1);
  const day = addZero(this.getDate());
  const hours = addZero(this.getHours());
  const minutes = addZero(this.getMinutes());

  return `${this.getFullYear()}/${month}/${day} ${hours}:${minutes}`;
};
