import React from 'react';
import Helmet from "react-helmet"
import Home from "./components/pages/Home";

function App() {
  return (
      <div style={{width:"100%", height:"100%", margin:"0auto"}}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>App</title>
        </Helmet>
        <Home/>
      </div>
  );
}

export default App;
