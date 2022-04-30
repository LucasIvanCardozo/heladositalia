function stopPropagation(e) {
  e.stopPropagation();
}

function openPage() {
  navBackground.style.visibility = "visible";
  main.style.filter = "brightness(.5)";
  footer.style.filter = "brightness(.5)";
  body.classList.add("block-scroll");
}
function closePage() {
  navBackground.style.visibility = "hidden";
  main.style.filter = "brightness(1)";
  footer.style.filter = "brightness(1)";
  body.classList.remove("block-scroll");
}
function closeFlavors() {
  windowsOpen = false;
  navBackground.removeEventListener("click", closeFlavors);
  closePage();
  flavors__container.style.transition = "transform 0.25s ease-in";
  flavors__container.style.transform = "translateX(0px)";
  setTimeout(function () {
    const flavors__ul = document.querySelector(".flavors__ul");
    if (flavors__ul !== null) {
      flavors__container.removeChild(flavors__ul);
    }
  }, 400);
}

//cierra el carrito
function closeCart() {
  windowsOpen = false;
  navBackground.removeEventListener("click", closeCart);
  closePage();
  cart.style.transition = "transform 0.25s ease-in";
  cart.style.transform = "translateX(0px)";
}

//al hacer click en el carrito aparece lo pedido
function openCart() {
  if (windowsOpen) {
    closeForm();
    closeFlavors();
    closeNavMenu();
  }
  navBackground.addEventListener("click", closeCart);
  openPage();
  cart.style.transition = "transform 0.4s ease-out";
  cart.style.transform = "translateX(-300px)";
  windowsOpen = true;
}

//cierra el formulario
function closeForm() {
  windowsOpen = false;
  navBackground.removeEventListener("click", closeForm);

  if (cartArray.length > 0) {
    wspContainer.style.visibility = "visible";
    wspContainer.style.opacity = "1";
  }
  closePage();
  form.style.transition = "transform 0.25s ease-in";
  form.style.transform = "translateX(0px)";
}

function completeForm() {
  if (windowsOpen) {
    closeCart();
    closeFlavors();
    closeNavMenu();
  }
  navBackground.addEventListener("click", closeForm);

  wspContainer.style.visibility = "hidden";
  wspContainer.style.opacity = "0";
  openPage();
  form.style.transition = "transform 0.4s ease-out";
  form.style.transform = "translateX(-300px)";
  windowsOpen = true;
}

//añade un producto con sabores o variedades
function addProductWithFlavors(e) {
  if (contCkecks > 0) {
    let flavorsSelected = [];
    const flavors__check = document.querySelectorAll(".checks");
    if (e.target.dataset.free) {
      for (let i = 0; i < flavors__check.length; i++) {
        let item = flavors__check[i];
        if (item.checked) {
          flavorsSelected.push(item.value);
        }
      }
      cartArray.push([
        `${e.target.getAttribute("data-name")}`,
        `(${flavorsSelected.toString().replace(/,/g, "&")})`,
        e.target.getAttribute("data-price"),
        e.target.getAttribute("data-img"),
      ]);
    } else {
      for (let i = 0; i < flavors__check.length; i++) {
        let item2 = flavors__check[i];
        if (item2.checked) {
          flavorsSelected.push([item2.value, item2.dataset.price]);
        }
      }
      for (let i = 0; i < flavorsSelected.length; i++) {
        const selectedProduct = flavorsSelected[i][0];
        const priceProduct = flavorsSelected[i][1];
        cartArray.push([
          `${e.target.getAttribute("data-name")}`,
          `(${selectedProduct})`,
          priceProduct,
          e.target.getAttribute("data-img"),
        ]);
      }
    }

    body.classList.remove("block-scroll");

    renderCart();
    cartwithoutduplicates = [];
    flavorsSelected = [];
    windowsOpen = false;
    closeFlavors();
  } else {
    console.log("No selecciono ningun gusto");
  }
}

//añade un producto sin sabores ni variedades
function addProductWithoutFlavors(e) {
  cartArray.push([
    e.target.getAttribute("data-name"),
    "",
    e.target.getAttribute("data-price"),
    e.target.getAttribute("data-img"),
  ]);

  renderCart();
  cartwithoutduplicates = [];
}

