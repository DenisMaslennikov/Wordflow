import styled from "styled-components";

const ImgWrapper = styled.div<{ $size?: string }>`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border-radius: 50%;
  overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

function Avatar({ src, $size }: { src?: string | null; $size: string }) {
  if (!src) return null;

  return (
    <ImgWrapper $size={$size}>
      <Img src={src} alt="Preview" />
    </ImgWrapper>
  );
}

export default Avatar;
