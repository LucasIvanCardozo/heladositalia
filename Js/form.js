let A = [-57.572019, -38.019065];
let B = [-57.545151, -37.985564];
let C = [-57.520518, -38.016336];
let D = [-57.545012, -38.039945];

let sumAngulos;
const poligono = [A, B, C, D];

function check(poligono, punto) {
  let vector1;
  let vector2;
  const Px = punto[0];
  const Py = punto[1];
  sumAngulos = 0;
  for (let i = 0; i < poligono.length; i++) {
    let Ax = poligono[i][0];
    let Ay = poligono[i][1];
    let Bx;
    let By;
    vector1 = poligono[i];
    i + 1 == poligono.length
      ? ((vector2 = poligono[0]), (Bx = poligono[0][0]), (By = poligono[0][1]))
      : ((vector2 = poligono[i + 1]),
        (Bx = poligono[i + 1][0]),
        (By = poligono[i + 1][1]));
    let M = [Ax - Px, Ay - Py];
    let N = [Bx - Px, By - Py];
    let prodEscalar = M[0] * N[0] + M[1] * N[1];
    let moduloM = Math.sqrt(Math.pow(M[0], 2) + Math.pow(M[1], 2));
    let moduloN = Math.sqrt(Math.pow(N[0], 2) + Math.pow(N[1], 2));
    sumAngulos =
      sumAngulos +
      (Math.acos(prodEscalar / (moduloM * moduloN)) * 180) / Math.PI;
    console.log({
      vuelta: i + 1,
      paresUsados: Ax + ' ' + Ay + ' ' + '/' + Bx + ' ' + By,
      M: M,
      N: N,
      productoEscalarMN: prodEscalar,
      moduloM: moduloM,
      moduloN: moduloN,
      cosAngulo: prodEscalar / (moduloM * moduloN),
      angulo: (Math.acos(prodEscalar / (moduloM * moduloN)) * 180) / Math.PI,
      sumaDeLosAngulos: sumAngulos,
    });
  }
  console.log('Respuesta: ', sumAngulos <= 361 && sumAngulos >= 359);
  return sumAngulos <= 361 && sumAngulos >= 359;
}

function validarDireccion() {
  let geocoder = new google.maps.Geocoder();
  let direccion = direction.value + height.value + ' mar del plata argentina';

  return new Promise((res, rej) => {
    geocoder.geocode(
      {
        address: direccion,
      },
      function (result, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          let latitud = result[0].geometry.location.lat();
          let longitud = result[0].geometry.location.lng();
          console.log(result);
          console.dir(result);
          console.log({
            direccion: direccion,
            latitud: latitud,
            longitud: longitud,
          });
          console.log(result[0].types[0]);
          if (
            result[0].types[0] != 'street_address' &&
            result[0].types[0] != 'premise' &&
            result[0].types[0] != 'subpremise'
          )
            rej('La direccion indicada no existe!');
          else if (check(poligono, [longitud, latitud])) {
            res(true);
          } else rej('No llegamos hasta ese domicilio! Mil disculpas.');
        } else {
          rej('Error al analizar direccion! Por favor, intente de nuevo.');
        }
      }
    );
  });
}

//tomar valores y lso envia al wsp
form.onsubmit = function getData(event) {
  event.preventDefault();
  //verifica que el monto sea superior o igual a el cobro
  if (pay.value < totalPrice + shippingPrice) {
    pay.style = 'border-color: red';
    alert(
      `El monto a pagar debe ser igual o superior a: $${
        totalPrice + shippingPrice
      }`
    );
    setTimeout(() => {
      pay.style = 'border-color: -internal-light-dark(black, white)';
    }, 900);
    return;
  }
  //crea el texto para la orden
  if (house.checked == false) {
    orderComplete = `*Dirección:*\n${direction.value} ${
      height.value
    }\n*Piso:*\n${floor.value}\n*Teléfono:*\n${
      phone.value
    }\n*Pedido:*\n${order}_Costo de envío:_ $${shippingPrice}\n_Cant. Articulos:_ ${
      cartAccountant.textContent
    }\n*Total del pedido:* $${totalPrice + shippingPrice}\n*Abona con:* $${
      pay.value
    }`;
  } else {
    orderComplete = `*Dirección:*\n${direction.value} ${
      height.value
    } (Casa)\n*Teléfono:*\n${
      phone.value
    }\n*Pedido:*\n${order}_Costo de envío:_ $${shippingPrice}\n_Cant. Articulos:_ ${
      cartAccountant.textContent
    }\n*Total del pedido:* $${totalPrice + shippingPrice}\n*Abona con:* $${
      pay.value
    }`;
  }
  validarDireccion()
    .then((e) => {
      orderComplete = encodeURI(orderComplete);
      location.assign(`https://wa.me/+5492235319564?text=${orderComplete}`);
    })
    .catch((error) => {
      alert(error);
    });
};