function renderCart() {
  order = "";
  cart__ul.textContent = "";
  totalCalc();
  //crea array sin duplicados
  let cartwithoutduplicates = [];
  for (let i = 0; i < cartArray.length; i++) {
    const convertString = cartArray[i].toString();
    cartwithoutduplicates.push(convertString);
  }
  cartwithoutduplicates = [...new Set(cartwithoutduplicates)];
  for (let i = 0; i < cartwithoutduplicates.length; i++) {
    cartwithoutduplicates[i] = cartwithoutduplicates[i].split(",");
  }
  cartwithoutduplicates.forEach((item) => {
    const unitNumber = cartArray.reduce((total, itemId) => {
      return itemId[0] == item[0] && itemId[1] == item[1]
        ? (total += 1)
        : total;
    }, 0);
    console.log(item);
    const cartProductLi = document.createElement("li");
    cartProductLi.classList.add("cart__li");
    const cartProductLiImgContainer = document.createElement("div");
    cartProductLiImgContainer.classList.add("cart__li-img-container");
    const cartProductLiImg = document.createElement("img");
    cartProductLiImg.classList.add("cart__li-img");
    cartProductLiImg.setAttribute("src", item[3]);
    cartProductLiImg.setAttribute("alt", `${item[0]} de Helados Italia`);
    const cartProductLiText = document.createElement("p");
    cartProductLiText.classList.add("cart__li-text");
    cartProductLiText.innerHTML = `<b>${unitNumber}</b> x <b>${
      item[0]
    }</b> <i style=" font-size:.9rem">${item[1].replace(/&/g, ",")}</i> - $${
      item[2]
    }`;
    order = `${order}${unitNumber} x ${item[0]} ${item[1]}\nSubtotal:$${item[2]}\n`;
    const miNodoButtonX = document.createElement("input");
    miNodoButtonX.classList.add("cart__li-button");
    miNodoButtonX.setAttribute("type", "button");
    miNodoButtonX.setAttribute("value", "X");
    miNodoButtonX.addEventListener("click", (e) => {
      let validation = item.toString();
      itemEliminated(validation, item);
    });
    cartProductLiImgContainer.appendChild(cartProductLiImg);
    cartProductLi.appendChild(cartProductLiImgContainer);
    cartProductLi.appendChild(cartProductLiText);
    cartProductLi.appendChild(miNodoButtonX);
    cart__ul.appendChild(cartProductLi);
  });
  if (cartArray.length == 0) {
    navCartContainer.style.visibility = "hidden";
    navCartContainer.style.opacity = "0";
    wspContainer.style.visibility = "hidden";
    wspContainer.style.opacity = "0";
    setTimeout(function () {
      cartAccountant.textContent = "";
    }, 200);
  } else {
    cartAccountant.textContent = cartArray.length;
    navCartContainer.style.visibility = "visible";
    navCartContainer.style.opacity = "1";
    if (wspContainer.style.display == "none") {
      wspContainer.style.display = "flex";
      setTimeout(function () {
        wspContainer.style.visibility = "visible";
        wspContainer.style.opacity = "1";
      }, 10);
    } else {
      wspContainer.style.visibility = "visible";
      wspContainer.style.opacity = "1";
    }
  }
}

//elimina el item seleccionado del carrito
function itemEliminated(validation, item) {
  for (let i = 0; i < cartArray.length; i++) {
    const convertString = cartArray[i].toString();
    clonCartArray.push(convertString);
  }
  console.log(clonCartArray);
  console.log(cartArray);
  console.log(clonCartArray.indexOf(validation));
  console.log(validation);
  cartArray.splice(clonCartArray.indexOf(validation), 1);
  clonCartArray = [];
  renderCart();
}

function totalCalc() {
  //actualiza el total
  totalPrice = 0;
  cartArray.forEach((item) => {
    totalPrice = totalPrice + parseInt(item[2], 10);
  });
  if (totalPrice == 0) {
    setTimeout(function () {
      totalWsp.textContent = totalPrice;
      cartTotalPriceText.textContent = totalPrice;
    }, 300);
    closeCart();
  } else {
    totalWsp.textContent = totalPrice;
    cartTotalPriceText.textContent = totalPrice;
  }
}
