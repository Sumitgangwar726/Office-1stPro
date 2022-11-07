import { ActionList, Button, Popover, Tooltip } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import CustomModal from "./CustomModal";

const ActionButton = () => {
  const [popoverActive, setPopoverActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modalProps, setModalProps] = useState({
    name: "",
    content: "",
    buttonName: "",
  });

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    []
  );

  const ModalButtonClick = (btn) => {
    let t = {
        name:btn,
        content:buttonContent[btn],
        buttonName:'Confirm'
    }
    if(btn==='Delete')  t.buttonName = 'Delete'
    console.log(t);
    setModalProps(t)
    setModalActive(true)
  };

  const closeModal = ()=>   setModalActive(false);
  

  const buttonContent = {
    "Upload Product": "Do you want to upload the selected product(s) ?",
    "Sync Product": "Do you want to Sync the selected products with Amazon?",
    "Amazon Lookup":
      "You can choose to run Amazon Lookup for any number of products you want. This will update the status of those products that are currently under “Not Listed: Offer” status.",
    "Sync Inventory":
      "Do you want to Sync the inventory for the selected products with Amazon?",
    "Sync Price":
      "Do you want to Sync the price for the selected products with Amazon?",
    "Sync Image":
      "Do you want to Sync the image for the selected products with Amazon?",
    Delete: "Are you sure you want to delete the selected products?",
  };

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Select Actions
    </Button>
  );

  const ActionListItems = [
    {
      content: 'Sync Inventory',
      onAction:() => ModalButtonClick("Sync Inventory")
    },
    {
      content: "Sync Price",
      onAction:() => ModalButtonClick("Sync Price")
    },
    {
      content: 'Sync Image',
      onAction:() => ModalButtonClick("Sync Image")
    },
  ];
  return (
    <>
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
      >
        <Popover.Pane fixed>
          <Popover.Section>
            <Button
              removeUnderline={true}
              fullWidth
              monochrome
              size="slim"
              plain
              onClick={() => ModalButtonClick("Upload Product")}
            >
              Upload Product
            </Button>
          </Popover.Section>
          <Popover.Section>
            <Tooltip content="This order has shipping labels.">
              <Button
                removeUnderline={true}
                fullWidth
                monochrome
                size="slim"
                plain
                onClick={() => ModalButtonClick("Sync Product")}
              >
                Sync Product
              </Button>
            </Tooltip>
          </Popover.Section>
          <Popover.Section>
            <Tooltip content={<p>Previously Known as 'Search on Amazon'.<br/> This Functionality checks if your Products barcorde are unique and if they are unique or if they are already available on Amazon</p>}>
              <Button
                removeUnderline={true}
                fullWidth
                monochrome
                size="slim"
                plain
                onClick={() => ModalButtonClick("Amazon Lookup")}
              >
                Amazon Lookup
              </Button>
            </Tooltip>
          </Popover.Section>
          <Popover.Section>
            <ActionList actionRole="menuitem" items={[...ActionListItems]} />
          </Popover.Section>
          <Popover.Section>
            <Button
              removeUnderline={true}
              fullWidth
              size="slim"
              plain
              destructive
              onClick={() => ModalButtonClick("Delete")}
            >
              Delete
            </Button>
          </Popover.Section>
        </Popover.Pane>
      </Popover>
      {modalActive && <CustomModal {...modalProps} modalClose={closeModal} />}
    </>
  );
};

export default ActionButton;
