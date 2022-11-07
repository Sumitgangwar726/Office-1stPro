import {Button, Popover, ActionList} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function BulkPopover({data,onClick}) {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      {data.name}
    </Button>
  );

  return (
    <div>
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        <ActionList
          actionRole="menuitem"
          items={data.content.map((item)=>{
            return{
                content:item,
                onAction:()=>onClick(item)
            }
          })}
        />
      </Popover>
    </div>
  );
}
export default BulkPopover