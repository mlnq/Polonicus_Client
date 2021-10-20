import styles from './App.module.css';
import  { useEffect, useState } from 'react';
import { Outpost } from './app/models/outpost';
import { Button, Container } from 'semantic-ui-react';
import NavBar from './app/layout/NavBar';
import OutpostDashboard from './app/features/outposts/dashboard/OutpostDashboard';
import agent from './app/api/agent';
import LoadingComponent from './app/layout/LoadingComponent';
import { useStore } from './app/stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {outpostStore} = useStore();

  const [outposts,setOutposts] = useState<Outpost[]>([]);
  // const [selectedOutpost, setSelectedOutpost] = useState< Outpost | undefined>(undefined);
  // const [editMode, setEditMode] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [submitting,setSubmitting] = useState(false);

  useEffect(()=>{
    outpostStore.loadOutposts();

  },[outpostStore]);

 

  function getTempId(entites: Outpost[])
  {
    return Math.max(...entites.map(e =>e.id))+1;
  }

  // function handleCreateOrEditOutpost(outpost: Outpost)
  // {
  //   setSubmitting(true);
  //   //edit 
  //   if(outpost.id !== 0){
  //     console.log(outpost);
  //     agent.Outposts.update(outpost).then(()=>{
  //       setOutposts([...outposts.filter(
  //         x => x.id !== outpost.id), outpost])

  //       setSelectedOutpost(outpost);
  //       setEditMode(false);

  //       setSubmitting(false);
  //     });
  //   }//create
  //   else{
  //     outpost.id = getTempId(outposts);
  //     agent.Outposts.create(outpost).then(()=>{
  //       setOutposts([...outposts,outpost])
  //       setSelectedOutpost(outpost);
  //       setEditMode(false);
  //       setSubmitting(false);
  //       //jeszcze raz zaciągam dane aby id się zgadzał
  //       agent.Outposts.list().then(response => {
  //         setOutposts(response);
  //         setLoading(false);
  //       })
  //     })
  //   }
  // }

  function handleDeleteActivity(id: number)
  {
    setSubmitting(true);
    //then po to z linijką do statycznego pliku z outpostami aby 
    //wykonywało się asychronicznie z kolejnością czyli dopiero po usunięciu dajemy filter
    agent.Outposts.delete(id).then(()=>{
      setOutposts([...outposts.filter(o=>o.id !== id )]);
      setSubmitting(false);
    });
  }

  if(outpostStore.loadingInitial) return <LoadingComponent content={"loading Polonicus"}/> 
  return (
    <>
        <NavBar/>
        <Container style={{marginTop: '7em'}}>
        <OutpostDashboard 
            outposts={outpostStore.outposts}
            // createOrEdit={handleCreateOrEditOutpost}
            deleteOutpost={handleDeleteActivity}
            submitting={submitting}
            />
        
        </Container>
    </>
  );
}

export default observer(App);
