import {Checkbox} from '@shopify/polaris';
import {useState, useCallback, useEffect} from 'react';

function CheckBox({name,handleChange,checked}) {
//   const [checked, setChecked] = useState('indeterminate');
//   const handleChange = useCallback((newChecked) => setChecked(newChecked), []);
  return (
    <Checkbox
      label={name}
      checked={checked}
      onChange={()=>handleChange(name)}
    />
  );
}
export default CheckBox