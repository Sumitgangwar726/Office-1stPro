import { Button, Stack } from "@shopify/polaris";
import React, { useState } from "react";
import ActionButton from "./ActionButton";
import SegmentedButton from "./SegmentedButton";

const OnSelectFeature = ({ allKeys, selectedRowKeys, setSelectedRowKeys }) => {
  const [buttonSelect, setButtoSelect] = useState(true);

  console.log(allKeys);
  return (
    <Stack alignment="center">
      <Stack.Item>
        <SegmentedButton
          count={selectedRowKeys.length}
          close={setSelectedRowKeys}
        />
      </Stack.Item>
      <Stack.Item spacing="extraTight">
        {buttonSelect ? (
          <Button
            plain
            onClick={() => {
              setSelectedRowKeys([...allKeys]);
              setButtoSelect(false);
            }}
          >
            Select all {allKeys.length} prodcuts
          </Button>
        ) : (
          <>
            All {allKeys.length} products are selected.{" "}
            <Button plain onClick={() => setSelectedRowKeys([])}>
              Undo
            </Button>
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
