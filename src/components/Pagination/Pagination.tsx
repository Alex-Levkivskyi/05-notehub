import React from "react";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

export interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

// Виправлення для сумісності react-paginate з Vite
const Paginate =
  (ReactPaginate as unknown as { default?: typeof ReactPaginate }).default ??
  ReactPaginate;

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  const handlePageClick = (event: { selected: number }): void => {
    onPageChange(event.selected + 1);
  };

  return (
    <Paginate
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      forcePage={currentPage - 1}
      onPageChange={handlePageClick}
      containerClassName={css.pagination}
      activeClassName={css.active}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
