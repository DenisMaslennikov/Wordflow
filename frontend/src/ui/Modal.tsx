import styled from "styled-components";
import React, {
  cloneElement,
  createContext,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick.ts";
import { HiXMark } from "react-icons/hi2";
import { HOVER_COLOR } from "../utils/constants.ts";

interface Modal {
  openId: string | null;
  close: () => void;
  open: (name: string) => void;
}

const defaultModalContext: Modal = {
  openId: null,
  open: () => {
    console.warn("Modal context used outside provider!");
  },
  close: () => {
    console.warn("Modal context used outside provider!");
  },
};

const ModalContext = createContext(defaultModalContext);

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  transition: all 0.5s;
  padding: 1rem;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(1px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  border-radius: var(--border-radius-lg);
  transition: all 0.2s;
  position: absolute;
  top: 0;
  right: -1.5rem;

  &:hover {
    background-color: var(${HOVER_COLOR});
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--color-grey-500);
  }
`;

function Modal({ children }: PropsWithChildren) {
  const [openId, setOpenId] = useState("");

  const close = useCallback(() => setOpenId(""), []);
  const open = setOpenId;

  const contextValue = useMemo(() => {
    return { openId, open, close };
  }, [open, close, openId]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  modalId,
}: {
  children: ReactElement<{ onClick?: React.MouseEventHandler }>;
  modalId: string;
}) {
  const { open } = useContext(ModalContext);

  if (!isValidElement(children))
    throw new Error(
      "Open children must be an React Element with onClick props",
    );

  return cloneElement(children, {
    onClick: (event) => {
      children.props.onClick?.(event);
      open(modalId);
    },
  });
}

function Window({
  children,
  modalId,
}: {
  children: ReactElement<{ onCloseModal?: React.MouseEventHandler }>;
  modalId: string;
}) {
  const { close, openId } = useContext(ModalContext);

  const ref = useOutsideClick<HTMLDivElement>(close);

  if (modalId !== openId) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>
          {cloneElement(children, {
            onCloseModal: close,
          })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
