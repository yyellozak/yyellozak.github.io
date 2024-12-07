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
      if (!document.querySelector('.no-navbar-modal')) {
        navElement.offsetHeight;
        navElement.classList.add('loaded');
      } else {
        navElement.style.display = 'none';
      }
      document.querySelector('.content').classList.add('nav-loaded');

      navElement.addEventListener('transitionend', () => {
        navElement.classList.add('fixed');
      }, { once: true });
    }

    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const navbar = document.querySelector('.nav');

      if (currentScroll > lastScrollTop) {
        if (navbar) navbar.classList.add('shrink');
      } else {
        if (navbar) navbar.classList.remove('shrink');
      }
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

  } catch (error) {
    console.error('Failed to load nav.html:', error);
  }
}

window.addEventListener('DOMContentLoaded', loadNav);
