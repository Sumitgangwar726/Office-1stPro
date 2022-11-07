import {Button, Modal, Stack, DropZone, Checkbox, Heading, Link} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import Bannner from './Bannner';

function ImportMOdal({open,activatorHandler}) {
  const [active, setActive] = useState(true);
  const [checked, setChecked] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleCheckbox = useCallback((value) => setChecked(value), []);

//   const activator = <Button onClick={toggleActive}>Open</Button>;

  return (
    <div>
      <Modal
        // large
        // activator={activator}
        open={open}
        onClose={activatorHandler}
        title="Import Products"
        primaryAction={{
          content: 'Import customers',
          onAction: toggleActive,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: activatorHandler,
          },
        ]}
      >
        <Modal.Section>
          <Stack vertical>
            <Stack.Item>
                <Heading>
                Import Updated Product CSV
                </Heading>
                <p>To ensure seamless Product update, first export the Product information in the form of a CSV file, make the necessary updates to this CSV file and then import this very same updated CSV file. All changes will be reflected on the App as well as on your Shopify store too.</p>
            </Stack.Item>
            <Bannner data={{status:'',content:'hjfvbdvdhf'}}/>
            <Stack.Item>
            <DropZone
              accept=".csv"
              errorOverlayText="File type must be .csv"
            //   placeHolder='fbfgfg'
              type="file"
              onDrop={() => {}}
            >
              <DropZone.FileUpload actionHint="Valid format: .csv file"/>
            </DropZone>
            </Stack.Item>
            <Stack.Item>
                <Link url='https://docs.cedcommerce.com/shopify/amazon-channel-cedcommerce/?section=csv-bulk-action' external>Need help importing Products?</Link>
            </Stack.Item>
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
  );
}
export default ImportMOdal