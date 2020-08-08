import React from 'react'
import ReactDOM from 'react-dom'

class Ajay extends React.Component {
  render() {
    const name = 'Narsa'

   return (
      <React.Fragment>
        <h1> hello,{name} </h1>
        <p> 2 * 2? {2 * 2}</p>
      </React.Fragment>
   );
 }
}
export default Ajay;
