const d = document,
  $selectPrimary = d.getElementById("select-primary"),
  $selectSecundary = d.getElementById("select-secondary");

function loadDepartaments() {
  fetch(" https://www.datos.gov.co/resource/xdk5-pm3f.json?")
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      //console.log(json);
      let departamens = [];
      for (let i = 0; i < json.length; i++) {
        const el = json[i].departamento;
        departamens.push(el);
      }
      let dataDepartamens = new Set(departamens),
        departamentsTotales = [...dataDepartamens];

      $options = `<option value="">Elige un Departamento</option>`;
      departamentsTotales.forEach(
        (el) => ($options += `<option value="${el}">${el}</option>`)
      );
      $selectPrimary.innerHTML = $options;
    })
    .catch((err) => {});
}

function loadCities(city) {
  fetch(`https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${city}`)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      let cities = [];
      for (let i = 0; i < json.length; i++) {
        const el = json[i].municipio;
        cities.push(el);
      }
      $options = `<option value="">Elige una Ciudad</option>`;
      cities.forEach(
        (el) => ($options += `<option value="${el}">${el}</option>`)
      );
      $selectSecundary.innerHTML = $options;
    });
}

d.addEventListener("DOMContentLoaded", (e) => loadDepartaments());

$selectPrimary.addEventListener("change", (e) => loadCities(e.target.value));
