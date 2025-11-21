const navMenu = document.querySelector('.nav__menu-img');
const navUlContainer = document.querySelector('.nav__menu-banner');

navMenu.addEventListener('click', openNavMenu);

function closeNavMenu() {
  windowsOpen = false;
  navMenu.removeEventListener('click', closeNavMenu);
  navMenu.addEventListener('click', openNavMenu);
  navBackground.removeEventListener('click', closeNavMenu);
  if (cartArray.length > 0) {
    wspContainer.style.visibility = 'visible';
    wspContainer.style.opacity = '1';
  }
  closePage();
  navUlContainer.style.transition = 'transform 0.25s ease-in';
  navUlContainer.style.transform = 'translateX(0px)';
}

function openNavMenu() {
  if (windowsOpen) {
    closeCart();
    closeFlavors();
    closeForm();
  }
  navMenu.removeEventListener('click', openNavMenu);
  navMenu.addEventListener('click', closeNavMenu);
  navBackground.addEventListener('click', closeNavMenu);
  wspContainer.style.visibility = 'hidden';
  wspContainer.style.opacity = '0';
  openPage();
  navUlContainer.style.transition = 'transform 0.4s ease-out';
  navUlContainer.style.transform = 'translateX(-204px)';
  windowsOpen = true;
}

/*function closeCharge() {
  body.classList.remove("block-scroll");
  navBackground.style = `transform: translateY(${-(
    document.documentElement.clientHeight - 60
  )}px);`;
  setTimeout(() => {
    navIconsContainer.style.transform = `translateX(0%)`;
  }, 1000);
  navImg.addEventListener("click", function () {
    location.assign("#body");
  });
}*/

function closeCharge() {
  nav.style.maxHeight = `${clientHeight}px`;
  body.classList.remove('block-scroll');
  nav.style.maxHeight = `60px`;
  setTimeout(function () {
    navIconsContainer.style.transform = `translateX(0%)`;
  }, 700);

  navImg.addEventListener('click', function () {
    location.assign('#body');
  });
}

navMenuUl.addEventListener('click', (e) => {
  if (e.target.classList.contains('beginning-button')) {
    alert('Proximamente...');
  } else if (e.target.classList.contains('flavors-button')) {
    alert('Proximamente...');
  } else if (e.target.classList.contains('local-button')) {
    alert('Proximamente...');
  } else if (e.target.classList.contains('order-button')) {
    location.assign('#hr');
    closeNavMenu();
  } else if (e.target.classList.contains('history-button')) {
    alert('Proximamente...');
  }
});
