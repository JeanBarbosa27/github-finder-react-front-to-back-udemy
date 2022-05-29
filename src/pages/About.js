import React, { Fragment } from 'react'
import pack from '../../package.json';

const About = () => {
  return (
    <Fragment>
      <h1>About</h1>
      <p>{pack.description}</p>
      <p>version: <strong>{pack.version}</strong></p>
    </Fragment>
  )
}

export default About
