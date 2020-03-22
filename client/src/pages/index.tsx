import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import SettingsPage from './settings';
import FiltersPage from './filters';
import AboutPage from './about';
import Footer from './footer';
import withStore from '../hocs/withStore'
import "./index.scss";
// TODO: add permissions to page
// TODO: add popup on page

const App = () => {
  const [activeTab, setActiveTab] = React.useState('filters')
  return (
    <div className='rezak-app app'>
      <div className="app-header text-center">
        <div className="app-title h2 p-1 bg-primary text-white">
          REZAK
        </div>
      </div>
      <div className="app-content">
        <div className="app-body">
          <Tabs id="rezak-controlled-tabs" activeKey={activeTab} onSelect={setActiveTab}>
            <Tab eventKey='filters' title='Filters' children={<FiltersPage />} />
            <Tab eventKey='settings' title='Tools' children={<SettingsPage />} />
            <Tab eventKey='about' title='About' children={<AboutPage />} />
          </Tabs>
        </div>
        <div className="app-footer bg-white">
          <Footer />
        </div>
      </div>
    </div>
  )
}
export default withStore(App)