import styles from './App.module.css';
import  { useEffect } from 'react';
import {  Container } from 'semantic-ui-react';
import NavBar from './app/layout/NavBar';
import OutpostDashboard from './app/features/outposts/dashboard/OutpostDashboard';
import LoadingComponent from './app/layout/LoadingComponent';
import { useStore } from './app/stores/store';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from './app/features/home/HomePage';
import OutpostForm from './app/features/outposts/form/OutpostForm';
import OutpostDetails from './app/features/outposts/details/OutpostDetails';
import ChroniclesDashBoard from './app/features/chronicles/dashboard/ChroniclesDashboard';
import ChroniclesDetails from './app/features/chronicles/dashboard/ChroniclesDetails';
import ChronicleForm from './app/features/chronicles/dashboard/ChronicleForm';

function App() {
  const location = useLocation();
  
  return (
    <>
        <NavBar/>
        <Container style={{marginTop: '7em'}}>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/outposts" component={OutpostDashboard}></Route>
          <Route exact path="/outposts/:id" component={OutpostDetails}></Route>
          
          <Route key={location.key} exact path={["/editOutpost/:id","/outpostCreate"]} component={OutpostForm}></Route>
          
          <Route exact path={"/outposts/:outpostId/chronicle"} component={ChroniclesDashBoard}></Route>
          <Route exact path={"/outposts/:outpostId/chronicle/:id/details"} component={ChroniclesDetails}></Route>

          <Route key={location.key+'1'} 
          exact path={["/outposts/:outpostId/editChronicle/:id","/outposts/:outpostId/chronicleCreate"]} 
          component={ChronicleForm}></Route>
        </Container>
    </>
  );
}

export default observer(App);
