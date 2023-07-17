<template>
  <div :class="['progress', `${processBgStatus}`, `${progressVertical}`]">
    <div class="progress-inner" @click="emptyClick">
      <div :style="progressStyle" class="progress-bg" @click.stop="fullClick"><span v-if="textInside">{{ percent
      }}%</span></div>
    </div>
    <div class="progress-text" v-if="!textInside">
      <span v-if="status === 'active'">{{ percent }}%</span>
      <i v-else-if="status === 'wrong'&&percent!==100" class="ivu-icon ivu-icon-ios-close-circle text-red"></i>
      <i v-else class="ivu-icon ivu-icon-ios-checkmark-circle text-green"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Progress',
  props: {
    percent: {
      type: Number,
      default: 0
    },
    strokeWidth: {
      type: Number,
      default: 20
    },
    status: {
      type: String,
      default: ''
    },
    textInside: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    progressStyle() {
      if (this.vertical) {
        return {
          height: this.percent + '%',
          width: this.strokeWidth + 'px'
        }
      }
      return {
        width: this.percent + '%',
        height: this.strokeWidth + 'px'
      }
    },
    processBgStatus() {
      if (this.percent < 100) {
        return `progress-bg-${this.status}`
      } else if (!this.status) {
        return ''
      } else {
        return 'progress-bg-success'
      }
    },
    progressVertical() {
      if (this.vertical) {
        return 'progress-vertical'
      }
      return ''
    }
  },
  methods: {
    fullClick() {
      console.log("full-click")
      this.$emit("full-click")
    },
    emptyClick() {
      console.log("empty-click")
      this.$emit("empty-click")
    }
  }
}
</script>

<style scoped>
.progress {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.progress-vertical {
  width: 10px;
  height: 100%;
  display: inline-block;
}

.progress-vertical .progress-inner::after {
  content: '';
  display: inline-block;
  height: 100%;
}

.progress-vertical .progress-inner {
  width: auto;
  height: 100%;
  vertical-align: bottom;
}

.progress-vertical .progress-bg {
  display: inline-block;
}

.progress-inner {
  display: inline-block;
  width: 90%;
  background-color: #f3f3f3;
  border-radius: 100px;
  position: relative;
}

.progress-text {
  display: inline-block;
  margin-left: 10px;
}

.progress-bg {
  border-radius: 100px;
  transition: all .5s linear;
  color: white;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  width: auto;
  background-color: #2d8cf0;
  position: relative;
}

.progress-bg-active .progress-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
  background: #fff;
  border-radius: 10px;
  animation: progress-active 2s ease-in-out infinite;
}

@keyframes progress-active {
  0% {
    width: 0;
    opacity: 0.2;
  }

  100% {
    opacity: 0;
    width: 100%;
  }
}

.progress-bg-success .progress-bg {
  background-color: #19be6b;
}

.progress-bg-wrong .progress-bg {
  background-color: #ed4014;
}

.text-red {
  color: #ed4014;
}

.text-green {
  color: #19be6b;
}
</style>
