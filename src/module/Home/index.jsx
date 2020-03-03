import React from "react";
import {renderRoutes} from "react-router-config";

function Home(props) {
  const {route} = props;
  return (
    <div>
      <div>Home</div>
      {/*renderRoutes只能渲染一层路由，需要在home中再调用一次*/}
      {renderRoutes(route.routes)}
    </div>
  )
}

export default React.memo(Home);