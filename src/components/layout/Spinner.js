import React, { Fragment } from 'react'

import spinner from './spinner.gif'

const Spinner = () => <Fragment><img src={spinner} alt="Loading..." style={spinnerStyle} /></Fragment>;

const spinnerStyle = {
  display: 'block',
  width: '200px',
  margin: 'auto',
}

export default Spinner;
