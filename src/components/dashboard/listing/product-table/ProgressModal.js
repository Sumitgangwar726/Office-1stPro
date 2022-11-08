import { Button, Icon, Modal, Stack, TextContainer } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { ClockMajor } from "@shopify/polaris-icons";
import {
    ReportMinor
  } from '@shopify/polaris-icons';

function ProgressModal({ data, name }) {
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = (
    <Button monochrome icon={ClockMajor} plain onClick={handleChange}>
      {name ? name : "View Error"}
    </Button>
  );

  const handleClose = ()=>{
    console.log('clicked')
  }

  return (
    <Modal
      activator={activator}
      open={active}
      onClose={handleChange}
      title={name ? name : "Error"}
      primaryAction={{
        content: 'Refresh to update status',
        onAction: handleClose,
      }}
      secondaryActions={[
        {
          content: 'Close',
          onAction: handleClose,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>
            {
                data.map((item)=>{
                    return <Stack>
                        <Icon source={ReportMinor} />
                        <span>{item}</span>
                    </Stack>
                })
            }
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
}

export default ProgressModal;
