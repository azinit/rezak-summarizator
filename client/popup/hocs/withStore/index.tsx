import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import PersistStore from '../../../shared/store'
import { Provider } from 'react-redux'

const { store, persistor } = PersistStore()

// ... normal setup, create store and persistor, import components etc.
const withStore = (Component: React.FC) => () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component />
      </PersistGate>
    </Provider>
  )
}

export default withStore;