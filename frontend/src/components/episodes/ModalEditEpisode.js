import React, {useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import axios from '../../axios';
import requests from '../../requests';
import "bootstrap/dist/css/bootstrap.min.css";

export const ModalEditEpisode = ({show, setShowModal, refreshData, episode}) => {

    const [characters, setCharacters] = useState([]);
    const [validations, setValidations] = useState(null);
    const [params, setParams] = useState({
        id: null,
        name: '',
        air_date: '',
        episode: '',
        characters: []
    });

    const hideModal = () => {
        setShowModal(false);
    };

    const endPoint = requests.getCharacters;
    useEffect(() => {
      const fetchData =  async () => {
        const result = await axios.get(endPoint);
        const { data } = result.data
        setCharacters(data)
        selectedCharacters()
      }
      if (show) {
        fetchData()
      }
    }, [show, endPoint])

    useEffect(() => {
        setParams({
            id: episode.id,
            name: episode.name,
            air_date: episode.air_date,
            episode: episode.episode,
            characters: episode.charactersSelected
        })
      }, [episode])


    const handleInputChange = event => {
      const { name, value } = event.target;
      setParams({ ...params, [name]: value });
    };
    const handleChecboxChange = (event) => {
      if (event.target.checked) {
        if (!params.characters.includes(event.target.value)) {
          setParams(prevState => ({...params, characters: [...prevState.characters, event.target.value]}))
        }
      } else {
        setParams(prevState => ({...params, characters: prevState.characters.filter(day => day !== event.target.value) }));
      }
    }

    const selectedCharacters = () => {
        episode.charactersSelected.forEach(element => {
            document.getElementById(`charachter${element}`).checked = true;
        });
    }

    const isFormValid = () => {
      if (params.name.trim().length === 0) {
        setValidations('Name required')
        return false
      } else if ( params.air_date.trim().length === 0) {
        setValidations('Air date required')
        return false
      } else if (params.episode.trim().length === 0) {
        setValidations('Episode required')
        return false
      } else if (params.characters.length === 0) {
        setValidations('Select a character required')
        return false
      }
      setValidations(null)
      return true
    }

    const handleForm = (e) => {
      e.preventDefault()
      const {id, name, air_date, episode, characters} = params
      const request = {
        name: name,
        air_date: air_date,
        episode: episode,
        characters: characters.toString()
      }
      console.log(request)
      if ( isFormValid() ) {
        const url = requests.editEpisode(id)
        axios.post(url, request)
          .then(res => {
            console.log(res)
            hideModal()
            refreshData()
          })
      }
    }
    

  return (
    <>
      <Modal show={show} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Edit Episode</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleForm}>
          <div className="form-group">
            <label forhtml="recipient-name" className="col-form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="recipient-name"
              value={params.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
          <div className="form-group">
            <label forhtml="recipient-name" className="col-form-label">Air Date</label>
            <input
              type="text"
              className="form-control"
              id="recipient-name"
              value={params.air_date}
              onChange={handleInputChange}
              name="air_date"
            />
          </div>
          <div className="form-group">
            <label forhtml="recipient-name" className="col-form-label">Episode</label>
            <input
              type="text"
              className="form-control"
              id="recipient-name"
              value={params.episode}
              onChange={handleInputChange}
              name="episode"
            />
          </div>
          <span className="mb-2">Selcciona los personajes</span>
          <div className="modalAdd__containerCharacters">
          {
            characters.map( character => (
              <div className="modalAdd__containerCheckbox" key={character.id}>
                <div className="form-check w-100">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={character.id}
                    onClick={handleChecboxChange}
                    id={`charachter${character.id}`}
                    name="characters"
                    />
                  <label className="form-check-label" forhtml="defaultCheck1">
                      {character.name}
                  </label>
                </div>
              </div>
            ))
          }
          </div>
          <div className="d-flex justify-content-end mt-3">
            <div className="addEpisode__validation mr-auto">
              {
                validations && (
                  <span>{validations}</span>
                )
              }
              </div>
              <button
                className="btn__main"
                type="submit"
              >
                  Edit
              </button>
          </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
