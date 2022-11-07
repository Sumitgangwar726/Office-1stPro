import {Button, Modal, Stack, ChoiceList, Heading} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import Bannner from './Bannner';
import CheckBox from './CheckBox';

function ExportModal({open,activatorHandler,disable}) {
  const CURRENT_PAGE = 'current_page';
  const ALL_CUSTOMERS = 'all_customers';
  const SELECTED_CUSTOMERS = 'selected_customers';
  const CSV_EXCEL = 'csv_excel';
  const CSV_PLAIN = 'csv_plain';

  const [active, setActive] = useState(true);
  const [selectedExport, setSelectedExport] = useState([]);
  const [selectedExportAs, setSelectedExportAs] = useState([]);
  const [allChecked,setAllChecked] = useState({All:false,Title:false,Quantity:false,Price:false,Barcode:false,SKU:false})
  const checkHandler =(val)=>{
    let conditions = {...allChecked}
        conditions[val] = !conditions[val]
        console.log(conditions)
    if(conditions.Title===true  || conditions.Quantity===true || conditions.Price===true || conditions.Barcode===true || conditions.SKU===true)
    conditions.All = 'indeterminate'
    if(conditions.Title===true  && conditions.Quantity===true && conditions.Price===true && conditions.Barcode===true && conditions.SKU===true)
    conditions.All = true
    if(conditions.All===true){
        Object.keys(conditions).map((item)=>conditions[item]=true)
    }
    if(conditions.All===false){
        console.log('first')
        Object.keys(conditions).map((item)=>conditions[item]=false)
    }
    setAllChecked(conditions)
  }
//   console.log(allChecked)
  const handleModalChange = useCallback(() => setActive(!active), [active]);

  const handleClose = () => {
    handleModalChange();
    handleSelectedExport([]);
    handleSelectedExportAs([]);
  };

  const handleSelectedExport = useCallback(
    (value) => setSelectedExport(value),
    [],
  );

  const handleSelectedExportAs = useCallback(
    (value) => setSelectedExportAs(value),
    [],
  );

//   const activator = <Button onClick={handleModalChange}>Open</Button>;

  return (
    <div>
      <Modal
        // activator={activator}
        open={open}
        onClose={activatorHandler}
        title="Export customers"
        primaryAction={{
          content: 'Export customers',
          onAction: handleClose,
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
                <Heading>Export Product Information</Heading>
                <p>Get details of selected/all Products in the form of a CSV document and make the necessary changes to that information.</p>
            </Stack.Item>
            <Stack.Item>
              <ChoiceList
                // title="Export"
                choices={[
                  {label: 'Current page', value: CURRENT_PAGE},
                  {label: 'All Product', value: ALL_CUSTOMERS},
                  {label: `Selected Product : ${0} Product`, value: SELECTED_CUSTOMERS,disabled:disable[0]},
                  {label:'Found 50+ matching products corresponding to your search',value:'hdjhgd',disabled:disable[1]}
                ]}
                selected={selectedExport}
                onChange={handleSelectedExport}
              />
            </Stack.Item>
            <Stack.Item>
                <Heading>Please select the columns to be exported based on the applied filters</Heading>
                <Stack>
                    <CheckBox name={'All'} handleChange={checkHandler} checked={allChecked.All}/>
                    <CheckBox name={'Title'} handleChange={checkHandler} checked={allChecked.Title}/>
                    <CheckBox name={'Quantity'} handleChange={checkHandler} checked={allChecked.Quantity}/>
                    <CheckBox name={'Price'} handleChange={checkHandler} checked={allChecked.Price}/>
                    <CheckBox name={'Barcode'} handleChange={checkHandler} checked={allChecked.Barcode}/>
                    <CheckBox name={'SKU'} handleChange={checkHandler} checked={allChecked.SKU}/>
                </Stack>
            </Stack.Item>
            <Stack.Item>
                <Bannner data={{status:'warning',content:'To ensure seamless Product update, export the Product information in the form of a CSV file, make the necessary updates to this CSV file and then import this very same updated CSV file.'}}/>
            </Stack.Item>
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
  );
}
export default ExportModal