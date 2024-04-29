<template>
  <!-- <div class="container" ref="tableRef">
    // 占位元素
    <div class="phantom" :style="{ height: listHeight + 'px' }"></div>// 渲染区域
    <div class="content" :style="{ transform: `translate3d(0, ${currentOffset}px, 0)` }">
      <div
        v-for="item in visibleData"
        :key="item.id"
        :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
        class="list-item"
      >{{ item.value }}</div>
    </div>
  </div>-->
  <Table class="container" ref="tableRef" :data="visibleData" :columns="columns" :max-height="518"></Table>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
const data = ref([]);
const tableRef = ref();
const phantomRef = ref();
const contentRef = ref();
const columns = [
  {
    key: "name",
    title: "姓名",
    width: "120"
  },
  {
    key: "age",
    title: "年龄",
    width: "120",
    fixed: "right"
    // className: 'tableSlotRight'
  }
];
for (let i = 1; i <= 1000; i++) {
  data.value.push({ id: i, name: "lzw", age: i });
}
const itemSize = ref(48);
const tableHeight = ref(576);
const currentOffset = ref(0);
const start = ref(0);
const end = ref(0);
const visibleCount = computed(() => {
  return Math.ceil(tableHeight.value / itemSize.value);
});
const listHeight = computed(() => {
  return data.value.length * itemSize.value;
});
const visibleData = computed(() => {
  return data.value.slice(start.value, end.value);
});
watch(
  () => currentOffset,
  val => {
    console.log(val);
    contentRef.value.style.transform = `translate3d(0, ${val}px, 0)`;
  }
);
const scrollEvent = target => {
  const scrollTop = target.scrollTop;
  start.value = ~~(scrollTop / itemSize.value);
  end.value = start.value + visibleCount.value;
  currentOffset.value = scrollTop - (scrollTop % itemSize.value);
  contentRef.value.style.transform = `translate3d(0, ${currentOffset.value}px, 0)`;
};
onMounted(() => {
  const bodyDom = tableRef.value.$el.querySelector(".ivu-table-body");
  console.log(bodyDom)
  contentRef.value = bodyDom.querySelector("table");
  console.log(contentRef.value);
  bodyDom.classList.add("container");
  const div = document.createElement("div");
  div.className = "phantom";
  div.style.height = `${listHeight.value}px`;
  bodyDom.appendChild(div);
  phantomRef.value = div;
  start.value = 0;
  end.value = start.value + visibleCount.value;
  bodyDom.addEventListener("scroll", event => {
    scrollEvent(event.target);
  });
});
</script>

<style scoped>
/deep/ .container {
  position: relative;
  /* height: 90vh; */
  /* overflow: auto; */
}
/deep/ .phantom {
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
