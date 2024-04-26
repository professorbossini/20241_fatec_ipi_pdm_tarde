import React from 'react'
import Imagem from './Imagem'

const ListaImagens = ({photos, imgStyle}) => {
  return (
    photos.map((photo) => (
      <Imagem
        imgStyle={imgStyle} 
        src={photo.src.small}
        id={photo.id}
        alt={photo.alt}/>
    ))
  )
}

export default ListaImagens