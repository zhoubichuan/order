<template>
  <div>
    <header class="header">登录</header>
    <ul class="ul">
      <USER :user="username" @changeuser="parentchangeuser"></USER>
      <PASS :pass="password" @changepass="parentchangepass"></PASS>
      <SAVE :save="autosave" @changesave="parentchangesave"></SAVE>
    </ul>
    <div class="btn_box"><a href="#" class="btn_login" @click.prevent="login">登录</a></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  //import vueresource from 'vue-resource'
  //Vue.use(vueresource);
  import axios from 'axios'
  import VueAxios from 'vue-axios'

  axios.defaults.baseURL = 'http://192.168.3.112:8080/';
  axios.defaults.headers.common['Authorization'] = '';
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  Vue.use(VueAxios, axios)
  /*
  var instance = axios.create({
    baseURL: 'http://192.168.3.112:8080/'
  });
  instance.defaults.headers.common['Authorization'] = '';
  instance.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
  */

  //npm install --save-dev axios vue-axios
  import USER from '@/components/login/User'
  import PASS from '@/components/login/Pass'
  import SAVE from '@/components/login/Save'
  import  {getCookie,delCookie,setCookie}    from '../common/comm'
  import URL from '../common/url'

  export default {
    name: 'Login',
    data () {
      return {
        username: '',
        password: '',
        autosave: false
      }
    },
    created (){
      if (getCookie('memeberId')!=''){
        this.autosave = true;
      }
    },
    methods: {
      parentchangeuser (parm) {
        this.username = parm
      },
      parentchangepass (parm) {
        this.password = parm
      },
      parentchangesave (parm) {
        this.autosave = parm
      },
      login () {
        console.log(this.username, this.password, this.autosave)
        /*
        let self = this;
        let xhr ='';
        if (window.XMLHttpRequest){
            xhr = new window.XMLHttpRequest();
        } else {
            //兼容ie8及以下
            xhr = new ActiveXObject('Microsoft.XMLHttp');
        }
        xhr.open('post','http://192.168.3.112:8080/CateringSystem1.0/recruitment/catering/login.do?method=login',true);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send('memberId='+this.username+'&password='+this.password);
        xhr.onreadystatechange= function(){
            if (xhr.readyState ==4 && xhr.status ==200 ){
              let json = JSON.parse(xhr.responseText);
              debugger
              if (json.responseBody.memberId){
                //自动登录选中时，才保存cookie
                if (self.autosave){
                  setCookie('memeberId',self.username,10);
                } else {
                  delCookie('memeberId');
                }
                location.href = '#/table'
              } else {
                alert('登录失败')
              }
            }
        }
      }
      */
        //debugger
        var param = new URLSearchParams();
        param.append('memberId',this.username);
        param.append('password',this.password);

        this.axios.post( URL.login ,
          param).then(
            (resp) => {
              if (resp.data.responseBody.memberId!=''){
                  if (this.autosave){
                    setCookie('memberId',this.username);
                  } else {
                    delCookie('memberId');
                  }
                  //登录成功，跳转到“餐台”页面
                  location.href = '#/table'
              } else {
                  alert('登录失败');
              }
            }



        )



     }

    },
    components: {
      USER,
      PASS,
      SAVE
    }
  }
</script>

<style>
  *{
    margin:0;
    padding:0;
  }
  .header{
    height:40px;
    line-height: 40px;
    color:white;
    background: black;
    text-align: center;
  }
  .ul {
    margin:10px;
  }
  .ul li{
    position: relative;
    height:36px;
    line-height: 36px;
    border:solid 1px #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    display:flex;
  }
  .ul li .input{
    flex:1;
    border: none;
    outline: none;
    border-radius: 5px;
    font-size:20px;
  }
  .ul li .lititle{
    width:80px;
    margin-left:10px;
    text-align: right;
  }
  .close{
    display: inline-block;
    width: 30px;
    height: 30px;
    background: #ddd;
    border-radius: 50%;
    margin-top: 3px;
    margin-right: 3px;
  }
  .close:before{
    position:absolute;
    content:'';
    width:26px;
    height:2px;
    display:inline-block;
    background:white;
    top: 17px;
    right: 5px;
    transform: rotate(45deg);
  }
  .close:after{
    position:absolute;
    content:'';
    width:26px;
    height:2px;
    display:inline-block;
    background:white;
    top: 17px;
    right: 5px;
    transform: rotate(-45deg);
  }
  .ul .liauto{
    border:none;
  }
  .switch{
    display: inline-block;
    width: 60px;
    height: 30px;
    background: #aaa;
    position: absolute;
    right: 0px;
    border-radius: 15px;

  }
  .switch_on{
    background: green;
  }
  .switch_on span{
    margin-left: 31px!important;
  }

  .switch span{
    display: inline-block;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(#aaa,#fff);
    margin-top: 1px;
    margin-left: 1px;
  }
  .btn_box{
    margin:10px;
  }
  .btn_login{
    display: inline-block;
    width: 100%;
    line-height: 36px;
    height: 36px;
    background: green;
    border-radius: 5px;
    text-align: center;
    color: white;
    text-decoration: none;
    letter-spacing: 20px;
    font-size: 18px;
    box-shadow: 2px 2px 3px #b1aeae;
  }
</style>
