import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import "./index.scss";
import MainPage from './main';
import SettingsPage from './settings';
import HomePage from './home';
// TODO: add permissions to page
// TODO: add popup on page

const App = () => {
  const [activeTab, setActiveTab] = React.useState('main')
  return (
    <div className='rezak-app'>
      <div className="app-header text-center">
        <h2>&lt; REZAK /&gt;</h2>
      </div>
      <div className="app-body">
        <Tabs id="rezak-controlled-tabs" activeKey={activeTab} onSelect={setActiveTab}>
          <Tab eventKey='main' title='Главная' children={<MainPage/>}/>
          <Tab eventKey='settings' title='Настройки' children={<SettingsPage/>}/>
          <Tab eventKey='home' title='О нас' children={<HomePage/>}/>
        </Tabs>
      </div>
    </div>
  )
}
export default App