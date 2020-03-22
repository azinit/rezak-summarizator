import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { Provider } from 'react-redux'
import MainPage from './main';
import SettingsPage from './settings';
import HomePage from './home';
import Footer from './footer';
import { store } from '../store'
import "./index.scss";
// TODO: add permissions to page
// TODO: add popup on page

const App = () => {
  const [activeTab, setActiveTab] = React.useState('main')
  return (
    <Provider store={store}>
      <div className='rezak-app app'>
        <div className="app-header text-center">
          <div className="app-title h2 p-1 bg-primary text-white">
            REZAK
        </div>
        </div>
        <div className="app-content">
          <div className="app-body">
            <Tabs id="rezak-controlled-tabs" activeKey={activeTab} onSelect={setActiveTab}>
              <Tab eventKey='main' title='Главная' children={<MainPage />} />
              <Tab eventKey='settings' title='Настройки' children={<SettingsPage />} />
              <Tab eventKey='home' title='О расширении' children={<HomePage />} />
            </Tabs>
          </div>
          <div className="app-footer bg-white">
            <Footer />
          </div>
        </div>
      </div>
    </Provider>
  )
}
export default App