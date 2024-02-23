import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'

//1. Criar uma função que devolve o nome da disciplina
//2. Criar uma função que devolve o seu nome completo
//3. Na função App, chamar cada uma delas, dentro de um div principal.

const NomeDisciplina = () => {
  return 'Programação para Dispositivos Móveis'
}

function NomeCompleto(nome){
  return nome
}

// function App (){}
const App = () => {
  const estilosDoBotao = {marginTop: 12, paddingTop: 8, paddingBottom: 8, backgroundColor: 'blueviolet', color: 'white', border: 'none', width: '100%', borderRadius: 8}
  const textoDoRotulo = 'Nome:'
  const obterTextoDoBotao = () => {
    return 'Enviar'
  }  
  const fuiClicado = () => {
    alert('Fui clicado')
  }

  return(
    <div style={{margin: 'auto', width: 768, backgroundColor: '#EEE', padding: 8, borderRadius: 8}}>
      <label
        className='rotulo' 
        htmlFor='nome'
        style={{display: 'block', marginBottom: 4}}>
          {textoDoRotulo}
      </label>
      <input 
        type='text' 
        id='nome'
        style={{paddingTop: 8, paddingBottom: 8, borderStyle: 'hidden', width: '100%', borderRadius: 8, outline: 'none'}}/>
      <button 
        style={estilosDoBotao}
        onClick={() => fuiClicado}>
        {obterTextoDoBotao()}
      </button>
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.querySelector('#root')
)



