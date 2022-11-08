import {Checkbox} from '@shopify/polaris';

function CheckBox({name,handleChange,checked}) {
  return (
    <Checkbox
      label={name}
      checked={checked}
      onChange={()=>handleChange(name)}
    />
  );
}
export default CheckBox