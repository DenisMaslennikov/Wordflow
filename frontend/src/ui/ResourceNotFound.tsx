import styled from "styled-components";
import { MAX_WIDTH_POST_IN_LIST } from "../utils/constants.ts";
import Button from "./Button.tsx";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  max-width: ${MAX_WIDTH_POST_IN_LIST};
  font-size: 2rem;
  text-align: center;
  gap: 1rem;
`;
const Span = styled.span``;

function ResourceNotFound({ message }: { message: string }) {
  const navigate = useNavigate();

  return (
    <Container>
      <Span>{message}</Span>
      <Button
        onClick={() => navigate(-1)}
        $style={"regular"}
        $size={"mediumFullWidth"}
      >
        Вернутся назад
      </Button>
    </Container>
  );
}

export default ResourceNotFound;
