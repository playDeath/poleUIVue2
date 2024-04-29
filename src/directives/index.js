import Vue from 'vue'
Vue.directive('tooltip',{
    inserted(el){
        const text = el.innerText
        const content = document.createElement('span')
        content.innerText = text
        content.style.whiteSpace = 'nowarp'
        document.body.appendChild(content)
        const textWidth = content.offsetWidth
        const parent = el.parentElement
        const parentWidth = parent.scrollWidth
        if(textWidth > parentWidth){
            parent.style.textOverflow = 'ellipsis'
            parent.style.overflow = 'hidden'
            parent.style.whiteSpace = 'nowrap'
            parent.title = text
        }
        
    }
})