const UserKey = "UserLoginMsg"

export function getUser() {
  let data = JSON.parse(localStorage.getItem(UserKey))
  if (data === null) {
    return ""
  } else {
    return data.userid
  }
}

export function gettoken() {
  let data = JSON.parse(localStorage.getItem(UserKey))
  if (data === null) {
    return ""
  } else {
    return data.token
  }
}

export function getheadPortrait() {
  let data = JSON.parse(localStorage.getItem(UserKey))
  if (data === null) {
    return ""
  } else {
    return data.headPortrait
  }
}

export function getphone() {
  let data = JSON.parse(localStorage.getItem(UserKey))
  if (data === null) {
    return ""
  } else {
    return data.phone
  }
}

export function getrealName() {
  let data = JSON.parse(localStorage.getItem(UserKey))
  if (data === null) {
    return ""
  } else {
    return data.realName
  }
}

export function removeUser() {
  localStorage.removeItem(UserKey)
}
