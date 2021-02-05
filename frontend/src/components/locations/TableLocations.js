import React from 'react'
import { Link } from 'react-router-dom'
export const TableLocations = ({locations}) => {

  return (
    <>
      <div className="table-responsive-md">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Dimension</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="table__locationBody">
            {
              locations.map( location => (
                <tr key={location.id}>
                  <td>{location.name}</td>
                  <td>{location.type}</td>
                  <td>{location.dimension}</td>
                  <td>
                  <Link
                    to={`./location/${location.id}`}
                    className="btn__link"
                  >
                      View
                  </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
};
