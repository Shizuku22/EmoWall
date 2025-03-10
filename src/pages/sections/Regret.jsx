import React from 'react'
import './sections.css'

import Header from '../../components/Header'
import Sidebar from '../../components/sidebar'
import MessagesContainer from '../../components/messages-container'

function Regret() {
  return (
    <div>
      <Header />
      <div className="row w-90 mx-auto mt-4">
        <div className="col-lg-3 p-0 m-0">
          <Sidebar />
        </div>

        <div className="col-lg-9 p-0">
          <h1>Regret</h1>

          <div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Regret