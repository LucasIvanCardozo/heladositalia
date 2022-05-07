//coloca altura del banner adecuadamente y prepara el audio
audioPrepare();
console.log("se preparo el audio de la pagina");
bannerSolution();
console.log("correccion de banner terminada");

addEventListener("resize", bannerSolution);

function bannerSolution() {
  banner.style.height = `calc(${document.documentElement.clientHeight}px - 60px)`;
}

function audioPrepare() {
  iconAudio.addEventListener("click", () => {
    iconMuted.classList.toggle("icon-audio__img-oculted");
    iconUnmuted.classList.toggle("icon-audio__img-oculted");
    if (contAudio == 0) {
      contAudio += 1;
      audioDom.play();
    } else {
      contAudio -= 1;
      audioDom.pause();
    }
  });
}
//se ejecuta luego de que se cargue la pagina
var getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};
getJSON(
  "https://script.google.com/macros/s/AKfycbyHiimg-ZcKURWe1joMmlKaVpI0KCTL3IZbmBjdSLe0rh9nugDNaNyDdELHwRLxiIUOFA/exec",
  function (err, data) {
    if (err !== null) {
      alert("Error al cargar base de datos: " + err);
    } else {
      productos = data;
      console.log("se obtuvieron todos los datos con exito");
      createPage();
    }
  }
);

function createPage() {
  createLocal();
  console.log("se crearon los locales con exito");
  createForm();
  console.log("se crearon las propiedades del formulario formulario");
}

