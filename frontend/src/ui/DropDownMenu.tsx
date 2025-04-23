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
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
  id,
  children,
  $style,
  $size,
}: PropsWithChildren<{ id: Id } & ButtonProps>) {
  const { openId, close, open, setPosition } = useContext(MenuContext);

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8, // TODO Убрать магическое число
    });

    if (!openId || openId !== id) open(id);
    else close();
  }

  return (
    <Button $style={$style} $size={$size} onClick={handleClick}>
      {children}
    </Button>
  );
}

function List({ id, children }: PropsWithChildren<{ id: Id }>) {
  const { openId, position, close } = useContext(MenuContext);

  const ref = useOutsideClick<HTMLUListElement>(close, false);

  if (openId !== id) return null;

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
DropDownMenu.Menu = Menu;

export default DropDownMenu;
