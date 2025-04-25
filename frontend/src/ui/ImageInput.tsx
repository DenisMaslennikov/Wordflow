import styled from "styled-components";
import { ChangeEvent, ComponentPropsWithoutRef, useState } from "react";
import Avatar from "./Avatar.tsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const StyledFileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.3rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-size: 1.3rem;
    font-weight: 500;
    padding: 0.5rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-500);
    cursor: pointer;
    transition:
      color 0.2s,
      background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

function ImageInput({
  $width,
  src,
  ...args
}: { $width: string; src?: string | null } & Omit<
  ComponentPropsWithoutRef<"input">,
  "multiple" | "type" | "accept"
>) {
  const [preview, setPreview] = useState<string | null | undefined>(src);

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }
  return (
    <Container>
      <Avatar src={preview} $width={$width} />
      <StyledFileInput
        accept={"image/*"}
        multiple={false}
        {...args}
        onChange={handleImageChange}
      />
    </Container>
  );
}

export default ImageInput;
