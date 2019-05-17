<template>
  <div class="cantai">
    <header class="desktop_header">
      <span></span>
      <h2>餐台</h2>
    </header>
    <ul class="desktop_nav">
      <!--<li class="liactive">一楼</li>-->
      <!--<li>二楼</li>-->
      <!--<li>三楼</li>-->
      <!--<li>四楼</li>-->

      <li v-for="(item,key) in areaList" :class="areaActiveList[key]" @click="liselect(key)">{{item.deskAreaCaption}}</li>


    </ul>
    <ul class="desktop_box">
      <li v-for="(item,key) in tableList" :class="item.deskStatus==2?'busy':''" @click="tableClick(key)">
        <span >{{parseInt(item.totalAmount||0)}}</span>
        <span>{{item.deskCaption}}</span>
        <span>{{item.createTime.substring(11,16)}}</span>
      </li>
    </ul>
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

import Url from '../common/url';

export default {
  name: 'table',
  data () {
    return {
      areaList: [],
      areaActiveList: [],
      tableList: []
    }
  },
  methods: {
    changearea (key) {
      // 切换楼层的选中状态
      this.areaActiveList = []
      for (let i = 0; i < this.areaList.length; i++) {
        if (i == key) {
          this.areaActiveList[i] = 'liactive';
        } else {
          this.areaActiveList[i] = '';
        }
      }
      // 切换标签查询餐台列表
      let currAreaId = this.areaList[key].deskAreaId
      this.searchTableListByAreaId(currAreaId)
    },
    // 查询楼层区域对应的餐台
    searchTableListByAreaId (id) {
      // 查询楼层区域对应的餐台列表
      let params = new URLSearchParams()
      params.append('deskAreaId', id)
      this.axios.post(Url.qryDeskTopList, params).then(resp => {
        this.tableList = resp.data.responseBody.deskTopList
      })
    },

    liselect (key) {
      this.changearea(key)
    },
    // 点击餐台，进入相应页面
    tableClick (key) {
      // 取某餐台的数据
      let obj = this.tableList[key]
      let deskStatus = obj.deskStatus,
        deskId = obj.deskId,
        deskCaption = obj.deskCaption,
        servedCount = obj.servedCount

      sessionStorage.setItem('deskId', deskId)
      sessionStorage.setItem('deskCaption', deskCaption)
      //判断跳转到哪个页
      /*
            如果deskStatus 为1 跳转到客户信息，
            如果为 2 ,则有如下两种情况
            第一种如果servedCount > 0 则跳转到“我的菜单”页面
            第二种servedCount == 0 跳到菜谱
           */

      if (deskStatus == 1) {
        location.href = '#/custominfo';
      } else {
        if (servedCount > 0) {
          location.href = '#/order';
        } else {
          location.href = '#/menu';
        }
      }
    }
  },
  created () {
    // 查询楼层区域，用钩子，每次进来会先执行这个方法
    this.axios.post(Url.qryDeskArea).then(resp => {
      this.areaList = resp.data.responseBody.deskAreaList
      //默认第一个高亮
      this.changearea(0)

      //查询第一个楼层的餐台列表
      let firstAreaId = this.areaList[0].deskAreaId
      this.searchTableListByAreaId(firstAreaId)
    })
  }
}
</script>

<style scoped>
.desktop_header {
  position: relative;
  background: black;
  height: 40px;
  text-align: center;
  color: white;
  line-height: 40px;
}
.desktop_nav {
  display: flex;
  flex-flow: row;
  background: #666;
}
.desktop_nav .liactive {
  background: #999;
}
.desktop_nav li {
  flex: 1;
  list-style: none;
  height: 50px;
  text-align: center;
  line-height: 50px;
  color: white;
}
.desktop_box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.desktop_box li {
  width: 90px;
  height: 90px;
  background: #cccccc;
  display: inline-block;
  list-style: none;
  margin: 5px;
  border-radius: 5px;
  border: solid 1px #bdb4b4;
  display: flex;
  flex-flow: column;
}
.desktop_box li span:nth-child(1) {
  color: red;
}

.desktop_box li span {
  flex: 1;
  line-height: 30px;
}
.desktop_box .busy {
  background: lightblue;
}
ul {
  margin: 0px;
}
</style>
