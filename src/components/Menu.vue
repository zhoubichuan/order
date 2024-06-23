<template>
  <div>
    <header class="menu-head">
      <span class="menu-back"></span>
      <span class="menu-table">{{deskCaption}}</span>
      <span class="menu-out">我的菜单</span>
    </header>
    <section class="menu-content">
	<span class="menu-list">
    <!--<div  class="menu-active">鱼类<span class="classpop ">1</span></div>-->
    <!--<div  >肉</div>-->
    <!--<div  >炒</div>-->
    <div v-for="(item,key) in menuClassList" :class="menuClassActiveList[key]" @click='changeClassActive(key)'> {{item.menuClassCaption}} <span :class="{classpop:true,none: item.menuCount==0?true:false  }">{{item.menuCount}}</span></div>


	</span>
      <span class="menu-info">
        <div v-for="(item,key) in menuList" >
          <template v-if="item.accumlateFlag ==0">
            <span><img src="../assets/logo.png" alt="" width="80" height="60"></span>
            <span>
                <p>{{item.menuName}} </p>
                <p>{{item.menuPrice}}元/份</p>
                <p>{{item.promotionPrice}} 元/份</p>
            </span>
            <span :class="item.menuCount==0?'none':''">{{item.menuCount}}</span>
            <span class="add_menu "> </span>
          </template>
          <template v-else>
            <span><img src="../assets/logo.png" alt="" width="80" height="60"></span>
            <span>
                <p>{{item.menuName}}</p>
                <p>{{item.menuPrice}}元/份</p>
                <p>{{item.promotionPrice}}元/份</p>
            </span>
            <span class="none">0</span>
            <div id="drinkbox">
                <span class="sub"></span>
                <span>10</span>
                <span class="add"></span>
            </div>
          </template>
        </div>

	    </span>
    </section>

    <a id="btnPreOrder" href="#" class="btn_myMenu">下单</a>


    <div class="mask none"></div>
    <div class="numbers none">
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
      <span>7</span>
      <span>8</span>
      <span>9</span>
      <span>10</span>
      <span>0</span>
      <span>12</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
axios.defaults.baseURL = '';
axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
Vue.use(VueAxios, axios)

import Url from '../common/url';
export default {
  name: 'menu',
  data () {
    return {
      deskCaption: sessionStorage.getItem('deskCaption'),
      // 菜品 类别
      menuClassList: [],
      // 菜品 类别的当前激活状态
      menuClassActiveList: [],
      // 菜品列表
      menuList: []
    }
  },
  created () {
    let pm = new URLSearchParams()
    pm.append('deskId', sessionStorage.getItem('deskId'))
    //请求接口
    this.axios.get(Url.qryMenuClassList, pm).then(resp => {
      this.menuClassList = resp.data.responseBody.menuClassList
      //生成激活状态数组
      this.changeClass(0)
      //查询默认选中大类的菜品 列表
      this.searchMenuList(this.menuClassList[0].menuClassId)
    })
  },
  methods: {
    changeClass (key) {
      for (let i = 0; i < this.menuClassList.length; i++) {
        if (i == key) {
          // this.menuClassActiveList[i] = 'menu-active'
          // $set改变引用
          this.$set(this.menuClassActiveList, i, 'menu-active')
        } else {
          // this.menuClassActiveList[i] = ''
          this.$set(this.menuClassActiveList, i, '')
        }
      }
    },
    // 改变当前菜类 的激活状态
    changeClassActive (key) {
      this.changeClass(key)
      //查询类别对应所有菜品
      this.searchMenuList(this.menuClassList[key].menuClassId)
    },
    // 根据大类查询对应菜单列表
    searchMenuList (menuClassId) {
      let pm = new URLSearchParams()
      pm.append('menuClassId', menuClassId)
      pm.append('deskId', sessionStorage.getItem('deskId'))
      pm.append('pageIndex', 1)
      pm.append('pageSize', 1000)

      this.axios.get(Url.qryMenuListByDesk, pm).then(resp => {
        if (resp.data.errCode == '000') {
          this.menuList = resp.data.responseBody.menuList
        } else {
          alert('请求数据失败')
        }
      })
    }
  }
}
</script>



<style>
.desktop_header {
  position: relative;
  background: black;
  height: 40px;
  text-align: center;
  color: white;
  line-height: 40px;
}
/*菜谱*/
/*菜谱界面 begin*/
.menu-head {
  background: #000;
  color: #fff;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 1.3rem;
  display: flex;
  position: relative;
}

