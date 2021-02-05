import React , { useState, useEffect }  from 'react'
import { TableLocations } from './TableLocations'
import axios from '../../axios';
import requests from '../../requests';
import { Spinner } from '../ui/Spinner';
import './locations.css';
import { Pagination } from '../ui/Pagination';

export const LocationsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const endpoint = requests.getLocations
  useEffect(() => {
    const fetchData =  async () => {
      setIsLoading(true)
      const result = await axios.get(endpoint);
      const { data } = result.data
      setLocations(data)
      setIsLoading(false)
    }
    fetchData()
  }, [endpoint])

  // Get Curren Items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = locations.slice(indexOfFirstItem, indexOfLastItem);

  //Change Page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

    return (
        <div className="app__section">
            { isLoading && (
                <Spinner/>
            )
            }
            <h1 className="mb-3">Locations ({locations.length})</h1>
            <div className="locations__section">
              <TableLocations
                locations={currentItems}
              />
              <div className="location__pagination d-flex justify-content-center">
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={locations.length}
                  paginate={paginate}
                />
              </div>
            </div>
        </div>
    )
}
