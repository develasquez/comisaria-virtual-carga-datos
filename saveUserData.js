// Declaramos los selectores CSS por si es que cambian la estructura de la págia solo se cambia aca.
const nombre = "[name='nombres_ciudadano']";
const run = "[name='rut_ciudadano']";
const edad = "[name='edad']";
const region = "[name='comuna[region]']";
const comuna = "[name='comuna[comuna]']";
const domicilio = "[name='domicilio']";
const envioEmail = "#Si";
const email = "[name='correo_electronico']";
const hiddenRegionId = "[name*='cstateCode_']";
const hiddenRegionNombre = "[name*='cstateName_']";
const hiddenComunaId = "[name*='ccityCode_']";
const hiddenComunaNombre = "[name*='ccityName_']";
const labelRegion = "[id*='regiones_'] a span";
const labelComuna = "[id*='comunas_'] a span";

const form = document.querySelector("form");

// Este se encarga de rescatar los datos en el Local Storage del Browser.
// Estos datos son privados y quedan solo en el navegador del usuario
function saveData() {
    localStorage.setItem("datos", JSON.stringify({
        nombre: document.querySelector(nombre).value,
        run: document.querySelector(run).value,
        edad: document.querySelector(edad).value,
        region: document.querySelector(region).value,
        // Al ser Javascript plano lenemos que usar en Index en duro, algun framework ($) y un campo bien referenciables seria mas lindo.
        regionId :document.querySelector(region).selectedOptions[0].attributes["data-id"].value,
        comuna: document.querySelector(comuna).value,
        comunaId: document.querySelector(comuna).selectedOptions[0].attributes["data-id"].value,
        domicilio: document.querySelector(domicilio).value,
        email: document.querySelector(email).value,
    }));
}
function loadData() {
    const datos = JSON.parse(localStorage.getItem("datos"));
    document.querySelector(nombre).value = datos.nombre;
    document.querySelector(run).value = datos.run;
    document.querySelector(edad).value = datos.edad;
    document.querySelector(domicilio).value = datos.domicilio;
    //En mi caso simpre respaldo en el mail, pero esto deberia ser dinamico segun preferencia del usuario.
    document.querySelector(envioEmail).click();
    document.querySelector(email).value = datos.email;

    document.querySelector(region).querySelector(`[value='${datos.region}']`).selected = true;
    setTimeout(() => {
        //Esto lo deben cargar despues del ajax de regiones, un setTimeout es muy flaite XD
        document.querySelector(comuna).querySelector(`[value='${datos.comuna}']`).selected = true;
    },500);

    document.querySelector(hiddenRegionId).value = datos.regionId;
    document.querySelector(hiddenRegionNombre).value = datos.region;
    document.querySelector(hiddenComunaId).value = datos.comunaId;
    document.querySelector(hiddenComunaNombre).value = datos.comuna;
    document.querySelector(labelRegion).innerText = datos.region;
    document.querySelector(labelComuna).innerText = datos.comuna;
    
}

// Pueden elegir un evento mas acorde para esto. 
form.onsubmit = () => {
    try {
        saveData();
    } catch (_ex) {
        // Do Nothing
    }
};

// Pueden elegir un evento mas acorde para esto. 
document.onload = () => {
    try {
        loadData();
    } catch (_ex) {
        // Do Nothing
    }
}
