import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  BORDER_COLOR,
  ITEMS_PER_PAGE_SELECTOR,
  TEXT_MAIN_COLOR,
} from "../utils/constants.ts";
import { useSearchParams } from "react-router-dom";
import ButtonIcon from "./ButtonIcon.tsx";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";

const StyledFooter = styled.footer`
  display: flex;
  width: 100%;
  border-top: var(${BORDER_COLOR}) 1px solid;
  justify-content: center;
  align-items: center;
`;

const Select = styled.select`
  border-radius: var(--border-radius-sm);
  border: var(${BORDER_COLOR}) 1px solid;
  font-size: 1.2rem;
  color: var(${TEXT_MAIN_COLOR});
  margin: 0 0.2rem;
  padding: 0.2rem;
  text-align: center;
`;

const PageSelector = styled.input`
  font-size: 1.2rem;
  width: 3rem;
  padding: 0.2rem;
  color: var(${TEXT_MAIN_COLOR});
  border-radius: var(--border-radius-sm);
  border: var(${BORDER_COLOR}) 1px solid;
  margin: 0 0.2rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  color: var(${TEXT_MAIN_COLOR});
`;

const Span = styled.span`
  font-size: 1.2rem;
  color: var(${TEXT_MAIN_COLOR});
`;

type FooterPaginatorProps = {
  countResults: number;
  pagesNumber: number;
  to: number;
  from: number;
  limit: number;
};

function FooterPaginator({
  countResults,
  pagesNumber,
  from,
  to,
  limit,
}: FooterPaginatorProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = page.toString();
  }, [page]);

  function handlePageChange(page: number) {
    if (page > pagesNumber) page = pagesNumber;
    if (page < 1) page = 1;
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  }

  function handlePerPageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("limit", e.currentTarget.value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFooter>
      <ButtonIcon
        disabled={page === 1}
        onClick={() => handlePageChange(1)}
        $padding={"0.4rem 0"}
        $height={"1.8rem"}
        $width={"1.8rem"}
      >
        <HiChevronDoubleLeft />
      </ButtonIcon>
      <ButtonIcon
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        $padding={"0.4rem 0"}
        $height={"1.8rem"}
        $width={"1.8rem"}
      >
        <HiChevronLeft />
      </ButtonIcon>
      <Span>{`C ${from} по ${to} из ${countResults}`}</Span>
      <ButtonIcon
        disabled={page == pagesNumber}
        onClick={() => handlePageChange(page + 1)}
        $padding={"0.4rem 0"}
        $height={"1.8rem"}
        $width={"1.8rem"}
      >
        <HiChevronRight />
      </ButtonIcon>
      <ButtonIcon
        disabled={page === pagesNumber}
        onClick={() => handlePageChange(pagesNumber)}
        $padding={"0.4rem 0"}
        $height={"1.8rem"}
        $width={"1.8rem"}
      >
        <HiChevronDoubleRight />
      </ButtonIcon>
      <Label htmlFor={"perPage"}>Постов на страницу:</Label>
      <Select
        id={"perPage"}
        value={limit}
        onChange={(e) => handlePerPageChange(e)}
      >
        {ITEMS_PER_PAGE_SELECTOR.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Select>
      <Label htmlFor={"selectPage"}>Перейти на </Label>
      <PageSelector
        ref={inputRef}
        onKeyDown={(e) => {
          let val = Number(e.currentTarget.value);
          if (Number.isNaN(val)) val = page;

          if (e.key === "Enter") handlePageChange(val);
        }}
        inputMode={"numeric"}
      />
      <Span>{`страницу из ${pagesNumber}`}</Span>
    </StyledFooter>
  );
}

export default FooterPaginator;
