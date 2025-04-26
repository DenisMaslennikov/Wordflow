import styled from "styled-components";
import Tag from "./Tag.tsx";
import type { Tag as TagType } from "./types/Tag.ts";

const StyledTags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  flex: 1 1 auto;
  margin-right: 2rem;
`;

function Tags({ tags }: { tags: TagType[] }) {
  return (
    tags.length > 0 && (
      <StyledTags>
        {tags.map((tag) => (
          <Tag key={tag.id} tag={tag} />
        ))}
      </StyledTags>
    )
  );
}

export default Tags;
