var menuBtn = document.getElementById("menu-btn")
var sideNav = document.getElementById("sideNav")
var menu = document.getElementById("menu")
menuBtn.onclick = function() {
  if (sideNav.style.right == "-250px") {
    sideNav.style.right = "0";
    menu.src = "close.png"
  }
  else {5
    sideNav.style.right = "-250px";
    menu.src = "menu.png"
  }
}
function openImg(element) {
  window.open(element.src);
}
var i = 0;
var t = "Give yourself \n a new Style this year!"

function typing() {
  if (i < t.length) {
    document.getElementById("text").innerHTML += t.charAt(i);
    i++;
    setTimeout(typing, 100);
  }
}
typing();




