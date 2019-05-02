
var setCookie = function(key,val,expire){
    var date= new Date();
    date.setTime(date.getTime() + (expire)*24*3600*1000 );
    document.cookie = key+'='+val +'; expires='+ date.toGMTString();
  }
var delCookie =  (key )=> {
    setCookie(key,'',-10);
  }
var getCookie = (name) => {
    var cookies = document.cookie;
    var cookieArr = cookies.split('; ');
    for (var i= 0 ;i< cookieArr.length;i++){
      var cookie = cookieArr[i].split('=');
      if (cookie[0] == name){
        return cookie[1]
      }
    }
    return ''
  }



 export {setCookie,delCookie,getCookie}

/*
export default  function area(radius) {
  return Math.PI * radius * radius;
}*/

