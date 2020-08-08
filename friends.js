import React from 'react'
import ReactDom from 'react-dom'

class Friends extends React.component {
  render(){
    return(
      <ul>
        {this.props.tweets}
      </ul>


    )
  }
}
ReactDom.render(
  <Friends tweets = {[
    'ajay',
    'adwith',
    'narsa',
    'nayan'

  ]} />,
document.getElementById('app')
);