.menu-head .menu-back {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0px;
  left: 4px;
}
.menu-head .menu-back:before {
  /*
    position: absolute;
    content: '';
    width: 18px;
    height: 2px;
    background-color: #fff;
    top: 17px;
    left: 4px;
    transform: rotate(45deg);*/
}
.menu-head .menu-back:after {
  /*content: '';*/
  /*width: 18px;*/
  /*height: 2px;*/
  /*background-color: #fff;*/
  /*position: absolute;*/
  /*top: 6px;*/
  /*left: 4px;*/
  /*transform: rotate(-45deg);*/
}
header span:nth-child(1):before {
  content: "";
  display: block;
  width: 10px;
  height: 10px;
  font-weight: bold;
  position: absolute;
  top: 15px;
  left: 18px;
  border-left: 2px solid #fff;
  border-top: 2px solid #fff;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
}
.menu-head .menu-table {
  margin: auto;
  color: white;
}
.menu-head .menu-out {
  background-color: darkgreen;
  position: absolute;
  right: 10px;
  top: 5px;
  color: #fff;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  padding: 0px 10px;
  border-radius: 5px;
  font-size: 14px;
}
.menu-content {
  display: flex;
  flex-flow: row;
  width: 100%;
  position: absolute;
  top: 40px;
  height: 75%;
}
.menu-content .menu-list {
  flex: 2;
  background: linear-gradient(to left, #e4e4e7, #eee, #cecece);
}
.menu-content .menu-list div {
  width: 100%;
  height: 50px;
  /*color:#fff;*/
  text-align: center;
  line-height: 50px;
  font-weight: bold;
  position: relative;
}
.menu-active {
  background-color: #ccc;
  color: #fff;
}
.menu-content .menu-info {
  flex: 8;
  display: flex;
  flex-flow: column;
}
.menu-content .menu-info div {
  margin: 5px;
  border-bottom: 2px solid #ccc;
  display: flex;
  padding: 5px;
  position: relative;
}
.menu-content .menu-info span:nth-child(1) {
  display: inline-block;
  width: 80px;
  height: 60px;
  border: 1px solid #ccc;
  flex: 1;
}
.menu-content .menu-info span:nth-child(2) {
  flex: 3;
  margin-left: 5px;
}
.menu-content .menu-info span:nth-child(3) {
  position: absolute;
  top: 23px;
  right: 95px;
  display: block;
  color: #fff;
  background: rgba(255, 132, 0, 0.76);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  font-size: 18px;
}
.menu-content .menu-info span:nth-child(4) {
  position: absolute;
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 20px;
  /* background: #DDD; */
  border-radius: 50%;
  top: 24px;
  right: 6px;
  border: solid 2px #afafb0;
  right: 10px;
  top: 17px;
}
.menu-content .menu-info span:nth-child(4):before {
  content: "";
  width: 15px;
  height: 6px;
  display: none;
  border-left: 2px solid #39b868;
  border-bottom: 2px solid #39b868;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  position: absolute;
  top: 7px;
  right: 4px;
}
.menu-content .menu-info span:nth-child(2) p {
  margin-top: 3px;
}
.menu-content .menu-info span:nth-child(2) p:nth-child(1) {
  font-weight: bold;
  font-size: 14px;
}
.menu-content .menu-info span:nth-child(2) p:nth-child(2) {
  text-decoration: line-through;
  font-size: 12px;
}
.menu-content .menu-info span:nth-child(2) p:nth-child(3) {
  color: red;
  font-size: 12px;
}
.menu-foot {
  width: 100%;
  position: absolute;
  bottom: 0px;
  height: 20%;
  text-align: right;
}
.menu-foot input {
  padding: 5px 15px;
}
.select_active {
}
.select_active:before {
  display: inline-block !important;
}

.classpop {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: orange;
  position: absolute;
  top: 0px;
  right: 0px;
  line-height: 20px;
}

#drinkbox {
  width: 66px;
  display: flex;
  border-bottom: none;
}
#drinkbox span:nth-child(1) {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ccc;
  flex: 1;
  position: absolute;
}

#drinkbox span:nth-child(1):before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 2px;
  background: black;
  position: absolute;
  top: 11px;
  left: 4px;
}

#drinkbox span:nth-child(2) {
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;

  flex: 1;
  position: absolute;
  left: 30px;
}

#drinkbox span:nth-child(3) {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ccc;
  flex: 1;
  position: absolute;
  left: 60px;
  top: 5px;
}
#drinkbox span:nth-child(3):before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 2px;
  background: black;
  position: absolute;
  top: 11px;
  left: 4px;
}
#drinkbox span:nth-child(3):after {
  content: "";
  display: inline-block;
  width: 16px;
  height: 2px;
  background: black;
  position: absolute;
  top: 11px;
  left: 4px;
  transform: rotate(90deg);
}

.mask {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: #040404;
  opacity: 0.3;
  z-index: 1;
}

.numbers {
  position: fixed;
  left: 50%;
  top: 50%;

  width: 225px;
  height: 300px;
  z-index: 2;
  transform: translate(-50%, -50%);
}

.numbers > span {
  display: inline-block;
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  font-size: 36px;
  border-radius: 50%;
  background: green;
  color: white;
  margin: 3px 0px;
}

.numbers .bggray {
  background: #bdb4b4;
}
.none {
  display: none !important;
}

.btn_myMenu {
  position: fixed;
  bottom: 30px;
  right: 10px;
  z-index: 1;
  background: #39b868;
  width: 70px;
  height: 30px;
  line-height: 30px;
  padding: 0 5px;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0px 0px 6px #979797;
  text-decoration: none;
}
/*菜谱*/
</style>
