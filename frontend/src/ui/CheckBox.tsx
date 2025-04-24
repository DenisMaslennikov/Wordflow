import styled from "styled-components";
import { ComponentPropsWithoutRef } from "react";
import Label from "./Label.tsx";

const StyledCheckBox = styled.input.attrs({ type: "checkbox" })`
  font-size: 1.3rem;
  border-radius: var(--border-radius-sm);
  accent-color: var(--color-brand-500);
`;

const Container = styled.div`
  display: flex;
  gap: 0.3rem;
`;

function CheckBox({
  label,
  id,
  ...args
}: { label: string; id: string } & Omit<
  ComponentPropsWithoutRef<"input">,
  "id"
>) {
  return (
    <Container>
      <StyledCheckBox id={id} {...args} />
      <Label htmlFor={id}>{label}</Label>
    </Container>
  );
}

export default CheckBox;
