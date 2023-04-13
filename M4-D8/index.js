let token = ""; //per immagazzinare il dato di getToken
let container = document.getElementById("product-list"); //div a cui verrano aggiunte le card
const spinner = document.getElementById("spinner-container");

//sintassi per leggere dati da un'API
const getData = async (authorization) => {
  try {
    const data = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        headers: {
          Authorization: `Bearer ${authorization}`,
          "Content-type": "application/json",
        },
      }
    );
    const response = await data.json(); //dati di tutti i prodotti
    return response;
  } catch (errore) {
    console.log(errore);
  }
};
//funzione per prendere il token
const getToken = async () => {
  //dati del body
  const credential = {
    username: "ildestramandinoli@gmail.com",
    password: "API!2023",
  };
  try {
    const data = await fetch(
      "https://striveschool-api.herokuapp.com/api/account/login",
      {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(credential),
      }
    );
    return await data.json();
  } catch (error) {
    console.log(error);
  }
};

spinner.classList.remove("d-none");
getToken().then((key) => {
  //console.log(key.access_token);
  token = key.access_token; //DOT NOTATION
  //console.log(token);

  getData(token).then((products) => {
    spinner.classList.add("d-none");
    products.forEach((product) => {
      createCard(product);
    });
  });
});

//una funzione che crea la card con i dettagli del prodotto che riceve in formato json
const createCard = (singleProduct) => {
  const div = document.createElement("div");
  div.className = "row";
  div.innerHTML = `<div class="col-sm text-truncate mb-2">
                <a style="color:purple" href="product.html?id=${singleProduct._id}" target="_blank">${singleProduct.name}</a>
                </div>
                <div class="col-sm text-truncate mb-2">
                ${singleProduct.description}
                </div>
                <div class="col-sm text-truncate mb-2">
                ${singleProduct.brand} 
                </div>
                <div class="col-sm text-truncate mb-2">
                ${singleProduct.imageUrl}
                </div>
                <div class="col-sm text-truncate mb-2">
                ${singleProduct.price} 
                </div>`;

  container.appendChild(div);
};
