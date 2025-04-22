import styled from "styled-components";
import { PropsWithChildren } from "react";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: row;

  padding: 0.5rem 0;

  transition: all 0.3s;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:has(button) {
    display: flex;
    justify-content: space-between;
    gap: 1.2rem;
  }
`;

const Error = styled.span`
  font-size: 0.75rem;
  color: var(--color-red-700);
`;

interface FormRowProps {
  error?: string;
}

function FormRowHorizontal({
  error,
  children,
}: PropsWithChildren<FormRowProps>) {
  return (
    <StyledFormRow>
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowHorizontal;
