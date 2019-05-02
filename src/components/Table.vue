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
      <li v-for="(item,key) in areaList" :class="areaActiveList[key]" @click="liareaselect(key)">{{item.deskAreaCaption}}</li>

    </ul>
    <ul class="desktop_box">
      <li v-for="(item,key) in tableList">
      <span >{{parseInt( item.totalAmount || 0)}}</span>
      <span>{{item.deskCaption}}</span>
      <span>{{item.createTime.substring(11,16)}}</span>
    </li>


    </ul>

  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  axios.defaults.baseURL = 'http://192.168.3.112:8080/';
  axios.defaults.headers.common['Authorization'] = '';
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  Vue.use(VueAxios, axios)
  import URL from '../common/url'
  export default {
    name:'Table',
    data(){
        return {
          areaList :[],
          areaActiveList:[],
          tableList:[]
        }
    },
    methods:{
        liareaactive(key){
          this.areaActiveList = [];
          //重新设置liactive所在的索引
          for(let i = 0 ;i<this.areaList.length;i++){
            if (i==key){
              this.areaActiveList.push('liactive')
            } else {
              this.areaActiveList.push('')
            }
          }
        },
      //切换楼层区域
        liareaselect(key){
          this.liareaactive(key);
          //获取楼层区域id
          let areaId = this.areaList[key].deskAreaId;
          this.queryTableList(areaId);

        },
        //查询餐台列表
        queryTableList(areaid){
          var params = new URLSearchParams();
          params.append('deskAreaId',areaid)
          this.axios.post(URL.qryDeskTopList,params).then(
            (resp) => {
                this.tableList = resp.data.responseBody.deskTopList;
            }
          );
        }
    },
    created(){
        this.axios.post(URL.qryDeskArea).then(
          (resp) => {
              //楼层区域的数据，数组
            this.areaList = resp.data.responseBody.deskAreaList;
            this.liareaactive(0);
            //获取区域id
            let areaId = this.areaList[0].deskAreaId;
            //查询默认第一个餐台列表
            this.queryTableList(areaId);

          }
        );
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
  ul{
    margin: 0px;
  }
</style>
