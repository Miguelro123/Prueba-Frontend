/* 
const API = "https://pokeapi.co/api/v2/pokemon/?offset=00&limit=24";

const getData = (api) => {
    return fetch(api)
    .then((response) => response.json())
    .then((json) => {
        llenarDatos(json), paginacion(json.info);
    })
    .catch((error) => {
        console.log("Error: ", error);
    });
 };

const llenarDatos = (data) => {
    let html = "";
    document.getElementById("datosPersonajes").innerHTML = "";
    data.results.forEach((pj) => {
       const pokeURL = pj.url;
       return fetch(pokeURL)
       .then((response) => response.json())
       .then(json) => {
           tarjetaPokemon(json, html);
        })
        .catch((error) => {
            console.log("Error :", error);
        });
    });
};


const tarjetaPokemon = (data, html) => {
    html += '<div class="col mt-5">';
    html += '<div class= "card" style="width: 10rem;">';
    html += `<img src="${data.sprites.other.dream_world.front_default}" class="card-img-top" alt"...">`
    html += '<div class="card-body">';
    html += `<h5 class="card-title">${data.name}</h5>`;
    html += `<p class="card-text">Altura :${data.height} </p>`;
    html += `<p class="card-text">peso :${data.weight} </p>`;
    html += '</div>';
    html += '</div>';
    html += '</div>';
    document.getElementById("datosPersonajes").innerHTML += html;
};

const paginacion = (info) => {
    let html = "";
    html += `<li class = "page-item ${
        info.previous ? "" : "disabled"
    }"><a class = "page-link" onclick="getData('${
        info.previous
    }')">Previous</a></li>`;
    html += `<li class = "page-item ${
        info.next ? "" : "disabled"
    }"><a class = "page-link" onclick="getData('${info.next}')">Next</a></li>`;
    document.getElementById("datosPersonajes").innerHTML += html;
};

getData(API); */

//URL de la API
const urlAPI = "https://pokeapi.co/api/v2/pokemon/?limit=24";

//Obtener retorno de la API
const getData = (url) => {
        //limpiamos el contenido que haya para que al darle next o back refresque y no se acumule
        let html = "";
        document.getElementById("datosPersonajes").innerHTML = html;
        //Obtengo listado de pokemons y solicito generacion de json
        return fetch(url)
                .then((respuesta) => respuesta.json())
                .then((json) => {
                        //llamo a paginacion y le envio el json para el next y previous
                        paginacion(json);
                        //hago un forEach para recorrer result y sacar la url de cada pokemon
                        //y luego  la manda a  getData2 la url de cada pokemon.
                        json.results.forEach((element) =>
                                getData2(element.url)
                        );
                })
                .catch((error) => {
                        console.log("Error: ", error);
                });
};
//Consulta la sub paguina de cada pokemon
//Lo llaman cada vez que se crea una card pokemon
const getData2 = (url) => {
        return fetch(url)
                .then((respuesta) => respuesta.json())
                .then((json) => {
                        //Entra a cada pokemon y llena la card de cada pokemon
                        llenarDatos(json);
                });
};
//Alt 96 ``
//llenar datos en nuestra pagina
const llenarDatos = (data) => {
        let html = document.getElementById("datosPersonajes").innerHTML;
        html += '<div class="col">';
        html += '<div class="card" style="width: 10rem;">';
        html += `<img src="${data.sprites.other["official-artwork"]["front_default"]}" class="card-img-top" alt="...">`;
        html += '<div class="card-body">';
        html += `<h5 class="card-title">${data.name}</h5>`;
        html += `<p class="card-text">ID :${data.id}</p>`;
        html += `<p class="card-text">Altura :${data.height}</p>`;
        html += "</div>";
        html += "</div>";
        html += "</div>";
        document.getElementById("datosPersonajes").innerHTML = html;
};
//Paginacion
const paginacion = (data) => {
        let prevDisable = "",
                nextDisable = "";
        data.previous == null ? (prevDisable = "disabled") : (prevDisable = "");
        data.next == null ? (nextDisable = "disabled") : (nextDisable = "");

        let html = "";
        html += `<li class="page-item ${prevDisable}"><a class="page-link" onclick="getData('${data.previous}')">Previous</a></li>`;
        html += `<li class="page-item ${nextDisable}"><a class="page-link" onclick="getData('${data.next}')">Next</a></li>`;
        document.getElementById("paginacion").innerHTML = html;
};

//invoco la funcion
getData(urlAPI);