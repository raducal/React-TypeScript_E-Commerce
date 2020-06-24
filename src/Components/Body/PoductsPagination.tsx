import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface IProps {
  goToPage: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  prevPage: () => void;
  nextPage: () => void;
  currentPage: number;
  pages: number[];
}

const PoductsPagination: React.FC<IProps> = ({
  goToPage,
  prevPage,
  nextPage,
  currentPage,
  pages,
}) => {
  return (
    <div className="pages">
      <div className="pagesButtons">
        {currentPage > 1 && (
          <button onClick={prevPage}>
            <IoIosArrowBack />
          </button>
        )}
        {pages.length > 1 &&
          pages.map((page, i) => {
            let active: any = {};
            if (i + 1 === currentPage) active["background"] = "blue";
            return (
              <button onClick={(e) => goToPage(e)} key={i} style={active}>
                {i + 1}
              </button>
            );
          })}
        {currentPage < pages.length && (
          <button onClick={nextPage}>
            <IoIosArrowForward />
          </button>
        )}
      </div>
    </div>
  );
};

export default PoductsPagination;
