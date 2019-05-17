<template>
  <div>
    <header class="header">登录</header>
    <ul class="ul">
      <User :user="username" @childuserchange="parentuserchange"></User>
      <Pass :pass="password" @childpasschange="parentpasschange"></Pass>
      <Save :save="autosave" @childsavechange="parentsavechange"></Save>
    </ul>
    <div class="btn_box"><a href="#" class="btn_login" @click="login">登录</a></div>
  </div>
</template>

<script>
import Vue from 'vue';
//  import axios from 'axios'
//  import vueAxios from 'vue-axios'
//  axios.defaults.baseURL = 'http://192.168.3.111:8080/'
//  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//  Vue.use(axios, vueAxios)
import axios from 'axios';
import VueAxios from 'vue-axios';
axios.defaults.baseURL = 'http://192.168.3.111:8080/';
axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
Vue.use(VueAxios, axios)

import User from '@/components/login/user';
import Pass from '@/components/login/pass';
import Save from '@/components/login/save';
import Url from '@/common/url';
import { setCookie, delCookie, getCookie } from '@/common/comm';
export default {
  name: 'Login',
  data () {
    return {
      username: '1234',
      password: '123456',
      autosave: true
    }
  },
  components: {
    User,
    Pass,
    Save
  },
  methods: {
    login () {
      // 序列化参数
      let params = new URLSearchParams()
      params.append('memberId', this.username)
      params.append('password', this.password)
      this.axios.post(Url.login, params).then(resp => {
        if (resp.data.responseBody.memberId) {
          // 判断是否保存登录
          if (this.autosave) {
            setCookie('memberId', this.username)
          } else {
            delCookie('memberId')
          }
          // 保存登录的id及登录服务员名
          sessionStorage.setItem('memberId', this.username)
          sessionStorage.setItem(
            'memberName',
            resp.data.responseBody.memberName
          )
          //跳转到餐台 页面
          location.href = '#/table';
        } else {
          alert('登录失败')
        }
      })
    },
    parentuserchange (p) {
      this.username = p
    },
    parentpasschange (p) {
      this.password = p
    },
    parentsavechange (p) {
      this.autosave = p
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.header {
  height: 40px;
  line-height: 40px;
  color: white;
  background: black;
  text-align: center;
}
.ul {
  margin: 10px;
}
.ul li {
  position: relative;
  height: 36px;
  line-height: 36px;
  border: solid 1px #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.close {
  display: inline-block;
  width: 30px;
  height: 30px;
  background: #ddd;
  border-radius: 50%;
  margin-top: 3px;
  margin-right: -3px;
}
.close:before {
  position: absolute;
  content: "";
  width: 26px;
  height: 2px;
  display: inline-block;
  background: white;
  top: 17px;
  right: 5px;
  transform: rotate(45deg);
}
.close:after {
  position: absolute;
  content: "";
  width: 26px;
  height: 2px;
  display: inline-block;
  background: white;
  top: 17px;
  right: 5px;
  transform: rotate(-45deg);
}
.ul .liauto {
  border: none;
}
.switch {
  display: inline-block;
  width: 60px;
  height: 30px;
  background: #aaa;
  position: absolute;
  right: 0px;
  border-radius: 15px;
}
.switch_on {
  background: green;
}
.switch_on span {
  margin-left: 31px !important;
}

.switch span {
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(#aaa, #fff);
  margin-top: 1px;
  margin-left: 1px;
}
.btn_box {
  margin: 10px;
}
.btn_login {
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
.header {
  height: 40px;
  line-height: 40px;
  color: white;
  background: black;
  text-align: center;
}
.ul {
  margin: 10px;
}
.ul li {
  position: relative;
  height: 36px;
  line-height: 36px;
  border: solid 1px #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
}
.ul li .input {
  flex: 1;
  border: none;
  outline: none;
  border-radius: 5px;
}
.ul li .lititle {
  margin-left: 10px;
  text-align: right;
}
.close {
  display: inline-block;
  width: 30px;
  height: 30px;
  background: #ddd;
  border-radius: 50%;
  margin-top: 3px;
  margin-right: 3px;
}
.close:before {
  position: absolute;
  content: "";
  width: 26px;
  height: 2px;
  display: inline-block;
  background: white;
  top: 17px;
  right: 5px;
  transform: rotate(45deg);
}
.close:after {
  position: absolute;
  content: "";
  width: 26px;
  height: 2px;
  display: inline-block;
  background: white;
  top: 17px;
  right: 5px;
  transform: rotate(-45deg);
}
.ul .liauto {
  border: none;
}
.switch {
  display: inline-block;
  width: 60px;
  height: 30px;
  background: #aaa;
  position: absolute;
  right: 0px;
  border-radius: 15px;
}
.switch_on {
  background: green;
}
.switch_on span {
  margin-left: 31px !important;
}

.switch span {
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(#aaa, #fff);
  margin-top: 1px;
  margin-left: 1px;
}
.btn_box {
  margin: 10px;
}
.btn_login {
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
