//variables del DOMhtml
const totalShop = document.querySelector(".shop");
const flavors = document.querySelector(".flavors");
const flavors__container = document.querySelector(".flavors__container");
const body = document.getElementById("body");
const nav = document.querySelector(".nav");
const navBackground = document.querySelector(".nav__background");
const navIconsContainer = document.querySelector(".nav__icons-container");
const main = document.getElementById("main");
const footer = document.getElementById("footer");
const cartIcon = document.querySelector(".nav__cart");
const cartAccountant = document.querySelector(".nav__cart-accountant-text");
const wspContainer = document.querySelector(".send");
const totalWsp = document.querySelector(".send__total-text");
const sendImg = document.querySelector(".send__img-container");
const priceDeliveryText = document.querySelector(".send__priceDelivery-text");
const local = document.querySelector(".local__container");
const charge__background = document.querySelector(".charge__background");
const charge = document.querySelector(".charge");
const chargeImgContainer = document.querySelector(".charge__container");
const navImg = document.querySelector(".nav__img");
const banner = document.querySelector(".banner");
const bannerOpacity = document.querySelector(".banner__opacity");
const clientHeight = document.documentElement.clientHeight;

//variables para animación de menú
const informationContainer = document.querySelector(".information-container");
const navMenuUl = document.querySelector(".nav__menu-ul");
const beginningBoton = document.querySelector(".beginning-boton");
const flavorsBoton = document.querySelector(".flavors-boton");
const localBoton = document.querySelector(".local-boton");
const orderBoton = document.querySelector(".order-boton");
const historyBoton = document.querySelector(".history-boton");
const beginningContainer = document.querySelector(".beginning-container");
const flavorsContainer = document.querySelector(".flavorList-container");
const localContainer = document.querySelector(".localList-container");
const orderContainer = document.querySelector(".order-container");
const historyContainer = document.querySelector(".history-container");

//variables de formulario
const direction = document.getElementById("direction");
const height = document.getElementById("height");
const house = document.getElementById("house");
const department = document.getElementById("department");
const floor = document.getElementById("floor");
const phone = document.getElementById("phone");
const pay = document.getElementById("pay");
const sendForm = document.getElementById("sendForm");
const formContainer = document.querySelector(".form__container");
const form = document.querySelector(".form");
const floorContainer = document.getElementById("floorContainer");
const homeConteniner = document.getElementById("homeContainer");
let valCompleteForm = 0;

//variables del audio
const iconAudio = document.querySelector(".icon-audio");
const iconMuted = document.querySelector(".icon-audio__img-muted");
const iconUnmuted = document.querySelector(".icon-audio__img-unmuted");
const audioDom = document.querySelector(".audio");
let contAudio = 0;

//Variables para el tamaño variable del shop
let valid = 0;
let saveHeight = 0;

//controlador de eventlisteners para que no se agreguen mas de una vez
let listenersControl = true;

//variables del DOMcarrito
const navCartContainer = document.querySelector(".nav__cart-container");
const cartContainer = document.querySelector(".cart__container");
const cart = document.querySelector(".cart");
const cart__ul = document.querySelector(".cart__ul");
const cartTotalSendPriceText = document.querySelector(
  ".cart__total-send-price-text"
);
const cartTotalPriceText = document.querySelector(".cart__total-price-text");
let cartArray = [];
let totalPrice = 0;
let priceDelivery = 0;

//variable del formulario
const sendText = document.querySelector(".send__text");

//variables al elegir variedades o sabores
const flavorButton = document.querySelector(".flavors__button");
let contCkecks = 0;

//variable que lleva el texto del pedido para wsp
let order = "";
let orderComplete = "";

//variable para no abrir dos ventanas a la vez
let windowsOpen = false;

// validacion para no abrir un local de nuevo
let validation = "";

//variables para CreateLocal
let productos = "";

//variables para el createshop
//clon del carrito para eliminar el indicado
let clonCartArray = [];
