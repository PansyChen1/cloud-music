import React from 'react';
import './App.css';
import { GlobalStyle } from './style.js'
import { IconStyle } from "./assets/fonts/iconfont";

function App() {
  return (
    <div className="App">
     <GlobalStyle/>
     <IconStyle />
     <i className="iconfont">&#xe603;</i>
    </div>
  );
}

export default App;
