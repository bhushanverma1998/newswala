import NavBar from './components/NavBar';
import React, { useState } from 'react'
import News from './components/News';
import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default function App(){
  const pageSize = 15;
  const apiKey= process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)

    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
          />
          <Routes>
            <Route exact path='/general' element={
              <News setProgress={setProgress} key="general" api={apiKey} pageSize={pageSize} country="us" headlines="general" category="general" />} />
            <Route exact path='/business' element={
              <News setProgress={setProgress} key="business" api={apiKey} pageSize={pageSize} country="us" category="business" headlines="business" />} />
            <Route exact path='/entertainment' element={
              <News setProgress={setProgress} key="entertainment" api={apiKey} pageSize={pageSize} country="us" category="entertainment" headlines="entertainment" />} />
            <Route exact path='/health' element={
              <News setProgress={setProgress} key="health" api={apiKey} pageSize={pageSize} country="us" category="health" headlines="health" />} />
            <Route exact path='/science' element={
              <News setProgress={setProgress} key="science" api={apiKey} pageSize={pageSize} country="us" category="science" headlines="science" />} />
            <Route exact path='/sports' element={
              <News setProgress={setProgress} key="sports" api={apiKey} pageSize={pageSize} country="us" category="sports" headlines="sports" />} />
            <Route exact path='/technology' element={
              <News setProgress={setProgress} key="technology" api={apiKey} pageSize={pageSize} country="us" category="technology" headlines="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }

