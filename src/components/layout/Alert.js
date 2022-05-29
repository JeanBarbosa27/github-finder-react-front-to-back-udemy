import React from 'react'
import PropTypes from 'prop-types'

const Alert = ({ alert }) => {
  if(alert) {
    return (
      <p className={`alert alert-${alert.type}`}>
        <i className="fas fa-info-circle" /> {alert.message}
      </p>
    )
  }
}

Alert.propTypes = {
  alert: PropTypes.object,
}

export default Alert;
