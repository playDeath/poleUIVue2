<template>
  <Table
    class="v3-container"
    ref="virtualTableRef"
    :data="visibleData"
    :columns="columns"
    :max-height="518"
  ></Table>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch,
  toRefs,
  reactive,
  defineProps
} from "vue";
import { Checkbox } from "view-ui-plus";
const virtualTableRef = ref();
const tableDoms = ref([]);
const placeHolderDoms = ref([]);
const isAllSelect = ref(false);
const props = defineProps({
  columns: {
    type: Array,
    default() {
      return [];
    }
  },
  data: {
    type: Array,
    default() {
      return [];
    }
  }
});
const rowSize = ref(48);
const tableHeight = ref(576);
const currentOffset = ref(0);
const start = ref(0);
const end = ref(0);
// 实际显示的行数
const visibleCount = computed(() => {
  return Math.ceil(tableHeight.value / rowSize.value);
});
const placeHolderHeight = computed(() => {
  return props.data.length * rowSize.value;
});
const visibleData = computed(() => {
  return props.data.slice(start.value, end.value);
});
const initColumns = () => {
  props.columns.forEach(col => {
    if (col.type === "selection") {
      delete col.type;
      (col.renderHeader = (h, { column }) => {
        // 根据条件判断是否显示全选按钮
        return h(Checkbox, {
          modelValue: isAllSelect.value,
          onClick: (...args) => {
            isAllSelect.value = !isAllSelect.value;
            if (isAllSelect.value) {
              onSelectAll();
            } else {
              onSelectAllCancel();
            }
          }
        });
      }),
        (col.render = (h, { row }) => {
          return h(Checkbox, {
            modelValue: row._checked,
            onClick: (...args) => {
              row._checked = !row._checked;
              if (row._checked) {
                onSelect(row);
              } else {
                onSelectCancel(row);
              }
              checkIsAllSelect();
            }
          });
        });
    }
  });
};
// 获取selection的选项
const getSelection = () => {
  return props.data.filter(row => {
    return row._checked;
  });
};
const checkIsAllSelect = () => {
  isAllSelect.value = getSelection().length === props.data.length;
};
const onSelectAll = () => {
  props.data.forEach(row => {
    row._checked = true;
  });
};
const onSelectAllCancel = (...args) => {
  props.data.forEach(row => {
    row._checked = false;
  });
};
const onSelectCancel = row => {
  props.data[row.rowIndex]._checked = false;
};
const onSelect = row => {
  props.data[row.rowIndex]._checked = true;
};
const scrollEvent = ({ target }) => {
  const scrollTop = target.scrollTop;
  start.value = ~~(scrollTop / rowSize.value);
  end.value = start.value + visibleCount.value;
  currentOffset.value = scrollTop - (scrollTop % rowSize.value);
  setContentRef(currentOffset.value);
};
// 设置表格的y轴的偏移量
const setContentRef = currentOffset => {
  tableDoms.value.forEach(content => {
    content.style.transform = `translate3d(0, ${currentOffset}px, 0)`;
  });
};
// 设置每个占位元素的高度
const setPlaceHolderRef = () => {
  placeHolderDoms.value.forEach(dom => {
    dom.style.height = `${placeHolderHeight.value}px`;
  });
};
const handleTableDom = colDoms => {
  colDoms.forEach(colDom => {
    colDom.classList.add("v3-container");
    const placeHolder = document.createElement("div");
    placeHolder.className = "place-holder";
    placeHolder.style.height = `${placeHolderHeight.value}px`;
    colDom.appendChild(placeHolder);
    placeHolderDoms.value.push(placeHolder);
    tableDoms.value.push(colDom.querySelector("table"));
  });
};
let colDom = null;
onMounted(() => {
  // 获取表格非固定列
  colDom = virtualTableRef.value.$el.querySelector(".ivu-table-body");
  // 获取表格固定列
  const fixColDom = virtualTableRef.value.$el.querySelectorAll(
    ".ivu-table-fixed-body"
  );
  handleTableDom([...fixColDom, colDom]);
  start.value = 0;
  end.value = start.value + visibleCount.value;
  if (colDom) {
    colDom.addEventListener("scroll", scrollEvent);
  }
});
onUnmounted(() => {
  colDom.removeEventListener("scroll", scrollEvent);
  colDom = null;
});
watch(
  () => props.data,
  val => {
    if (val.length) {
      setContentRef(0);
      setPlaceHolderRef();
      colDom.scrollTop = 0
    }
  }
);
initColumns();
defineExpose({
  getSelection
});
</script>

<style scoped>
/deep/ .v3-container {
  position: relative;
  /* height: 90vh; */
  /* overflow: auto; */
}
/deep/ .place-holder {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  pointer-events: none;
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
