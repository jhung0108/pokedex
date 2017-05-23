import React from 'react'
import Relay from 'react-relay'
import classes from './ListPage.css'

class ListPage extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object,
  }
  render () {
    return (
      <div className={classes.root}>
        I am a REACT app!
      </div>
    )
  }
}

export default Relay.createContainer(
  ListPage, {
    
  }
)
