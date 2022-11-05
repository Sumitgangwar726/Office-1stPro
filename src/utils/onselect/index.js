import { ActionList, Button, Stack } from "@shopify/polaris";
import React, { useState } from "react";
import Pooper from "../Pooper";
import ActionButton from "./ActionButton";
import SegmentedButton from "./SegmentedButton";

const OnSelectFeature = ({count , close}) => {
  const [buttonSelect, setButtoSelect] = useState(true);
  return (
    <Stack alignment='center'>
      <Stack.Item>
        <SegmentedButton count={count} close={close}/>
      </Stack.Item>
      <Stack.Item spacing='extraTight'>
        {buttonSelect ? (
          <Button
            plain
            onClick={() => {
              setButtoSelect(false);
            }}
          >
            Select all {count > 50 ? '50+' : count} prodcuts
          </Button>
        ) : (
          <>
            All {count > 50 ? '50+' : count} products are selected. <Button plain onClick={()=>close()}>Undo</Button>
          </>
        )}
      </Stack.Item>
      <Stack.Item>
        <ActionButton />
      </Stack.Item>
    </Stack>
  );
};

export default OnSelectFeature;
