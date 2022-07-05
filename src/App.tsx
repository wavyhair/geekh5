/*
 * @Author: chenjie
 * @Date: 2022-07-05 20:28:09
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-05 21:06:56
 * @FilePath: \react-geekh5-ts\src\App.tsx
 * @Description: App
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/Login';
import './App.scss';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact render={()=><Redirect to="/home"></Redirect>}></Route>
          <Route path="/home" component={Layout}></Route>
          <Route path="/login" component={Login}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
