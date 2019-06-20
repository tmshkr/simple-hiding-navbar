//  Acknowledgements
//  https://codyhouse.co/gem/auto-hiding-navigation
//  https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp

const navbar = document.getElementById("navbar");
let navbarVisible = true;
let drawerOpen = false;
let pageTop;
let prevScrollPos = window.pageYOffset;
let media = window.matchMedia("(max-width: 600px)");

function autoHideNavbar() {
  const currentScrollPos = window.pageYOffset;
  if (navbarVisible) {
    // scrolling down
    if (currentScrollPos - prevScrollPos > 10 && currentScrollPos > pageTop) {
      navbar.style.transform = `translateY(-100%)`;
      navbarVisible = false;
    }
  } else {
    // scrolling up
    if (prevScrollPos - currentScrollPos > 20 || currentScrollPos < pageTop) {
      navbar.style.transform = `translateY(0)`;
      navbarVisible = true;
    }
  }

  prevScrollPos = currentScrollPos;
}

function handleResize() {
  pageTop =
    Math.max(
      document.documentElement.clientHeight * 0.25,
      window.innerHeight * 0.25
    ) || 100;
  if (media.matches)
    navbar.onclick = function(e) {
      toggleDrawer();
      e.cancelBubble = true;
    };
  else {
    navbar.onclick = null;
    closeDrawer();
  }
}
handleResize();
window.onresize = handleResize;

function openDrawer() {
  navbar.className = "drawer-open";
  document.onclick = closeDrawer;
  document.documentElement.style.cursor = "pointer";
  drawerOpen = true;
}

function closeDrawer() {
  navbar.className = "drawer-closed";
  document.onclick = null;
  document.documentElement.style.cursor = null;
  drawerOpen = false;
}

function toggleDrawer() {
  drawerOpen ? closeDrawer() : openDrawer();
}

if (window.requestAnimationFrame) {
  window.onscroll = () => {
    requestAnimationFrame(autoHideNavbar);
  };
} else {
  window.onscroll = autoHideNavbar;
}

document.getElementById("navbar-title").onclick = function(e) {
  e.cancelBubble = true; // so that clicking on #navbar-title does not toggle drawer
};
