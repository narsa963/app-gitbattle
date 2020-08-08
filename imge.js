import React from 'react'
import ReactDom from 'react-dom'
import Photo from './photo'

class Imge extends React.Component{
  render() {
    return(
      <div>

        <h1> name {this.props.name}</h1>
         <h2>username {this.props.username}</h2>
     </div>
    )
  }
}
export default Imge;
