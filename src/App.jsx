import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhleboList } from "./reedux/actions";

import Main from "./Main"
function App() {

  const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getPhleboList());
    }, []);
  
    
  return (
    <div>
      <Main />
    </div>
  )
}

export default App

