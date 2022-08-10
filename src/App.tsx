/*
 * @Author: chenjie
 * @Date: 2022-07-05 20:28:09
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-10 17:33:41
 * @FilePath: \react-geekh5-ts\src\App.tsx
 * @Description: App
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */

import { unstable_HistoryRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from '@/pages/Layout';
import Login from './pages/Login';
import customHistory from '@/utils/history'
import './App.scss';
import Home from './pages/Home';
import Question from './pages/Question';
import Video from './pages/Video';
import Profile from './pages/Profile';
import ProfileEdit from '@/pages/Profile/Edit'
import AuthRoute from './components/AuthRoute';
import Article from './pages/Article';
import SearchPage from './pages/Search';
import Result from '@/pages/Search/Result';
function App() {
  return (
    <div className="App">
      <Router history={customHistory}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Layout />} >
            <Route path='/home/index' element={<Home />} />
            <Route path='/home/question' element={<Question />} />
            <Route path='/home/video' element={<Video />} />
            <Route path='/home/Profile' element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/Article/:artId" element={<Article />} />
          <Route path="/profile/edit" element={<AuthRoute element={<ProfileEdit />}></AuthRoute>} />
          <Route path='/search' element={<SearchPage />}>
            <Route path='/search/result' element={<Result />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
