import React from 'react';
import './App.css';
import {GlobalStyle} from './style.js'
import {IconStyle} from "./assets/fonts/iconfont";
import routes from './routes/index'
import {HashRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";//读取路由配置转化为 Route 标签

function App() {
  return (
    <div className="App">
      <HashRouter>
        <GlobalStyle/>
        <IconStyle/>
        {renderRoutes(routes)}
      </HashRouter>
      {/*<i className="iconfont">&#xe603;</i>*/}
    </div>
  );
}

export default App;
