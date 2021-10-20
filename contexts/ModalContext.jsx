import { createContext, useState } from 'react';
import { Backdrop } from '@mui/material';

export const ModalContext = createContext();

function Modal({ component }) {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
      onClick={() => {}}
    >
      {component}
    </Backdrop>
  )
}

export function ModalProvider({ children }) {
  const [modalComponent, setModalComponent] = useState(null);

  function modalFunction(component) {
    function close() {
      setModalComponent(null);
    }

    function appear(custom = null) {
      setModalComponent(component({ close, custom }));
    }

    return {
      appear,
      close
    }
  }

  return (
    <ModalContext.Provider value={modalFunction}>
      {children}

      { modalComponent && <Modal component={modalComponent} />}
    </ModalContext.Provider>
  )
} 