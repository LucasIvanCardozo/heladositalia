function createShop(arrayLocal) {
  let products = arrayLocal[0];
  let services = arrayLocal[1];
  let properties = arrayLocal[2];
  console.log(arrayLocal);
  //crea el div en donde va a ir todos los apartados para el pedido online
  const totalProducts = document.createElement("div");
  totalProducts.classList.add("products");

  //crear titulo del pedido online
  const onlineTitleContainer = document.createElement("div");
  onlineTitleContainer.classList.add("online-title__container");
  const onlineTitleText = document.createElement("h3");
  onlineTitleText.classList.add("online-title__text");
  onlineTitleText.textContent = "Pedido online";
  onlineTitleContainer.appendChild(onlineTitleText);
  totalProducts.appendChild(onlineTitleContainer);
  //coloca el precio del envio del delivery
  priceDelivery = services.delivery.shippingPrice;
  priceDeliveryText.textContent = `+${priceDelivery}`;
  cartTotalSendPriceText.textContent = priceDelivery;

  //crea el carrito y el total
  cartArray = [];
  //carga el carrito con valores actuales
  renderCart();
  totalPrice = 0;
  totalWsp.textContent = totalPrice;
  if (services.delivery) {
    shippingPrice = services.delivery.shippingPrice;
  }

  //ordenar gustos alfabeticamente
  products.forEach((element) =>
    element[1].forEach((e) => {
      if (e.flavors) {
        e.flavors.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      }
    })
  );

  console.log(products);
  //Generador de todas las categorias con sus respectivos productos
  products.forEach((element) => {
    let categoryName = element[0];
    let categoryProducts = element[1];
    //variable con nombre de la categoria
    const categoryNameMinus = categoryName.replace(/\s+/g, "").toLowerCase();

    //creacion de nodos
    const productContainer = document.createElement("div");
    const productTitleContainer = document.createElement("div");
    const productTitle = document.createElement("h2");
    const titleImgContainer = document.createElement("div");
    const titleImg = document.createElement("img");
    const productsItemsContainer = document.createElement("div");

    productContainer.classList.add(`products__container`, categoryNameMinus);
    productTitleContainer.classList.add(
      `products__title-container`,
      categoryNameMinus
    );
    productTitleContainer.addEventListener("click", openProducts);
    productTitle.classList.add(`products__title`, categoryNameMinus);
    productTitle.textContent = categoryName;
    titleImgContainer.classList.add(`products__title-img-container`);
    titleImg.classList.add("products__title-img", categoryNameMinus);
    titleImg.setAttribute("src", "Images/Icon/Arrow_black.svg");
    titleImg.setAttribute("alt", "Flecha hacia abajo .SVG");
    productsItemsContainer.classList.add(
      `products__items-container`,
      categoryNameMinus
    );

    //crea todos los productos de cada categoría
    categoryProducts.forEach((element) => {
      let nameProduct = element.name;
      let selectFreeSubproducts = element.free;
      let priceProduct = element.price;
      let imgProduct = element.img;
      let flavorsProduct = element.flavors;
      let limitSubproducts = element.limit;

      const productItem = document.createElement("div");
      const productItemTextContainer = document.createElement("div");
      const productItemTitle = document.createElement("p");
      const productItemImgContainer = document.createElement("div");
      const productItemImg = document.createElement("img");
      const productItemPriceContainer = document.createElement("div");
      const productItemDescription = document.createElement("p");
      const productItemPrice = document.createElement("p");
      const productItemlimit = document.createElement("p");
      const productItemButton = document.createElement("div");

      productItem.classList.add(`products__items`, categoryNameMinus);
      productItem.setAttribute("data-name", nameProduct);
      productItem.setAttribute("data-price", priceProduct);
      if (element.hasOwnProperty("free")) {
        productItem.setAttribute("data-free", selectFreeSubproducts);
      }
      productItem.setAttribute("data-parent", categoryNameMinus);
      productItemTextContainer.classList.add(`products__items-text`);
      productItemImgContainer.classList.add(`products__items-img-container`);
      productItemTitle.classList.add(
        `products__items-title`,
        categoryNameMinus
      );
      productItemTitle.textContent = nameProduct;
      productItemImg.setAttribute("src", imgProduct);
      productItemImg.setAttribute("loading", "lazy");

      productItemImg.classList.add(`products__img`, categoryNameMinus);
      productItemImg.setAttribute(
        "alt",
        `${categoryNameMinus} - ${nameProduct} - ${properties.company}`
      );
      productItemImg.setAttribute("title", nameProduct);
      productItemPriceContainer.classList.add(`products__price-container`);
      productItemPrice.classList.add(`products__price`, categoryNameMinus);
      productItemPrice.textContent = `$${priceProduct}`;
      productItemButton.classList.add(`products__button`);
      productItemButton.setAttribute("data-name", nameProduct);
      productItemButton.setAttribute("data-price", priceProduct);
      if (element.hasOwnProperty("free")) {
        productItemButton.setAttribute("data-free", selectFreeSubproducts);
      }
      productItemButton.setAttribute("data-parent", categoryNameMinus);
      productItemButton.setAttribute("data-img", imgProduct);

      // se crea este nodo fuera del if porque es usado en las dos condiciones

      if (element.hasOwnProperty("flavors")) {
        //verifica si tiene precios diferentes en sus opciones
        forPrice: for (let i = 0; i < flavorsProduct.length; i++) {
          if (flavorsProduct[i].price) {
            productItemPrice.textContent = `Desde $${priceProduct}`;
            break forPrice;
          }
        }
        productItemButton.addEventListener("click", (e) => {
          let nameProductButton = e.target.dataset.name;
          let selectFreeSubproductsButton = e.target.dataset.free;
          let priceProductButton = e.target.dataset.price;
          let limitSubproductsButton = e.target.dataset.limit;
          let parentProduct = e.target.dataset.parent;
          let imgProduct = e.target.dataset.img;
          contCkecks = 0;

          flavorButton.classList = "flavors__button";
          flavorButton.setAttribute("type", "button");
          flavorButton.setAttribute("value", "Agregar");
          flavorButton.setAttribute("data-name", nameProductButton);
          flavorButton.setAttribute("data-parent", parentProduct);
          flavorButton.setAttribute("data-img", imgProduct);

          if (selectFreeSubproductsButton) {
            flavorButton.setAttribute("data-free", selectFreeSubproductsButton);
            flavorButton.setAttribute("data-price", priceProductButton);
          } else {
            flavorButton.removeAttribute("data-price");
            flavorButton.removeAttribute("data-free");
          }

          navBackground.addEventListener("click", closeFlavors);
          openPage();
          flavors__container.style.transition = "transform 0.4s ease-out";
          flavors__container.style.transform = "translateX(-300px)";
          windowsOpen = true;

          const flavors__ul = document.createElement("ul");
          flavors__ul.classList.add("flavors__ul");

          //limitador de checks con un contador(contCkecks)
          if (e.target.dataset.limit) {
            flavors__ul.addEventListener("change", (e) => {
              if (e.target.checked) {
                if (contCkecks < limitSubproductsButton) {
                  contCkecks = contCkecks + 1;
                } else {
                  e.target.checked = false;
                  alert(`Ya alcanzaste el limite de ${limitSubproductsButton}`);
                }
              } else {
                contCkecks = contCkecks - 1;
              }
            });
          } else {
            flavors__ul.addEventListener("change", (e) => {
              if (e.target.checked) {
                contCkecks = contCkecks + 1;
              } else {
                contCkecks = contCkecks - 1;
              }
            });
          }

          //crea la lista de sabores con sus respectivos check
          flavorsProduct.forEach((element) => {
            let nameFlavor = element.name;
            let flavorDescription = element.description;
            let priceFlavor = element.price;

            const flavor = document.createElement("li");
            const flavorLabel = document.createElement("label");
            const flavorImg = document.createElement("img");
            const flavorText = document.createElement("span");
            const flavorTextTitle = document.createElement("h3");
            const diferentPrice = document.createElement("div");
            const flavorCheck = document.createElement("input");

            flavor.classList.add("flavors__li");
            flavorLabel.classList.add("flavors__label");
            flavorImg.classList.add("flavors__img");
            flavorImg.setAttribute("src", "Images/Flavors/saborHelado.png");
            flavorImg.setAttribute("loading", "lazy");
            flavorImg.setAttribute(
              "alt",
              `${nameFlavor} - ${flavorDescription} - Helados Italia`
            );
            flavorImg.setAttribute("title", nameFlavor);
            flavorTextTitle.classList.add("flavors__text-title");
            flavorTextTitle.textContent = nameFlavor;
            flavorText.classList.add("flavors__text");
            flavorText.appendChild(flavorTextTitle);
            if (flavorDescription) {
              const flavorTextDescription = document.createElement("p");
              flavorTextDescription.classList.add("flavors__text-description");
              flavorTextDescription.textContent = flavorDescription;
              flavorText.appendChild(flavorTextDescription);
            }
            flavorCheck.classList.add("checks");
            flavorCheck.setAttribute("type", "checkbox");
            flavorCheck.setAttribute("value", nameFlavor);
            flavorCheck.setAttribute("data-limit", limitSubproductsButton);
            flavorLabel.appendChild(flavorImg);
            flavorLabel.appendChild(flavorText);

            //si hay variedades que tienen distinto precio se coloca en celda de excel cuanto mas sale el distinto, colocando 0 en el mas barato de todos
            if (!selectFreeSubproductsButton) {
              if (priceFlavor !== undefined) {
                diferentPrice.classList.add("flavors__price");
                const diferentPriceText = document.createElement("p");
                diferentPriceText.classList.add("flavors__priceText");
                diferentPriceText.textContent = `
             $${parseInt(priceFlavor) + parseInt(priceProductButton)}`;
                flavorLabel.appendChild(diferentPriceText);
                flavorCheck.setAttribute(
                  "data-price",
                  parseInt(priceFlavor) + parseInt(priceProductButton)
                );
              } else {
                flavorCheck.setAttribute(
                  "data-price",
                  parseInt(priceProductButton)
                );
              }
            }
            flavorLabel.appendChild(flavorCheck);
            flavor.appendChild(flavorLabel);
            flavors__ul.appendChild(flavor);
            flavorsUlContainer.appendChild(flavors__ul);
          });

          flavors__container.style.display = "flex";
        });
      } else {
        //como no tiene variedad ni sabores para elegir lo agrega directamente
        productItemButton.setAttribute("data-unit", "true");
        productItem.setAttribute("data-unit", "true");
        productItemButton.addEventListener("click", addProductWithoutFlavors);
      }

      productItemTextContainer.appendChild(productItemTitle);
      if (element.hasOwnProperty("description")) {
        productItemDescription.classList.add(
          `products__description`,
          categoryNameMinus
        );
        productItemDescription.textContent = element.description;
        productItemTextContainer.appendChild(productItemDescription);
      }
      if (element.hasOwnProperty("limit")) {
        productItemlimit.classList.add(`products__limit`, categoryNameMinus);
        productItemlimit.textContent = `Límite de ${limitSubproducts} sabores`;
        productItemButton.setAttribute("data-limit", limitSubproducts);
        productItemTextContainer.appendChild(productItemlimit);
      }
      productItemPriceContainer.appendChild(productItemPrice);
      productItemImgContainer.appendChild(productItemImg);
      productItem.appendChild(productItemTextContainer);
      productItem.appendChild(productItemPriceContainer);
      productItem.appendChild(productItemButton);
      productItem.appendChild(productItemImgContainer);
      productsItemsContainer.appendChild(productItem);
    });
    titleImgContainer.appendChild(titleImg);
    productTitleContainer.appendChild(productTitle);
    productTitleContainer.appendChild(titleImgContainer);
    productContainer.appendChild(productTitleContainer);
    productContainer.appendChild(productsItemsContainer);
    //introducir productos dentro del contenedor deseado
    totalProducts.appendChild(productContainer);
    totalShop.appendChild(totalProducts);
    const selectProducts = document.querySelector(
      `.products__items-container.${categoryNameMinus}`
    );
    console.log(selectProducts);

    // abrir productos con transicion
    function openProducts() {
      if (valid == 0) {
        valid = 1;
        saveHeight = parseInt(informationContainer.style.maxHeight, 10);
      }
      if (selectProducts.classList.contains("open")) {
        informationContainer.style.maxHeight = `${
          saveHeight - productsItemsContainer.offsetHeight
        }px`;
        saveHeight = saveHeight - productsItemsContainer.offsetHeight;
        productsItemsContainer.style.transition = "max-height 400ms";
        productsItemsContainer.style.maxHeight = "0px";
        setTimeout(function () {
          if (selectProducts.classList.contains("open") == false) {
            productsItemsContainer.style.visibility = "hidden";
          }
        }, 400);
      } else {
        if ((productsItemsContainer.style.display = `none`)) {
          productsItemsContainer.style.display = `grid`;
        }
        informationContainer.style.maxHeight = `${
          saveHeight + productsItemsContainer.scrollHeight
        }px`;
        saveHeight = saveHeight + productsItemsContainer.scrollHeight;
        productsItemsContainer.style.visibility = "visible";
        productsItemsContainer.style.transition = "max-height 400ms";
        productsItemsContainer.style.maxHeight = `${productsItemsContainer.scrollHeight}px`;
      }
      selectProducts.classList.toggle("open");
      titleImg.classList.toggle("rotate180");
    }
  });

  const mapsContainer = document.createElement("section");
  mapsContainer.classList.add("googleMaps-container");
  const maps = document.createElement("iframe");
  maps.classList.add("googleMaps");
  maps.setAttribute("src", properties.maps);
  maps.setAttribute("loading", "lazy");
  maps.setAttribute("style", "border: 0");
  maps.setAttribute("allowfullscreen", "true");
  mapsContainer.appendChild(maps);
  totalShop.appendChild(mapsContainer);
  if (listenersControl) {
    flavors__container.addEventListener("click", stopPropagation);
    flavorButton.addEventListener("click", addProductWithFlavors);
    cartIcon.addEventListener("click", openCart);
    cart.addEventListener("click", stopPropagation);
    sendText.addEventListener("click", completeForm);
    form.addEventListener("click", stopPropagation);
  }
  listenersControl = false;
}

console.log("shop listo");
