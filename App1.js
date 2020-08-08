import React from 'react';
import ReactDOM from 'react-dom';
import Adwith from './Adwith';

class App1 extends React.Component{
  render() {
    const name = 'narsa'
   return (
      <div>
       <h1>   {name}</h1>
       <Adwith/>
      </div>

);
}
}

export default App1;
