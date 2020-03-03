import React from "react";
import {renderRoutes} from "react-router-config";
import {Top, Tab, TabItem} from "./style";
import {NavLink} from "react-router-dom"; //路由跳转

function Home(props) {
  const {route} = props;
  return (
    <div>
      <Top>
        <span className="iconfont">&#xe676;</span>
        <span className="title">WebApp</span>
        <span className="iconfont">&#xe507;</span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected"><TabItem><span> 推荐 </span></TabItem></NavLink>
        <NavLink to="/singers" activeClassName="selected"><TabItem><span> 歌手 </span></TabItem></NavLink>
        <NavLink to="/rank" activeClassName="selected"><TabItem><span> 排行版 </span></TabItem></NavLink>
      </Tab>
      {/*renderRoutes只能渲染一层路由，需要在home中再调用一次*/}
      {renderRoutes(route.routes)}
    </div>
  )
}

export default React.memo(Home);