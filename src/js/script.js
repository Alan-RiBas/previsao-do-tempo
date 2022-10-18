import {api} from './api';

const inputSearch = document.querySelector('#input-search');
const btnSearch = document.querySelector('#btn-search');

//funções
const searchResults = (city)=>{
  // fetch()
  console.log('função dale')
}

//eventos
btnSearch.addEventListener('click', ()=>{
  // const city = inputSearch.value;
  console.log('chegou')
  // if(!city && city == '' && city == Number(city)){
  //   return alert('error');
  // }else{
  //   // searchResults(city);
  //   console.log('chegou')
  // }
});
inputSearch.addEventListener('keypress',(e)=>{
  const tecla = e.keyCode;
  const city = inputSearch.value;
  if(tecla === 13){
    console.log('enter');
  }else{
    console.log('não é o enter');
  }
});