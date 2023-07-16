<template>
  <div :class="['progress', `${processBgStatus}`]">
    <div class="progress-inner" @click="emptyClick">
      <div :style="progressStyle" class="progress-bg" @click.stop="fullClick"><span v-if="textInside">{{ percent
      }}%</span></div>
    </div>
    <div class="progress-text">
      <span v-if="!textInside">{{ percent }}%</span>
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
    }
  },
  computed: {
    progressStyle() {
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
  display: inline-block;
  width: 100%;
}

.progress-inner {
  display: inline-block;
  width: 90%;
  background-color: #f3f3f3;
  border-radius: 100px;
  vertical-align: middle;
  position: relative;
}
.progress-text{
  display: inline-block;
  width: 10%;
}
.progress-bg {
  border-radius: 100px;
  transition: all .5s linear;
  color: white;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
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
</style>
