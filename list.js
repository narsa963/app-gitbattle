import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class List extends React.Component{
  render() {
    return(
      <div>
          <img src="{this.props.img}" />
          <h1> Name U {this.props.name} </h1>
          <h2> username: {this.props.username}</h2>
      </div>
    )
  }
}

ReactDOM.render(
  <List
  img='C:\Photos\IMG_1732.JPG'
  name='narsa'
  username='ajay'
  />,
  document.getElementById('app')
)