function createLocal() {
  productos.forEach((element) => {
    let productsList = [];
    let servicesList = {};
    let propertiesList = {};

    let categotyNew = [];
    let categoryTitle = "";
    let amountVariety = "";
    let amountProduct = "";
    let productNew = {};
    let phoneNumber = "";
    let hours = [];
    let wsp = "";
    let rappi = "";
    let pedidosYa = "";
    productsList = element[0];
    servicesList = element[1];
    propertiesList = element[2];

    // Crear nodos para el banner
    const localContainer = document.createElement("div");
    const localImgContainer = document.createElement("div");
    const localImg = document.createElement("img");
    const localTextContainer = document.createElement("div");
    const localTextDirection = document.createElement("h3");
    const localTextLocation = document.createElement("h3");
    const localTextAmount = document.createElement("p");
    const localIconsContainer = document.createElement("div");
    const localIconPhone = document.createElement("img");
    const localIconDelivery = document.createElement("img");
    const localIconWsp = document.createElement("img");
    const localIconRappi = document.createElement("img");
    const localIconPedidosYa = document.createElement("img");

    localContainer.classList.add(`local__banner`, propertiesList.name);
    localImgContainer.classList.add(
      `local__img-container`,
      propertiesList.name
    );
    localImg.classList.add(`local__img`, propertiesList.name);
    localImg.setAttribute("src", propertiesList.image);
    localImg.setAttribute(
      "alt",
      `${propertiesList.direction} - ${propertiesList.location} - ${propertiesList.company}`
    );
    localImg.setAttribute("title", element.direction);
    localTextContainer.classList.add("local__text");
    localTextDirection.classList.add("local__text-direction");
    localTextDirection.textContent = propertiesList.direction;
    localTextLocation.classList.add("local__text-location");
    localTextLocation.textContent = propertiesList.location;
    localTextAmount.classList.add("local__text-amount");

    // cuenta la cantidad de cada producto
    for (let i = 0; i < productsList.length; i++) {
      categotyNew = productsList[i];
      categoryTitle = categotyNew[0];
      count: for (let index = 0; index < categotyNew[1].length; index++) {
        productNew = categotyNew[1][index];
        if (productNew.free) {
          amountProduct = categotyNew[1].length;
          amountVariety = productNew.flavors.length;
          break count;
        } else {
          amountProduct = categotyNew[1].length;
          break count;
        }
      }
      //agregar , o y dependiendo lo que haya en el texto
      if (localTextAmount.textContent != "") {
        if (productsList.length == i + 1) {
          localTextAmount.textContent =
            localTextAmount.textContent.concat(" y ");
        } else {
          localTextAmount.textContent =
            localTextAmount.textContent.concat(", ");
        }
      }
      // agregar texto depoendiendo si tiene que contar las variedades del producto
      if (amountVariety === "") {
        localTextAmount.textContent = localTextAmount.textContent.concat(
          `${amountProduct} ${categoryTitle}`
        );
      } else {
        localTextAmount.textContent = localTextAmount.textContent.concat(
          `${amountProduct} ${categoryTitle} (${amountVariety} gustos)`
        );
      }
      amountVariety = "";
    }
    // crea los iconos dependiendo que servicios tiene el local
    localIconsContainer.classList.add("local__icons-container");
    if (servicesList.phone) {
      phoneNumber = servicesList.phone;
      localIconPhone.setAttribute("src", "Images/Icon/Telefono_icono.svg");
      localIconPhone.setAttribute("title", "Logo de teléfono");
      localIconPhone.setAttribute("alt", "Logo de telefono - SVG");
      localIconPhone.classList.add("local__icon");
      localIconsContainer.appendChild(localIconPhone);
    }
    if (servicesList.delivery) {
      hours = servicesList.delivery.hours;
      localIconDelivery.setAttribute("src", "Images/Icon/Delivery_icono.svg");
      localIconDelivery.setAttribute("title", "Logo de delivery");
      localIconDelivery.setAttribute("alt", "Logo de delivery - SVG");
      localIconDelivery.classList.add("local__icon");
      localIconsContainer.appendChild(localIconDelivery);
    }
    if (servicesList.wsp) {
      wsp = servicesList.wsp;
      localIconWsp.setAttribute("src", "Images/Icon/Whatsapp_icono.svg");
      localIconWsp.setAttribute("title", "Logo de Whats App");
      localIconWsp.setAttribute("alt", "Logo de Whats App - SVG");
      localIconWsp.classList.add("local__icon");
      localIconsContainer.appendChild(localIconWsp);
    }
    if (servicesList.rappi) {
      rappi = servicesList.rappi;
      localIconRappi.setAttribute("src", "Images/Icon/Rappi_icono.svg");
      localIconRappi.setAttribute("title", "Logo de Rappi");
      localIconRappi.setAttribute("alt", "Logo de Rappi - SVG");
      localIconRappi.classList.add("local__icon");
      localIconsContainer.appendChild(localIconRappi);
    }
    if (servicesList.pedidosYa) {
      pedidosYa = servicesList.pedidosYa;
      localIconPedidosYa.setAttribute("src", "Images/Icon/PedidosYa_icono.svg");
      localIconPedidosYa.setAttribute("title", "Logo de Pedidos Ya");
      localIconPedidosYa.setAttribute("alt", "Logo de Pedidos Ya - SVG");
      localIconPedidosYa.classList.add("local__icon");
      localIconsContainer.appendChild(localIconPedidosYa);
    }
    // crea los apartados del local elegido al hacer click
    localContainer.addEventListener("click", (e) => {
      if (validation == "" || validation != propertiesList.name) {
        validation = propertiesList.name;
        emptyShop();
        createTitle(element);
        if (servicesList.wsp) createShop(element);
        if (servicesList.rappi) creatRappi(rappi);
      } else alert("Esta eligiendo el mismo local");
    });

    localImgContainer.appendChild(localImg);
    localTextContainer.appendChild(localTextLocation);
    localTextContainer.appendChild(localTextDirection);
    localTextContainer.appendChild(localTextAmount);
    localContainer.appendChild(localImgContainer);
    localContainer.appendChild(localTextContainer);
    localContainer.appendChild(localIconsContainer);
    local.appendChild(localContainer);
  });
}

//elimina todo el contenido del shop
function emptyShop() {
  while (totalShop.firstChild) {
    totalShop.removeChild(totalShop.firstChild);
  }
}

function createTitle(arrayLocal) {
  let services = arrayLocal[1];
  let properties = arrayLocal[2];
  const nameLocal = document.createElement("h2");
  nameLocal.classList.add("local__name");
  nameLocal.textContent = properties.direction;
  totalShop.appendChild(nameLocal);
}

