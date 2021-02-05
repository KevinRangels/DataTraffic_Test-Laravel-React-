import React, {useState, useEffect} from 'react'
import { BoxDashboard } from './BoxDashboard';
import axios from '../../axios';
import requests from '../../requests';
import './dashboard.css';
import { Spinner } from '../ui/Spinner';

export const DashboardScreen = () => {

  const [dataBox, setDataBox] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData =  async () => {
    setIsLoading(true)
    const result = await axios.get(requests.dashboard);
    const { data } = result.data
    setDataBox(data)
    setIsLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleGetData = () => {
    setIsLoading(true)
    axios.get(requests.saveLocationsFromApi)
      .then(res => {
        axios.get(requests.saveCharactersFromApi).then(res => {
          setIsLoading(false)
          fetchData()
        })
      })
  }
  const handleClearData = () => {
    setIsLoading(true)
    axios.get(requests.clearDataFromApi)
      .then(res => {
        setIsLoading(false)
        fetchData()
      })
  }
    return (
      <>
        { isLoading && (
          <Spinner/>
        )
        }
        <div className="app__section">
           <h1 className="mb-3">Dashboard</h1> 
           <div className="dashboard__containerBtns mb-2 mb-md-5">
             <button className="mr-3" onClick={handleGetData}>Cargar Datos a DB</button>
             <button onClick={handleClearData}>Limpiar Datos DB</button>
           </div>
           <div className="dashboard__container-box">
              <BoxDashboard
                name={'Characters'}
                dataBox={dataBox.characters}
              />
              <BoxDashboard
                name={'Locations'}
                dataBox={dataBox.locations}
              />
              <BoxDashboard
                name={'Episodes'}
                dataBox={dataBox.episodes}
              />
           </div>
        </div>
      </>
    )
}
