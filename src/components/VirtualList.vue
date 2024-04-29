<template>
    <div class="container" ref="virtualList">
      // 占位元素
      <div class="phantom" :style="{ height: listHeight + 'px' }"></div>
      // 渲染区域
      <div
        class="content"
        :style="{ transform: `translate3d(0, ${currentOffset}px, 0)` }"
      >
        <div
          v-for="item in visibleData"
          :key="item.id"
          :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
          class="list-item"
        >
          {{ item.value }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        listData: [],
        itemSize: 50,
        screenHeight: 0,
        currentOffset: 0,
        start: 0,
        end: 0,
      };
    },
    mounted() {
      for (let i = 1; i <= 1000; i++) {
        this.listData.push({id: i, value: '字符内容' + i})
      }
      this.screenHeight = this.$el.clientHeight;
      this.start = 0;
      this.end = this.start + this.visibleCount;
      this.$refs.virtualList.addEventListener("scroll", (event) =>
        this.scrollEvent(event.target)
      );
    },
    computed: {
      listHeight() {
        return this.listData.length * this.itemSize;
      },
      // 渲染区域元素数量
      visibleCount() {
        return Math.ceil(this.screenHeight / this.itemSize);
      },
      visibleData() {
        return this.listData.slice(this.start, this.end);
      },
    },
    methods: {
      scrollEvent(target) {
        const scrollTop = target.scrollTop;
        this.start = ~~(scrollTop / this.itemSize);
        this.end = this.start + this.visibleCount;
        this.currentOffset = scrollTop - (scrollTop % this.itemSize);
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    position: relative;
    height: 90vh;
    overflow: auto;
  }
  .phantom {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  .content {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    text-align: center;
  }
  .list-item {
    padding: 10px;
    border: 1px solid #999;
  }
  </style>
