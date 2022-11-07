// import {Button, Modal, TextContainer} from '@shopify/polaris';
// import {useState, useCallback} from 'react';

// function ErrorModal({data , name}) {
//   const [active, setActive] = useState(false);

//   const handleChange = useCallback(() => setActive(!active), [active]);

//   const activator = <Button plain onClick={handleChange}>{name ? name : 'View Error'}</Button>;



//   return (
//       <Modal
//         activator={activator}
//         open={active}
//         onClose={handleChange}
//         title={name ? name : 'Error'}
//       >
//         <Modal.Section>
//           <div>
//             {JSON.stringify(data)}
//           </div>
//         </Modal.Section>
//       </Modal>
//   );
// }

// export default ErrorModal