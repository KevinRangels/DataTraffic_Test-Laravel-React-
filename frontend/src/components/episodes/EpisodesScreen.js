import React, {useState, useEffect} from 'react'
import axios from '../../axios';
import requests from '../../requests';
import { TableEpisodes } from './TableEpisodes'
import './episodes.css';
import { Spinner } from '../ui/Spinner';
import { ModalAddEpisode } from './ModalAddEpisode';
import { ModalEditEpisode } from './ModalEditEpisode';

export const EpisodesScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [episodes, setEpisodes] = useState([]);
    const [episode, setEpisode] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

    const handleModalAdd = () => {
        setShowModal(true)
    }
    const handleEditEpisode = (data) => {
      const ids = data.characters.map(e => {
        return e.id
      })
      data.charactersSelected = ids
      console.log(data)
      setEpisode(data)
      setShowModalEdit(true)
      console.log(episode)
    }
    const endPoint = requests.getEpisodes;
    const fetchData =  async () => {
      setIsLoading(true)
      const result = await axios.get(endPoint);
      const { data } = result.data
      setEpisodes(data)
      setIsLoading(false)
    }
    useEffect(() => {
      const getData =  async () => {
        setIsLoading(true)
        const result = await axios.get(endPoint);
        const { data } = result.data
        setEpisodes(data)
        setIsLoading(false)
      }
      getData()
    }, [endPoint])

    const handleDeleteEpisode = (id) => {
      console.log('Aqui', id)
      setIsLoading(true)
      const url = requests.deleteEpisode(id)
      axios.delete(url)
        .then(res => {
          console.log(res)
          fetchData()
        })
    }

    return (
        <div className="app__section">
          { isLoading && (
            <Spinner/>
          )
          }
            <h1 className="mb-3">Episodes ({episodes.length})</h1>
            <div className="episode__section">
              <div className="episode__sectionBtn mb-4">
                <button
                  className="btn__main"
                  onClick={handleModalAdd}
                >
                  New Episode
                </button>
              </div>
                <TableEpisodes
                  episodes={episodes}
                  handleEditEpisode={handleEditEpisode}
                  handleDeleteEpisode={handleDeleteEpisode}
                />
            </div>
            <ModalAddEpisode
              show={showModal}
              setShowModal={setShowModal}
              refreshData={fetchData}
            />
            <ModalEditEpisode
              show={showModalEdit}
              episode={episode}
              setShowModal={setShowModalEdit}
              refreshData={fetchData}
            />
        </div>
    )
}
