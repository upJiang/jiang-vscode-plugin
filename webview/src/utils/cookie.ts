export function setCookie(name: string, value: string) {
    let naw = new Date().getTime() - 1000 * 3600 * 24 * 7
    let now = new Date(naw)
    document.cookie = name + '=' + value
  }
  
  export function getCookie(name: string) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)
    if (arr) {
      return arr[2]
    } else {
      return null
    }
  }
  
  export function delCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  }
  