import {
  Badge,
  Button,
  Card,
  Icon,
  Modal,
  Stack,
  Tabs,
  TextContainer,
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import { RiskMinor } from "@shopify/polaris-icons";
function ErrorModal({ data, name }) {
  const [active, setActive] = useState(false);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = (
    <Button plain onClick={handleChange}>
      {name ? name : "View Error"}
    </Button>
  );

  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );


  const tabs = [
    {
      id: "Product",
      content: (
        <span>
          Product Error <Badge status="new">{Object.keys(data).length}</Badge>
        </span>
      ),
      accessibilityLabel: "All customers",
      panelID: "product",
    },
    {
      id: "Variant",
      content: (
        <span>
          Variant Error{" "}
          <Badge status="new">{data.variant ? data.variant.length : 0}</Badge>
        </span>
      ),
      panelID: "variant",
    },
  ];

  // console.log(data)

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
        content: 'Fix Error',
        onAction: handleClose,
      }}
    >
      <Modal.Section>
        <TextContainer>
            <Tabs
              tabs={tabs}
              selected={selected}
              onSelect={handleTabChange}
              fitted
            >
              <Card.Section>
                {tabs[selected].panelID ==='product' &&
                  Object.keys(data).map((item) => {
                    return (
                      <>
                      <b>{item.toUpperCase()}</b>
                      <Stack>
                        <span><Icon source={RiskMinor} color="critical" /></span>
                        <span>{data[item]}</span>
                      </Stack>
                      </>
                    );
                  })}
              </Card.Section>
            </Tabs>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );
}

export default ErrorModal;
