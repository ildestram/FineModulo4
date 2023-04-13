const addProduct = document.getElementById("add"); //bottone del backoffice
const form = document.getElementById("add-product-form");
let container = document.getElementById("product-list");
let token = ""; //per immagazzinare il dato di getToken
let editItem = null;

const addProducts = async () => {
  const myProduct = {
    name: form.elements.name.value,
    description: form.elements.description.value,
    brand: form.elements.brand.value,
    imageUrl: form.elements.imageUrl.value,
    price: parseFloat(form.elements.price.value),
  };
  console.log(myProduct);
  try {
    const data = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDMwMDdmNDViMjFiZjAwMTQxYzcxZWQiLCJpYXQiOjE2ODEzODM5MTcsImV4cCI6MTY4MjU5MzUxN30.HqxnBD2V7FtNjjI8Jkd_N8xsGy8hqRHQ0TIc4N0sB5Y 
                `,
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(myProduct),
      }
    );
    return await data.json(); //aspetta che il server dia una risposta
  } catch (error) {
    console.log(error);
  }
};

const editProduct = async () => {
  const myProduct = {
    name: form.elements.name.value,
    description: form.elements.description.value,
    brand: form.elements.brand.value,
    imageUrl: form.elements.imageUrl.value,
    price: parseFloat(form.elements.price.value),
  };
  console.log(myProduct);
  try {
    const data = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/" + editItem._id,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDMwMDdmNDViMjFiZjAwMTQxYzcxZWQiLCJpYXQiOjE2ODEzODM5MTcsImV4cCI6MTY4MjU5MzUxN30.HqxnBD2V7FtNjjI8Jkd_N8xsGy8hqRHQ0TIc4N0sB5Y 
          `,
          "Content-type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(myProduct),
      }
    );
    return await data.json(); //aspetta che il server dia una risposta
  } catch (error) {
    console.log(error);
  }
};

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

getToken().then((key) => {
  //console.log(key.access_token);
  token = key.access_token; //DOT NOTATION
  //console.log(token);

  getData(token).then((products) => {
    products.forEach((product) => {
      createCard(product);
    });
  });
});

const createCard = (singleProduct) => {
  const row = document.createElement("div");
  row.className = "row";

  /*const colDiv = document.createElement("div");
    colDiv.className = "col-3";*/

  const nameDiv = document.createElement("div");
  nameDiv.innerText = singleProduct.name;
  nameDiv.classList = "col-sm text-truncate";

  const descriptionDiv = document.createElement("div");
  descriptionDiv.innerText = singleProduct.description;
  descriptionDiv.classList = "col-sm text-truncate";

  const brandDiv = document.createElement("div");
  brandDiv.innerText = singleProduct.brand;
  brandDiv.classList = "col-sm text-truncate";

  const imgUrl = document.createElement("div");
  imgUrl.innerText = singleProduct.imageUrl;
  imgUrl.classList = "col-sm text-truncate";

  const priceDiv = document.createElement("div");
  priceDiv.innerText = singleProduct.price;
  priceDiv.classList = "col-sm text-truncate";

  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.classList = "btn btn-outline-light mb-2";

  editButton.addEventListener("click", () => {
    editItem = singleProduct;
    addProduct.innerText = "Edit";
    fillForm(singleProduct);
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList = "btn btn-outline-light mb-2";
  deleteButton.addEventListener("click", async () => {
    await deleteProduct(singleProduct);
    window.location.reload();
  });

  const editDiv = document.createElement("div");
  editDiv.className = "col-sm text-truncate";
  const delDiv = document.createElement("div");
  delDiv.className = "col-sm text-truncate";

  editDiv.appendChild(editButton);
  delDiv.appendChild(deleteButton);

  row.append(
    nameDiv,
    descriptionDiv,
    brandDiv,
    imgUrl,
    priceDiv,
    editDiv,
    delDiv
  );
  //row.appendChild(colDiv);
  container.appendChild(row);
};

const fillForm = async (product) => {
  form.elements.name.value = product.name;
  form.elements.description.value = product.description;
  form.elements.brand.value = product.brand;
  form.elements.imageUrl.value = product.imageUrl;
  form.elements.price.value = product.price;
};

const deleteProduct = async (product) => {
  try {
    await fetch(
      "https://striveschool-api.herokuapp.com/api/product/" + product._id,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDMwMDdmNDViMjFiZjAwMTQxYzcxZWQiLCJpYXQiOjE2ODEzODM5MTcsImV4cCI6MTY4MjU5MzUxN30.HqxnBD2V7FtNjjI8Jkd_N8xsGy8hqRHQ0TIc4N0sB5Y 
          `,
          "Content-type": "application/json",
        },
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((result) => result);
  } catch (error) {
    console.log("ERRORE");
  }
};

addProduct.addEventListener("click", async () => {
  if (formValid()) {
    if (!editItem) {
      await addProducts();
    } else {
      await editProduct();
    }
    window.location.reload();
  }
});

//fare funzione validante dove mettere gli alert
const formValid = () => {
  const errors = [];

  console.log(form.elements);

  if (
    form.elements.name.value.length === 0 ||
    form.elements.description.value.length === 0 ||
    form.elements.brand.value.length === 0 ||
    form.elements.imageUrl.value.length === 0 ||
    form.elements.price.value.length === 0
  ) {
    errors.push("compila il campo nome!");

    const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

    let wrapper = document.createElement("div");

    wrapper.innerHTML = [
      `<div class="mt-3 alert alert-success alert-dismissible" role="alert">`,
      `   <div> Devi compilare tutti i campi! </div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  } //fare per tutti quanti i campi

  if (errors.length === 0) {
    return true;
  } else {
    //creare un alert bootstrap per ogni errore
    //appendo dove voglio mettere gli alert
    //ritorno falso
    console.log(errors);
    return false;
  }
};
