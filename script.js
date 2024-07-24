let mobileMenuOpen = false;

// function for the import property
function importHtml() {
  var z, i, element, file, xhttp;

  z = document.getElementsByTagName("*");

  for (i = 0; i < z.length; i++) {
    element = z[i];
    file = element.getAttribute("import");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            element.innerHTML = this.responseText;
          } else if (this.status === 404) {
            element.innerHTML = "Error 404";
          }
          element.removeAttribute("import");

          var importStartFunction = element.getAttribute("import-start");
          if (importStartFunction && typeof window[importStartFunction] === 'function') {
            window[importStartFunction]();
          }

          importHtml();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
}

function initNav() {
  const navProjectsButton = document.querySelector('.nav-projects-button');
  const navResourcesButton = document.querySelector('.nav-resources-button');
  const navProjects = document.querySelector('.nav-projects');
  const navResources = document.querySelector('.nav-resources');
  const nav = document.querySelector('.nav');

  function show(element) {
    nav.classList.add('showing');
    element.classList.add('showing');
  }

  function hide(element) {
    element.classList.remove('showing');
    nav.classList.remove('showing')
  }

  hide(navProjects);
  hide(navResources);

  navProjectsButton.addEventListener('mouseover', () => {
    hide(navResources);
    show(navProjects);
  });
  navProjects.addEventListener('mouseleave', () => {
    hide(navProjects);
    hide(navResources);
  });
  navResourcesButton.addEventListener('mouseover', () => {
    hide(navProjects);
    show(navResources);
  });
  navResources.addEventListener('mouseleave', () => {
    hide(navProjects);
    hide(navResources);
  });
}

function toggleNavMobileMenu() {
  const navButtons = document.querySelector('.nav-buttons');
  const nav = document.querySelector('.nav');

  if (!mobileMenuOpen) {
    nav.classList.add('mobilemenu-open');
    navButtons.classList.add('mobilemenu-open');
    mobileMenuOpen = true;
  } else {
    nav.classList.remove('mobilemenu-open');
    mobileMenuOpen = false;
    setTimeout(
      () => { navButtons.classList.remove('mobilemenu-open'); },
      300
    );
  }
}
