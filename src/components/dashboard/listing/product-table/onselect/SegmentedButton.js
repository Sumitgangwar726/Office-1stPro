import { Button, ButtonGroup, Checkbox, Icon } from "@shopify/polaris";
import React from "react";
import { CancelSmallMinor } from "@shopify/polaris-icons";

const SegmentedButton = ({ count, close }) => {
  console.log(count);
  return (
    <ButtonGroup segmented>
      <Button
        size="slim"
        icon={<Checkbox checked={count === 20 ? true : "indeterminate"} />}
        onClick={() => close([])}
      >
        {" "}
        {count} selected{" "}
      </Button>
      <Button icon={CancelSmallMinor} onClick={() => close([])}></Button>
    </ButtonGroup>
  );
};

export default SegmentedButton;
