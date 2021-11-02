import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { useParams } from "react-router";
import {
  Item,
  Segment,
} from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useStore } from "../../../stores/store";
import ChroniclesItem from "./ChroniclesItem";

export default observer(function ChroniclesList() {
  const { chronicleStore } = useStore();
  const { chronicles, deleteChronicle,loadingInitial } = chronicleStore;

  const { chronicleId } = useParams<{ chronicleId: string }>();

  const [target, setTarget] = useState(0);

  function handleChronicleDelete(event: SyntheticEvent<HTMLButtonElement>,id: number) 
  {
    let currentButton = parseInt(event.currentTarget.id);
    setTarget(currentButton);
    deleteChronicle(parseInt(chronicleId), id);
  }




  if (loadingInitial)
    return <LoadingComponent content={"loading Polonicus"} />;
  if (chronicles.length === 0)
    return <div>"placówka nie posiada jeszcze zadnych wpisów"</div>;
  return (
    <Segment>
      <Item.Group divided>
        {chronicles.map((chronicle) => (
          <ChroniclesItem key={chronicle.id} chronicle={chronicle} target={target}
          chronicleDelete={handleChronicleDelete}
          />
        ))}
      </Item.Group>
    </Segment>
  );
});