// let A = [-57.572019, -38.019065];
// let B = [-57.545151, -37.985564];
// let C = [-57.520518, -38.016336];
// let D = [-57.545012, -38.039945];

// let sumAngulos;
// const poligono = [A, B, C, D];
// function check(poligono, punto) {
//   let vector1;
//   let vector2;
//   const Px = punto[0];
//   const Py = punto[1];
//   sumAngulos = 0;
//   for (let i = 0; i < poligono.length; i++) {
//     let Ax = poligono[i][0];
//     let Ay = poligono[i][1];
//     let Bx;
//     let By;
//     vector1 = poligono[i];
//     i + 1 == poligono.length
//       ? ((vector2 = poligono[0]), (Bx = poligono[0][0]), (By = poligono[0][1]))
//       : ((vector2 = poligono[i + 1]),
//         (Bx = poligono[i + 1][0]),
//         (By = poligono[i + 1][1]));
//     let M = [Ax - Px, Ay - Py];
//     let N = [Bx - Px, By - Py];
//     let prodEscalar = M[0] * N[0] + M[1] * N[1];
//     let moduloM = Math.sqrt(Math.pow(M[0], 2) + Math.pow(M[1], 2));
//     let moduloN = Math.sqrt(Math.pow(N[0], 2) + Math.pow(N[1], 2));
//     sumAngulos =
//       sumAngulos +
//       (Math.acos(prodEscalar / (moduloM * moduloN)) * 180) / Math.PI;
//     console.log({
//       vuelta: i + 1,
//       paresUsados: Ax + ' ' + Ay + ' ' + '/' + Bx + ' ' + By,
//       M: M,
//       N: N,
//       productoEscalarMN: prodEscalar,
//       moduloM: moduloM,
//       moduloN: moduloN,
//       cosAngulo: prodEscalar / (moduloM * moduloN),
//       angulo: (Math.acos(prodEscalar / (moduloM * moduloN)) * 180) / Math.PI,
//       sumaDeLosAngulos: sumAngulos,
//     });
//   }
//   console.log('Respuesta: ', sumAngulos <= 361 && sumAngulos >= 359);
//   return sumAngulos <= 361 && sumAngulos >= 359;
// }

// function validarDireccion() {
//   let geocoder = new google.maps.Geocoder();
//   let direccion = direction.value + height.value + ' mar del plata argentina';

//   return new Promise((res, rej) => {
//     geocoder.geocode(
//       {
//         address: direccion,
//       },
//       function (result, status) {
//         if (status == google.maps.GeocoderStatus.OK) {
//           let latitud = result[0].geometry.location.lat();
//           let longitud = result[0].geometry.location.lng();
//           console.log(result);
//           console.dir(result);
//           console.log({
//             direccion: direccion,
//             latitud: latitud,
//             longitud: longitud,
//           });
//           console.log(result[0].types[0]);
//           if (
//             result[0].types[0] != 'street_address' &&
//             result[0].types[0] != 'premise' &&
//             result[0].types[0] != 'subpremise'
//           )
//             rej('La direccion indicada no existe!');
//           else if (check(poligono, [longitud, latitud])) {
//             res(true);
//           } else rej('No llegamos hasta ese domicilio! Mil disculpas.');
//         } else {
//           rej('Ocurrio un error al pedir la información!');
//         }
//       }
//     );
//   });
// }
// //tomar valores y los envia al wsp
// function getData(e) {
//   e.preventDefault();
//   console.log('hola');
//   validarDireccion()
//     .then((e) => console.log(e))
//     .catch((error) => alert(error));
// }
