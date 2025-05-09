import {
  ComponentPropsWithoutRef,
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import useOutsideClick from "../hooks/useOutsideClick.ts";
import { createPortal } from "react-dom";
import styled from "styled-components";
import Button, { type ButtonProps } from "./Button.tsx";
import { BORDER_COLOR } from "../utils/constants.ts";

type Position = { x: number; y: number };

type Id = string | number | null;

type MenuContext = {
  openId: Id;
  position: Position | null;
  close: () => void;
  open: (id: number | string | null) => void;
  setPosition: (position: Position) => void;
};

const initialState = {
  openId: null,
  position: null,
  close: () => console.log("Use menu context outside provider"),
  open: () => console.log("Use menu context outside provider"),
  setPosition: () => console.log("Use menu context outside provider"),
};

const MenuContext = createContext<MenuContext>(initialState);

const StyledList = styled.ul<{ $position: Position | null }>`
  position: fixed;

  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position?.x}px;
  top: ${(props) => props.$position?.y}px;
  border: var(${BORDER_COLOR}) 1px solid;
`;

function DropDownMenu({ children }: PropsWithChildren) {
  const [openId, setOpenId] = useState<Id>(null);
  const [position, setPosition] = useState<Position | null>(null);

  const close = () => setOpenId(null);
  const open = setOpenId;

  const contextValue = useMemo(() => {
    return {
      close,
      open,
      openId,
      setPosition,
      position,
    };
  }, [open, openId, position]);

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  );
}

function Toggle({
  menuId,
  children,
  $style,
  $size,
  ...args
}: PropsWithChildren<
  { menuId: Id } & Omit<ComponentPropsWithoutRef<"button">, "children" | "id"> &
    ButtonProps
>) {
  const { openId, close, open, setPosition } = useContext(MenuContext);

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height,
    });

    if (!openId || openId !== menuId) open(menuId);
    else close();
  }

  return (
    <Button $style={$style} $size={$size} onClick={handleClick} {...args}>
      {children}
    </Button>
  );
}

function List({ menuId, children }: PropsWithChildren<{ menuId: Id }>) {
  const { openId, position, close } = useContext(MenuContext);

  const ref = useOutsideClick<HTMLUListElement>(close, false);

  if (openId !== menuId) return null;

  return createPortal(
    <StyledList ref={ref} $position={position}>
      {children}
    </StyledList>,
    document.body,
  );
}

function ListItem({
  children,
  onClick,
  $style,
  $size,
  ...args
}: PropsWithChildren<
  {
    onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  } & Omit<ComponentPropsWithoutRef<"button">, "onClick" | "children"> &
    ButtonProps
>) {
  const { close } = useContext(MenuContext);
  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    onClick?.(e);
    close();
  }

  return (
    <li>
      <Button $style={$style} $size={$size} onClick={handleClick} {...args}>
        {children}
      </Button>
    </li>
  );
}

DropDownMenu.Toggle = Toggle;
DropDownMenu.List = List;
DropDownMenu.ListItem = ListItem;

export default DropDownMenu;
