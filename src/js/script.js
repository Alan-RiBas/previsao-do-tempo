import { api } from "./api.js";

const bgImage = "https://source.unsplash.com/1600x900/?";
const inputSearch = document.querySelector('.input-search');
const btnSearch = document.querySelector('.btn-search');

//campos selecionados para preencher
const conteudoBg = document.querySelector('#conteudo');
const city = document.querySelector('.cidade');
const currentDate = document.querySelector('.data-atual');
const tempCurrent = document.querySelector('.temp');
const statusUmidade = document.querySelector('.umidade');
const statusSensacao = document.querySelector('.sensacao');
const statusVento = document.querySelector('.vento');
const conditionTemp = document.querySelector('.condicao-chuva');
const conditionDesc = document.querySelector('.descricao');
const conditionCloud = document.querySelector('.nuvens');
// const iconDesc = document.querySelector('.img-desc');


//funções
const dataFormated = ()=>{
  const data = new Date();
  let dataFormatada = ((data.getDate() )) + "/" + ((data.getMonth() + 1));
  return dataFormatada;
}


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
  currentDate.innerText = dataFormated();
  tempCurrent.innerHTML = `${parseInt(weather.main.temp)}°`
  statusUmidade.innerHTML = `${weather.main.humidity}%`;
  statusSensacao.innerHTML = `${parseInt(weather.main.feels_like)}°`;
  statusVento.innerHTML = `${weather.wind.speed}km/h`;
  conteudoBg.style.backgroundImage = `url("${bgImage + weather.name}")`;

  conditionTemp.innerText = `${weather.weather[0].main}`;
  conditionDesc.innerText = `${weather.weather[0].description}`;
  conditionCloud.innerHTML = `Nuvens ${weather.clouds.all}%`
  // iconDesc.style.backgroundImage = `url(${weather.weather[0].icon})`;
}

const showCityDefault = () =>{
  const city = [
    'Curitiba',
    'São Paulo',
    'Rio de Janeiro',
    'Brasilia'
  ]
  city.forEach(city => {
    apiJson(city);
  });
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

document.body.onload(showCityDefault());