import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { constants } from './utils/constants'
import FullPageSpinner from './components/FullPageSpinner'

const Films = React.lazy(() => import(/* webpackPrefetch: true */ './pages/films/Films'))
const Home = React.lazy(() => import('./pages/home/Home'))

function App() {

  return (
    <Router>
        <React.Suspense fallback={<FullPageSpinner />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/film/:filmId' element={<Films />} />
          </Routes>
        </React.Suspense>
    </Router>
  )
}

export default App
