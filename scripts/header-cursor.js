const cursor = document.querySelector("#header_cursor")

window.addEventListener('mousemove', (e) => {
    cursor.style.left = (e.x - 25/2) + 'px'
    cursor.style.top = (e.y - 25/2) + 'px'
})