import React from 'react'
import ReactDom from 'react-dom'
class Hello extends React.Component {
  render() {

    return(
      <h1> {this.props.header} {this.props.username}
           {this.props.authed===true
            ? <button onclick= {this.props.logout}>
             logout</button>
             :null}
       </h1>

    )
  }
}
export  default Hello;
