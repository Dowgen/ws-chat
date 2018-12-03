<template>
  <div class="hello">
    <v-toolbar color="blue" dark tabs>
      <v-toolbar-title>聊聊天</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <div class="hot-list">
      <v-list>
        <div v-for="item,index in msgList">
          <v-list-tile avatar>
            <v-list-tile-action>
              {{transTime(item.time)}} 
            </v-list-tile-action>
            <span style="width:20px;"></span>
            <v-list-tile-content>
              <v-list-tile-title> {{item.name}}说：</v-list-tile-title>
              <v-list-tile-sub-title>{{item.msg}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </div>
      </v-list>
    </div>
    <div style="height:60px"></div>
    <footer class="footer">
      <v-menu offset-x>
        <v-btn slot="activator" dark icon>
          <v-icon>star</v-icon>
        </v-btn>
        <v-list>
          <span v-for="(item, index) in emoji.people"
          :key="index" class="emoji-item" @click="str += item">{{ item }}</span>
        </v-list>
      </v-menu>
      <v-menu offset-x>
        <v-btn slot="activator" dark icon>
          <v-icon>star</v-icon>
        </v-btn>
        <v-list>
          <span v-for="(item, index) in emoji.nature"
          :key="index" class="emoji-item" @click="str += item">{{ item }}</span>
        </v-list>
      </v-menu>
      <input class="input-control" @keyup.enter="Enter" v-model="str">
    </footer>
  </div>
</template>

<script>
import emoji from '../utils/emoji';

export default {
  name: "Home",
  props: {
    msg: String
  },
  data() {
    return {
      emoji: emoji,
      str: "",
      ws: null,
      msgList: [{ name: "主持人", msg: "开始表演", time: new Date() }]
    };
  },
  watch:{
    msgList(){
      this.$nextTick(function () {
        window.scrollTo(0,document.body.scrollHeight)
      })
    }
  },
  mounted() {
    this.connect();
  },
  methods: {
    connect() {
      var that = this;
      this.$ws = new WebSocket("ws://10.111.27.103:8181");
      this.$ws.onopen = function(e) {
        that.$ws.send("大家好，我是：" + that.IsPC());
      };
      this.$ws.onmessage = function(data) {
        that.msgList.push(JSON.parse(data.data));
      };
      this.$ws.onclose = function() {
        console.log("怎么就关了呢？");
      };
    },
    Enter() {
      if(this.str){
        this.$ws.send(this.str);
        this.str = "";
      }
    },
    IsPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag ? "电脑" : "手机";
    },
    transTime: function(date) {
      if (date) {
        var date = new Date(date);
        var year =
          date.getFullYear() > 9
            ? date.getFullYear()
            : "0" + date.getFullYear();
        var mouth =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
        var hour =
          date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
        var min =
          date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
        var sec =
          date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
        /* return (
          year + "-" + mouth + "-" + day + " " + hour + ":" + min + ":" + sec
        ); */
        return (
          hour + ":" + min + ":" + sec
        );
      } else {
        return "";
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.text-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: red;
  }
}/* 
.hot-list{
  padding-bottom: 70px;
} */
.input-control {
  width: auto;
  height: 40px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  text-indent: 10px;
  line-height: 28px;
  font-size: 14px;
  color: #333333;
  font-style: normal;
}
.footer {
  background: #eee;
  opacity: 0.8;
  padding: 10px 0;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
.emoji-item{
  margin:0 3px;
}
</style>
