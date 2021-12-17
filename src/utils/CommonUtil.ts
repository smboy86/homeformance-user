export const getFilenameByImagePicker = (imgUri: string) => {
  return imgUri.substring(imgUri.lastIndexOf('/') + 1, imgUri.length);
};

export const priceToString = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const checkPasswordPattern = (str: string) => {
  var pattern1 = /[0-9]/; // 숫자
  var pattern2 = /[a-zA-Z]/; // 문자
  var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자

  if (
    !pattern1.test(str) ||
    !pattern2.test(str) ||
    !pattern3.test(str) ||
    str.length < 8
  ) {
    return false;
  } else {
    return true;
  }
};
