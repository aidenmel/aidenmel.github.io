const cursor = document.querySelector("#header_cursor");
const hoverobject = document.getElementById("#header_hover_object");

document.addEventListener('mousemove', (e) => {
    cursor.style.left = (e.x - 68/2) + 'px';
    cursor.style.top = (e.y - 68/2) + 'px';
});