async function loadNav() {
  try {
    const response = await fetch('/nav.html');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const navContent = await response.text();

    document.body.insertAdjacentHTML('afterbegin', navContent);

    const navElement = document.querySelector('.nav-all');
    if (navElement) {
      navElement.offsetHeight;

      navElement.classList.add('loaded'); 
      document.querySelector('.content').classList.add('nav-loaded');

      navElement.addEventListener('transitionend', () => {
        navElement.classList.add('fixed');
      }, { once: true });
    }
  } catch (error) {
    console.error('Failed to load nav.html:', error);
  }
}

window.addEventListener('DOMContentLoaded', loadNav);

function setTop(navElement) {
  navElement.style.top = window.scrollY;
}