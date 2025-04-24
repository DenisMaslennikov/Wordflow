import styled from "styled-components";
import { isValidElement, PropsWithChildren, ReactElement } from "react";
import Label from "./Label.tsx";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;

  transition: all 0.3s;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:has(button) {
    display: flex;
    margin-top: 0.5rem;
    justify-content: space-between;
    gap: 1.2rem;
  }
`;

const Error = styled.span`
  font-size: 0.75rem;
  color: var(--color-red-700);
  hyphens: auto;
  word-break: break-word;
`;

interface FormRowProps {
  error?: string;
  label?: string;
}

function FormRowVertical({
  error,
  children,
  label,
}: PropsWithChildren<FormRowProps>) {
  const child = isValidElement(children)
    ? (children as ReactElement<{ id?: string }>)
    : undefined;
  const childId = child ? child.props.id : undefined;

  return (
    <StyledFormRow>
      {label && <Label htmlFor={childId}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
