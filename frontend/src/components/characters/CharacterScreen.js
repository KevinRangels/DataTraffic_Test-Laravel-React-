import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../axios';
import requests from '../../requests';
import { Spinner } from '../ui/Spinner';
import './characters.css'

export const CharacterScreen = ({ history }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [character, setCharacter] = useState({});
    const { id } = useParams()
    
    const handleReturn = () =>{
      if (history.length <= 2) {
        history.push('/')
      } else {
        history.goBack()
      }
    }
    
    const endPoint = requests.getCharacter(id)
    useEffect(() => {
        const fetchData =  async () => {
          setIsLoading(true)
          const result = await axios.get(endPoint);
          const { data } = result.data
          setCharacter(data[0])
          setIsLoading(false)
        }
        fetchData()
      }, [endPoint])

      const {name, image, gender, species, status, type, locations} = character
    
    return (
        <div className="app__section">
          { isLoading && (
            <Spinner/>
          )
          }
          <h1 className="mb-4">{name}</h1>
          <div className="character__container">
            <div className="character__img">
              <img src={image} alt={name} className="img-fluid"/>
            </div>
            <div className="character__description">
              <p>Name:  <span>{name}</span></p>
              <p>Gender:  <span>{gender}</span></p>
              <p>Species:  <span>{species}</span></p>
              <p>Status:  <span>{status}</span></p>
              <p>Type:  <span>{type}</span></p>
              <p>Locations:</p>
              {
                locations && locations.map( ({id, name}) => (
                  <span
                    className="character__location"
                    key={id}
                  >
                    - {name}
                  </span>

                )
                )
              }
              <button
                className="btn__main mt-5"
                onClick={handleReturn}
              >
                Back
              </button>
            </div> 
          </div>
        </div>
    )
}
