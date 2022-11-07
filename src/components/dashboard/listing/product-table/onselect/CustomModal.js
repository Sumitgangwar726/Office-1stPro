import { Modal } from '@shopify/polaris'
import React, { useState } from 'react'

const CustomModal = ({name ,content , buttonName , modalClose}) => {
    const [active , setActive] = useState(true)
    console.log(buttonName);
    const handelClose = ()=>{
        modalClose()
    }
    const handelButtonClick = ()=>{
        alert('button click')
    }
  return (
    <div style={{height: '500px'}}>
        <Modal
            open={true}
            onClose={handelClose}
            title={name}
            primaryAction={{
                content:`${buttonName}`,
                onAction:{handelButtonClick},
            }}
        >
            <Modal.Section>
                <p>{content}</p>
            </Modal.Section>

        </Modal>
    </div>
  )
}

export default CustomModal