function creatRappi(link) {
  const rappiContainer = document.createElement("div");
  rappiContainer.classList.add("rappi__container");
  rappiContainer.addEventListener("click", () => {
    location.assign(link);
  });
  const rappiImg = document.createElement("img");
  rappiImg.classList.add("rappi__img");
  rappiImg.setAttribute("src", "Images/Banners/rappiBanner.png");
  rappiImg.setAttribute("loading", "lazy");
  rappiImg.setAttribute("alt", `Banner de Rappi`);
  rappiImg.setAttribute("title", "Banner de Rappi");
  rappiContainer.appendChild(rappiImg);
  totalShop.appendChild(rappiContainer);
}

function createForm() {
  //enviar todos los datos al Wsp
  sendForm.addEventListener("click", getData);
  homeContainer.addEventListener("click", home);
  //cambiar valor de depto o casa en el formulario
  function home(e) {
    if (e.target.value == "house") {
      floorContainer.style = "display: none";
    } else if (e.target.value == "department") {
      floorContainer.style = "display: block";
    }
  }
  //tomar valores y lso envia al wsp
  function getData() {
    // verifica que los campos esten todos completos
    if (direction.value == "") {
      return;
    } else if (height.value == "") {
      return;
    } else if (house.checked == false && department.checked == false) {
      return;
    } else if (floor.value == "" && department.checked == true) {
      return;
    } else if (phone.value == "") {
      return;
    } else if (pay.value == "") {
      return;
    } else if (pay.value < totalPrice + shippingPrice) {
      pay.style = "border-color: red";
      alert(
        `El monto a pagar debe ser igual o superior a: $${
          totalPrice + shippingPrice
        }`
      );
      setTimeout(() => {
        pay.style = "border-color: -internal-light-dark(black, white)";
      }, 900);
      return;
    }
    if (house.checked == false) {
      orderComplete = `Dirección:\n${direction.value} ${height.value}\nPiso:\n${
        floor.value
      }\nTeléfono:\n${
        phone.value
      }\nPedido:\n${order}Costo de envío: $${shippingPrice}\nCant. Articulos:${
        cartAccountant.textContent
      }\nTotal del pedido: $${totalPrice + shippingPrice}\nAbona con: $${
        pay.value
      }`;
    } else {
      orderComplete = `Dirección:\n${direction.value} ${
        height.value
      } (Casa)\nTeléfono:\n${
        phone.value
      }\nPedido:\n${order}Costo de envío: $${shippingPrice}\nCant. Articulos:${
        cartAccountant.textContent
      }\nTotal del pedido: $${totalPrice + shippingPrice}\nAbona con: $${
        pay.value
      }`;
    }

    orderComplete = encodeURI(orderComplete);
    location.assign(`https://wa.me/+5492233513948?text=${orderComplete}`);
  }
}

/*function closeCharge() {
  const coordsNavImg = navImg.getBoundingClientRect();
  chargeImgContainer.style.animationIterationCount = "1";
  const coordsChargeImg = chargeImgContainer.getBoundingClientRect();
  const transX = -(
    coordsChargeImg.left +
    (coordsChargeImg.width - coordsNavImg.width) / 2 -
    coordsNavImg.left
  );
  const transY = -(
    coordsChargeImg.top +
    (coordsChargeImg.height - coordsNavImg.height) / 2 -
    coordsNavImg.top
  );
  chargeImgContainer.style.animationFillMode = "forwards";
  chargeImgContainer.style.animationDuration = "1s";
  chargeImgContainer.style.animationName = "desplazar";
  chargeImgContainer.style.transform = `translate(${transX}px,${transY}px)`;
  setTimeout(function () {
    charge.style.display = `none`;
    charge__background.style.display = `none`;
  }, 1000);
  const transYCharge = -(document.documentElement.clientHeight - 60);
  charge__background.style.transform = `translateY(${transYCharge}px)`;
}*/
