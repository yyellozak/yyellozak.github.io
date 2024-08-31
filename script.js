async function loadNav() {
    try {
      const response = await fetch('/nav.html');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const navContent = await response.text();
  
      document.body.insertAdjacentHTML('afterbegin', navContent);
  
      // Force reflow to ensure the transition class is applied
      const navElement = document.querySelector('.nav-all');
      if (navElement) {
        // Trigger reflow
        navElement.offsetHeight; // Accessing this property forces a reflow
  
        // Add the loaded class
        navElement.classList.add('loaded');
      }
    } catch (error) {
      console.error('Failed to load nav.html:', error);
    }
  }
  
  window.addEventListener('DOMContentLoaded', loadNav);
  