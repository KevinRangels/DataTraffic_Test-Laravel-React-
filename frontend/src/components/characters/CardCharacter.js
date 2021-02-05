import React from 'react'
import { Link } from 'react-router-dom'
export const CardCharacter = ({
  id,
  name,
  image
}) => {
    return (
      <Link to={`./character/${ id }`} className="characters__card mb-4">
          <div className="characters__img mb-2">
            <img src={image} alt={name} className="img-fluid"/>
          </div>
          <p>{name}</p>
      </Link>
    )
}
