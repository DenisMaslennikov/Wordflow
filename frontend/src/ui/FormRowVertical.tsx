import styled from "styled-components";
import { PropsWithChildren } from "react";
import { TEXT_MAIN_COLOR } from "../utils/constants.ts";

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

const Label = styled.label`
  font-size: 1rem;
  color: var(${TEXT_MAIN_COLOR});
  margin: 0.5rem 0;
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
  return (
    <StyledFormRow>
      {label && <Label>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
