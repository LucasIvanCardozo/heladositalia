const navNetworks = document.querySelector('.nav__menu-networks');

navNetworks.addEventListener('click', networksLink);

function networksLink(e) {
  if (e.target.classList.contains('instagramLink'))
    location.assign('https://www.instagram.com/heladositalia/');
  else if (e.target.classList.contains('facebookLink'))
    location.assign('https://es-la.facebook.com/heladositaliamardelplata/');
  else if (e.target.classList.contains('whatsappLink'))
    alert('Todavia sin configurar');
}
