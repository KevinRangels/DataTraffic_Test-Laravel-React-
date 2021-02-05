import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../axios';
import requests from '../../requests';
import { CardCharacter } from '../characters/CardCharacter';
import { Spinner } from '../ui/Spinner';
import './locations.css'

export const LocationScreen = ({ history }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState({});
    const { id } = useParams()
    
    const handleReturn = () =>{
      if (history.length <= 2) {
        history.push('/')
      } else {
        history.goBack()
      }
    }
    
    const endPoint = requests.getLocation(id)
    useEffect(() => {
        const fetchData =  async () => {
          setIsLoading(true)
          const result = await axios.get(endPoint);
          const { data } = result.data
          setLocation(data[0])
          setIsLoading(false)
        }
        fetchData()
      }, [endPoint])

      const {name, type, dimension, characters} = location

    return (
        <div className="app__section">
          { isLoading && (
            <Spinner/>
          )
          }
          <h1 className="mb-4">{name}</h1>
          <div className="location__container">
            <div className="location__description w-100">
              <p>Name:  <span>{name}</span></p>
              <p>Type:  <span>{type}</span></p>
              <p>Dimension:  <span>{dimension}</span></p>
              <p>Residents:</p>
              <div className="location__containerCharactes">
                {
                characters && characters.map( character => (
                  <CardCharacter
                    key={character.id}
                    {...character}
                  />
                ))
                }
          </div>
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
