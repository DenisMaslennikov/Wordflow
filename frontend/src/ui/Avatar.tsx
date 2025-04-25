import styled from "styled-components";

const ImgWrapper = styled.div<{ $width?: string }>`
  width: ${({ $width }) => $width};
  height: ${({ $width }) => $width};
  border-radius: 50%;
  overflow: hidden;
`;

const Img = styled.img<{ $width?: string }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

function Avatar({ src, $width }: { src?: string | null; $width: string }) {
  if (!src) return null;

  return (
    <ImgWrapper $width={$width}>
      <Img src={src} alt="Preview" />
    </ImgWrapper>
  );
}

export default Avatar;
