import Cookies from "js-cookie";

const TokenKey = "Admin-Token";
const UserIdKey = "Admin-UserId";
const sessionKey = "Admin-sessionId";
const customerNameKey = "Admin-customerName";
const userSigKey = "Admin-userSig";
const imageKey = "Admin-image";
const mobile = "Admin-mobile";

// export function getuserSig() {
//   if (!Cookies.get(userSigKey)) return null;
//   let str = decodeURIComponent(Cookies.get(userSigKey));
//   let userInfo = JSON.parse(str);
//   return userInfo;
// }
//
// export function setuserSig(userSig) {
//   let temp = JSON.stringify(userSig);
//   let str = encodeURIComponent(temp);
//   return Cookies.set(userSigKey, str);
// }
export function getuserSig() {
  let temp=localStorage.getItem(userSigKey);
  if (!temp) return null;
  let str = decodeURIComponent(temp);
  return JSON.parse(str) || {};
}

export function setuserSig(userSig) {
  let temp=JSON.stringify(userSig);
  let str=encodeURIComponent(temp)
  localStorage.setItem(userSigKey, str);
}
export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getUserId() {
  return Cookies.get(UserIdKey);
}

export function setUserId(userId) {
  return Cookies.set(UserIdKey, userId);
}

export function removeUserId() {
  return Cookies.remove(UserIdKey);
}

export function getSessionId() {
  return Cookies.get(sessionKey);
}

export function setSessionId(sessionId) {
  return Cookies.set(sessionKey, sessionId);
}

export function removeSessionId() {
  return Cookies.remove(sessionKey);
}

export function getCustomerName() {
  return Cookies.get(customerNameKey);
}

export function setCustomerName(customerName) {
  return Cookies.set(customerNameKey, customerName);
}

export function removeCustomerName() {
  return Cookies.remove(customerNameKey);
}

// export function getuserSig() {
//   return Cookies.get(userSigKey);
// }

// export function setuserSig(userSig) {
//   return Cookies.set(userSigKey, userSig);
// }

export function removeuserSig() {
  return Cookies.remove(userSigKey);
}

export function getimage() {
  return Cookies.get(imageKey);
}

export function setimage(image) {
  return Cookies.set(imageKey, image);
}

export function removeimage() {
  return Cookies.remove(imageKey);
}

export function getmobile() {
  return Cookies.get(mobile);
}

export function setmobile(num) {
  return Cookies.set(mobile, num);
}

export function removemobile() {
  return Cookies.remove(mobile);
}
