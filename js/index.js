//  Acknowledgements
//  https://codyhouse.co/gem/auto-hiding-navigation
//  https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp

var navbar = document.getElementById('navbar');
var visible = true;
var drawerOpen = false;
var pageTop;
var prevScrollPos = window.pageYOffset;


function autoHideNavbar() {
	let currentScrollPos = window.pageYOffset;
	//scrolling up
	if (!visible && prevScrollPos - currentScrollPos > 40 ||
		!visible && currentScrollPos < pageTop) {
		(!window.requestAnimationFrame) ?
		navbar.style.transform = 'translateY(0)':
			requestAnimationFrame(function() {
				navbar.style.transform = 'translateY(0)';
			});
		visible = true;
	}
	//scrolling down
	else if (visible && currentScrollPos - prevScrollPos > 20 &&
		currentScrollPos > pageTop) {
		(!window.requestAnimationFrame) ?
		navbar.style.transform = 'translateY(-100%)':
			requestAnimationFrame(function() {
				navbar.style.transform = 'translateY(-100%)';
			});
		visible = false;
	}
	prevScrollPos = currentScrollPos;
}

function getPageTop() {
	pageTop = Math.max(document.documentElement.clientHeight * 0.25,
	window.innerHeight * 0.25) || 100;
}

function mediaMatch() {
	return window.matchMedia('(max-width: 600px)').matches;
}

function openDrawer() {
	navbar.className = 'drawer-open';
	document.onclick = closeDrawer;
	document.documentElement.style.cursor = 'pointer';
	drawerOpen = true;
}

function closeDrawer() {
	navbar.className = 'drawer-closed';
	document.onclick = null;
	document.documentElement.style.cursor = null;
	drawerOpen = false;
}

function toggleDrawer() {
	(drawerOpen) ? closeDrawer() : openDrawer();
}

getPageTop();

window.onscroll = autoHideNavbar;

if (mediaMatch()) {
	navbar.onclick = function(event) {
		toggleDrawer();
		event.cancelBubble = true;
	}
}

document.getElementById('navbar-title').onclick = function(event) {
	event.cancelBubble = true; //clicking on #navbar-title does not toggle drawer
}

window.onresize = function() {
	getPageTop();
	if (mediaMatch())
		navbar.onclick = function(event) {
			toggleDrawer();
			event.cancelBubble = true;
		}
	else {
		navbar.onclick = null;
		closeDrawer();
	}
}