<template>
    <div class="message">
        <div v-for="item in notices" class="message-content">{{ item.content }}</div>
    </div>
</template>
<script>
let seed = 0
function getUuid() {
    return 'message' + seed++
}
export default {
    name: "message",
    data() {
        return {
            notices: [],
            timeout: 1500
        }
    },
    methods: {
        add(notice) {
            const name = getUuid()
            let _notice = Object.assign({ name }, notice)
            this.notices.push(_notice)
            setTimeout(() => {
                this.remove(name)
            }, this.timeout)
        },
        remove(name) {
            this.notices.forEach((notice, index) => {
                if (notice.name === name) {
                    this.notices.splice(index, 1)
                }
            })
        }
    }
}
</script>
<style scoped>
.message {
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translate(-50%, -50%);
}

.message-content {
    padding: 10px 20px;
    background-color: skyblue;
    box-shadow: 5px 5px 13px 1px gray;
    margin-bottom: 10px;
}
</style>
