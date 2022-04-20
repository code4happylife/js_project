//待页面加载完成后，再执行js, 就不会报找不到元素的错了
function addBack(color) {
	document.querySelector('.box1').style.background = color
}
window.onload = function() {
	document.querySelector('.box1').innerHTML = '<h1>test for fun<h1>'



}
