import Vue from 'vue'
import message from './message.vue'
const createsMessageInstance = () => {
    const MessageClass = new Vue({
        render: (h) => {
            return h(message)
        },
    })
    const instance = MessageClass.$mount()
    document.body.appendChild(instance.$el)
    return instance
}
let instance = null
function notice(props){
    instance = instance || createsMessageInstance()
    instance.$children[0].add(props)
}
export default {
    info(props) {
        notice(props)
    }
}