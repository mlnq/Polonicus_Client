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
import ChroniclesDashBoard from './app/features/chronicles/Dashboard/ChroniclesDashboard';
import ChroniclesList from './app/features/chronicles/Dashboard/ChroniclesList';

function App() {
  const location = useLocation();
//const chronicleLocation = useLocation();
  
  return (
    <>
        <NavBar/>
        <Container style={{marginTop: '7em'}}>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/outposts" component={OutpostDashboard}></Route>
          <Route exact path="/outposts/:id" component={OutpostDetails}></Route>
          
          <Route key={location.key} exact path={["/editOutpost/:id","/outpostCreate"]} component={OutpostForm}></Route>
          
          <Route path={"/outposts/:id/chronicle"} component={ChroniclesDashBoard}></Route>
        </Container>
    </>
  );
}

export default observer(App);
