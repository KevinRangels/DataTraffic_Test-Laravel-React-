import React, { useState, useEffect } from 'react'
import axios from '../../axios';
import requests from '../../requests';
import { CardCharacter } from './CardCharacter'
import { Spinner } from '../ui/Spinner';
import './characters.css'

export const CharactersScreen = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const endPoint = requests.getCharacters;
  
  useEffect(() => {
    const fetchData =  async () => {
      setIsLoading(true)
      const result = await axios.get(endPoint);
      const { data } = result.data
      setCharacters(data)
      setIsLoading(false)
    }
    fetchData()
  }, [endPoint])

    return (
        <div className="app__section">
          { isLoading && (
            <Spinner/>
          )
          }
          <h1>Characters ({characters.length})</h1>
          <div className="characters__section">
          {
                characters.map( character => (
                    <CardCharacter
                        key={character.id}
                        {...character}
                    />
                ))
            }
          </div>
        </div>
    )
}
