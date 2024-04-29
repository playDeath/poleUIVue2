<template>
  <div id="app">
    <!-- <my-Progress :percent="percent" :stroke-width="40" status="active" text-inside/> -->
    <!-- <my-Progress :percent="100" :stroke-width="40" status="wrong"/> -->
    <!-- <my-Progress :percent="percent" :stroke-width="40" vertical/> -->
    <!-- <Progress :percent="25" status="success"/>
    <Progress :percent="45" status="active" text-inside :stroke-width="100"/> -->
    <!-- <Progress :percent="65" status="active" vertical :stroke-width="100"/> -->
    <!-- <Progress :percent="100" :stroke-width="100"/> -->
    <!-- <Progress :percent="25" hide-info /> -->
    <!-- <div class="box">
      <div class="son-box"></div>
    </div> -->
    <!-- <Button @click="showMessage">打开</Button> -->
    <!-- <div style="width: 1000px;height: 100px;">
      <span v-tooltip>走开走开走开走开走开走开走开走开走开走开走开走开走开走开走开走开走开走开走开走开走开走开走开走开走开走开</span>
    </div> -->
    <VirtualList></VirtualList>
    <!-- <h1>{{ currentIndex }}</h1>
    <button @click="percent++">点击</button> -->
    <!-- <Select v-model="val" multiple @on-select="changeVal">
      <Option v-for="item in arr" :value="item.value" :key="item.value">{{ item.value }}</Option>
    </Select> -->
  </div>
</template>

<script>
import myProgress from './components/Progress.vue'
import VirtualList from './components/VirtualList.vue'
export default {
  name: 'App',
  components: {
    myProgress,
    VirtualList
  },
  data() {
    return {
      percent: 0,
      val: [],
      arr: [{
        value: 'A1',
        sortNum: 1
      }, {
        value: 'A2',
        sortNum: 2
      },
      {
        value: 'A3',
        sortNum: 3
      },
      {
        value: 'B1',
        sortNum: 4
      }]
    }
  },
  created() {
    this.val = ['A1']
  },
  computed: {
    currentIndex() {
      if (false) {
        return this.percent
      }
      return '0'
    }
  },
  methods: {
    showMessage() {
      this.$Message.info({
        content: 'hello world'
      })
    },
    changeVal(...args) {
      this.$nextTick(() => {
        const map = new Map()
        this.arr.forEach(item => {
          map.set(item.value, item.sortNum)
        })
        this.val.sort((a, b) => {
          return map.get(a) - map.get(b)
        })
      })
    }
  },
  // created() {
  //   setTimeout(() => {
  //     this.percent = 50
  //   }, 1000)
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 400px;
  height: 100vh;
}

.box {
  width: 200px;
  /* height: 0; */
  height: 200px;
  background-color: skyblue;
  transition: all 1s linear;
}

.son-box {
  width: 100px;
  height: 100px;
  display: inline-block;
  background-color: red;
}

#app:hover .box {
  height: 200px;
}
</style>
