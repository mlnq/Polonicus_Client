import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  Button,
  Divider,
  Item,
  ItemExtra,
  Label,
  Segment,
} from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { useStore } from "../../../stores/store";

export default observer(function ChroniclesList() {
  const { chronicleStore } = useStore();
  const { chronicles, deleteChronicle } = chronicleStore;

  const { outpostId } = useParams<{ outpostId: string }>();

  const [target, setTarget] = useState(0);
  function handleChronicleDelete(
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) {
    let currentButton = parseInt(event.currentTarget.id);
    setTarget(currentButton);
    deleteChronicle(parseInt(outpostId), id);
  }

  if (chronicleStore.loadingInitial)
    return <LoadingComponent content={"loading Polonicus"} />;
  if (chronicles.length === 0)
    return <div>"placówka nie posiada jeszcze zadnych wpisów"</div>;
  return (
    <Segment>
      <Item.Group divided>
        {chronicles.map((chronicle) => (
          <Item key={chronicle.id}>
            <Item.Image
              size="tiny"
              src="https://react.semantic-ui.com/images/wireframe/image.png"
            ></Item.Image>

            <Item.Content>
              <Item.Header>{chronicle.name}</Item.Header>
              <Item.Meta>
                <Label className="date">{chronicle.publicationDate}</Label>
                {/* <span className="stay">1 Month</span> */}
              </Item.Meta>
              <Item.Description>
                {chronicle.description.slice(0, 6)}...
              </Item.Description>
            </Item.Content>
            <Item.Extra>
              <Button.Group vertical color="red" floated="right">
                <Button
                  id={chronicle.id}
                  //loading &&
                  loading={target === chronicle.id}
                  onClick={(event) =>
                    handleChronicleDelete(event, chronicle.id)
                  }
                  floated="right"
                  content="Usuń"
                  icon="trash"
                />
                <Button
                  as={Link}
                  to={`/outposts/${chronicle.outpostId}`}
                  floated="right"
                  content="Edycja"
                  color="red"
                  icon="edit"
                />
                <Button
                  as={Link}
                  to={`/outposts/${chronicle.outpostId}/chronicle`}
                  floated="right"
                  content="Wyświetl całość"
                  color="violet"
                  icon="level down alternate"
                />
              </Button.Group>
            </Item.Extra>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
