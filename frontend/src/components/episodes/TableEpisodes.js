import React from "react";
import { Link } from 'react-router-dom'
export const TableEpisodes = ({episodes, handleEditEpisode, handleDeleteEpisode}) => {

  return (
    <>
      <div className="table-responsive-md">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">Date Air</th>
              <th scope="col">Episode</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="table__locationBody">
          {
              episodes.map( episode => (
                <tr key={episode.id}>
                  <th scope="row">1</th>
                  <td>{episode.name}</td>
                  <td>{episode.air_date}</td>
                  <td>{episode.episode}</td>
                  <td>
                    <Link className="btn__link mr-2" to={`./episode/${episode.id}`}>
                      View
                    </Link>
                    <button
                      className="btn__link mr-2"
                      onClick={() => handleEditEpisode(episode)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn__link"
                      onClick={() => handleDeleteEpisode(episode.id)}
                    >
                      Delete
                    </button>
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
