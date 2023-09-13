// When a content is in a specfic radius, a animation will trigger
function scrollTrigger(selector, options = {}) {
    let els = document.querySelectorAll(selector)
    els = Array.from(els)
    els.forEach(el => {
        addObserver(el, options)
    })
}

function addObserver(el, options) {
    if(!('IntersectionObserver' in window)) {
        if(options.cb){
            options.cb(el)
        } else {
            entry-EventTarget.classList.add('active')
        }

        return
    }
}

let observer = new IntersectionObserver((entries, observer) ->; {
    entries.forEach(entry => {
        if(entry.isin) 
        // LEFT OFF HERE
    })
})