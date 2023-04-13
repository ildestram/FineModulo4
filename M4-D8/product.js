const params = new URLSearchParams(window.location.search); //per ricavare url
const id = params.get("id");
const container = document.getElementById("container");

const getData = async (authorization) => {
  try {
    const data = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/" + id,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDMwMDdmNDViMjFiZjAwMTQxYzcxZWQiLCJpYXQiOjE2ODEzODM5MTcsImV4cCI6MTY4MjU5MzUxN30.HqxnBD2V7FtNjjI8Jkd_N8xsGy8hqRHQ0TIc4N0sB5Y 
                `,
          "Content-type": "application/json",
        },
      }
    );
    const response = await data.json();
    return response;
  } catch (errore) {
    console.log(errore);
  }
};

const createCard = (singleProduct) => {
  const div = document.createElement("div");
  div.className = "col-4 mx-auto";
  div.innerHTML =
    //`<p>${singleProduct.name}</p>
    //<p>${singleProduct.description} </p>
    //<p>${singleProduct.brand} </p>
    //<p>${singleProduct.imageUrl} </p>
    //<p>${singleProduct.price} </p>`

    `<div class="col-sm text-truncate mb-3 mt-3" style="font-weight: bold">
                NOME: ${singleProduct.name}
                </div>
                <div class="col-sm text-truncate mb-3" style="font-weight: bold">
                DESCRIZIONE: ${singleProduct.description}
                </div>
                <div class="col-sm text-truncate mb-3" style="font-weight: bold">
                BRAND: ${singleProduct.brand} 
                </div>
                <div class="col-sm mb-3" style="font-weight: bold">
                URL DELL'IMMAGINE: ${singleProduct.imageUrl}
                </div>
                <div class="col-sm text-truncate mb-3" style="font-weight: bold">
                PREZZO: ${singleProduct.price} 
                </div>`;

  container.appendChild(div);
};

getData().then((response) => {
  createCard(response);
});

//Nel backoffice, aggiungi la funzionalità per modificare un prodotto e un pulsante per eliminarlo.
