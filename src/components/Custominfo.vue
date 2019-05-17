<template>
  <div>
    <header class="header"><span></span>
      <h2>客户信息</h2></header>
    <ul class="ul">
      <li ><span >人数：</span><input type="text" v-model="people" class="input"><span class="close" @click="clear(1)"></span></li>
      <li ><span >手机号：</span><input type="text" v-model="phoneno"  class="input"><span class="close"  @click="clear(2)"></span></li>
      <li ><span >押金：</span><input type="text" v-model="yajing" class="input"><span class="close"  @click="clear(3)"></span></li>
    </ul>
    <div class="btn_box"><a href="#" class="btn_login" @click="post" >确定</a></div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
axios.defaults.baseURL = 'http://192.168.3.111:8080/';
axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
Vue.use(VueAxios, axios)

//导入添加客户信息地址
import Url from '../common/url';

export default {
  name: 'custominfo',
  data () {
    return {
      people: '',
      phoneno: '',
      yajing: ''
    }
  },
  methods: {
    clear (key) {
      switch (key) {
        case 1:
          this.people = '';
          break
        case 2:
          this.phoneno = '';
          break
        case 3:
          this.yajing = '';
          break
      }
    },
    // 录入客户信息
    post () {
      var pm = new URLSearchParams()
      pm.append('deskId', sessionStorage.getItem('deskId'))
      pm.append('peopleNumbers', this.people)
      pm.append('callingNumber', this.phoneno)
      pm.append('prepaidPay', this.yajing)
      pm.append('memberId', sessionStorage.getItem('memberId'))
      pm.append('memberName', sessionStorage.getItem('memberName'))

      this.axios.post(Url.addCustomerInfo, pm).then(resp => {
        if (resp.data.errCode == '000') {
          location.href = '#/menu';
        } else {
          alert('登录失败')
        }
      })
    }
  }
}
</script>

<style>
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
  font-size: 20px;
}
.ul li .lititle {
  width: 80px;
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
header span:nth-child(1) {
  display: block;
  width: 44px;
  height: 44px;
  font-weight: bold;
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>
