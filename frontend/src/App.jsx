import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Createfile from './components/Createfile';
import ShowProfiles from './components/ShowProfiles';
import UpdateProfile from './components/UpdateProfile'; // Import the UpdateProfile component

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Createfile} />
        <Route exact path="/show-profiles" component={ShowProfiles} />
        <Route exact path="/update-profile/:profileId" component={UpdateProfile} />

        {/* <Route exact path="/update-profile/:id" component={UpdateProfile} /> Add this route */}
        {/* Other routes */}
      </Switch>
    </Router>
  );
}

export default App;
