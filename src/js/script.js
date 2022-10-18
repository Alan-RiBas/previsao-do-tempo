// import { api } from "./api";
// const api = require('./api');
const api= {
  url: 'https://api.openweathermap.org/data/2.5/',
  key: 'a8d8cd439a45dbdbf2ea1569594eb2aa',
  lang: 'pt_br',
  units: 'metric'
};
const inputSearch = document.querySelector('.input-search');
const btnSearch = document.querySelector('.btn-search');

//campos selecionados para preencher
const city = document.querySelector('.cidade');
const currentDate = document.querySelector('.data-atual');


//funções
const apiJson = (city)=>{
   fetch(`${api.url}weather?q=${city}&lang=${api.lang}&units=${api.units}&appid=${api.key}`)
  .then(response => {
      if(!response.ok){
        throw new Error(`http error: status ${response.status}`)
      }
      return response.json();
   })
   .catch(error =>{alert(error.message)})
  .then(response => displayResults(response));
}


//função para inserir informações em tela
const displayResults = (weather)=>{
  city.innerHTML = `${weather.name}, ${weather.sys.country}`;

  let date = new Date();
  currentDate.innerHTML = date;

  

}

//eventos
btnSearch.addEventListener('click', ()=>{
  const city = inputSearch.value;
  const error = 'cidade inválida';
  if(!city && city == '' && city == Number(city)){
    return alert(error);

  }else{
    apiJson(city);
  }
});

inputSearch.addEventListener('keypress',(e)=>{
  const tecla = e.keyCode;
  const city = inputSearch.value;
  if(tecla === 13){
    apiJson(city);
  }
});

