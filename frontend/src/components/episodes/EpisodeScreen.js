import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../axios';
import requests from '../../requests';
import { CardCharacter } from '../characters/CardCharacter';
import { Spinner } from '../ui/Spinner';
import './episodes.css'
export const EpisodeScreen = ({ history }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [dataEpisode, setDataEpisode] = useState({});
    const { id } = useParams()
    const endPoint = requests.getEpisode(id)

    useEffect(() => {
      const fetchData =  async () => {
        setIsLoading(true)
        const result = await axios.get(endPoint);
        const { data } = result.data
        setDataEpisode(data[0])
        setIsLoading(false)
      }
      fetchData()
    }, [endPoint])

    const handleReturn = () =>{
        if (history.length <= 2) {
            history.push('/')
        } else {
            history.goBack()
        }
    }

    const {name, air_date, episode, characters} = dataEpisode


    return (
        <div className="app__section">
          { isLoading && (
            <Spinner/>
          )
          }
          <div className="episode__containerInfo">
            <h1 className="mb-4">{name}</h1>
            <p>Air Date: <span>{air_date}</span></p>
            <p>Episode: <span>{episode}</span></p>
            <p>Characters:</p>
          </div>
          <div className="episode__containerCharactes">
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
    )
}
