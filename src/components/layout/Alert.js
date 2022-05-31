import React, { useContext } from 'react'

import AlertContext from '../../contexts/alert/alertContext';

const Alert = () => {
  const { alert } = useContext(AlertContext);
  if(alert) {
    return (
      <p className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle" /> {alert.message}
      </p>
    )
  }
}

export default Alert;
