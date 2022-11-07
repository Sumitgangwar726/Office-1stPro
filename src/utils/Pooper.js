import { ActionList, Button , Popover } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { MobileVerticalDotsMajor } from "@shopify/polaris-icons";

const Pooper = ({status}) => {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const notListedAction = [{ content: "Edit Product" }, { content: "Amazon Lookup" }]
  const errorAction = [...notListedAction , {content:'Sync inventory'} , {content:'Sync Price'} , {content:'Sync Image'} , {content:'Sync Product'} , {content : 'Delete Product'}]

  const activator = (
    <Button icon={MobileVerticalDotsMajor}  onClick={togglePopoverActive}>
        
    </Button>
  );

  return (
    <Popover
      preferredPosition={'mostSpace'}
      active={popoverActive}
      activator={activator}
      onClose={togglePopoverActive}
    >
      <ActionList
        actionRole="menuitem"
        items={status === 'Not Listed' ? notListedAction : errorAction}
      />
    </Popover>
  );
};

export default Pooper;
