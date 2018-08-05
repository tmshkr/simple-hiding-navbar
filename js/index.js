
//  Acknowledgements
//  https://codyhouse.co/gem/auto-hiding-navigation
//  https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp

var navbar = document.getElementById('navbar');
var visible = true;
var drawerOpen = false;
var scrollBuffer = 10;
var pageTop;
var prevScrollPos = window.pageYOffset;
var mediaMatches;


function autoHideNavbar() {
	var currentScrollPos = window.pageYOffset;
  //scrolling up
	if (!visible && prevScrollPos - currentScrollPos > scrollBuffer) {
		navbar.style.transform = 'translateY(0)';
		visible = true;
	}
  //scrolling down
	else if (visible && currentScrollPos - prevScrollPos > scrollBuffer && currentScrollPos > pageTop) {
		navbar.style.transform = 'translateY(-100%)';
		visible = false;
	}
	prevScrollPos = currentScrollPos;
}

function getPageTop() {
	pageTop = Math.max(document.documentElement.clientHeight * 0.25, window.innerHeight * 0.25) || 100;
}

function mediaMatch() {
  mediaMatches = window.matchMedia('(max-width: 600px)').matches;
}

function openDrawer() {
	navbar.className = 'drawer-open';
  document.documentElement.style.cursor = 'pointer';
	drawerOpen = true;
}

function closeDrawer() {
	navbar.className = 'drawer-closed';
  document.documentElement.style.cursor = null;
	drawerOpen = false;
}

function toggleDrawer() {
	(drawerOpen) ? closeDrawer() : openDrawer();
}

getPageTop();
mediaMatch();

window.onscroll = function() {
	(!window.requestAnimationFrame) ?
	setTimeout(autoHideNavbar, 250) :
	requestAnimationFrame(autoHideNavbar);
}

if (mediaMatches || mediaMatches === undefined){
  navbar.onclick = function(event) {
    toggleDrawer();
    event.cancelBubble = true;
  }
}

document.onclick = closeDrawer;
document.getElementById('navbar-title').onclick = function(event) {
	event.cancelBubble = true; //clicking on #navbar-title does not toggle drawer
}

window.onresize = function() {
  getPageTop();
  mediaMatch();
  if (!mediaMatches) {
    navbar.onclick = null;
    closeDrawer();
  }
  else if (mediaMatches)
    navbar.onclick = function(event) {
      toggleDrawer();
      event.cancelBubble = true;
  }
}