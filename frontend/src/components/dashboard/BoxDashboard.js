import React from 'react'

export const BoxDashboard = ({name, dataBox}) => {
    return (
        <div className="dashboard__box">
          <span>{dataBox}</span>
          <p>{name}</p>
        </div>
    )
}
