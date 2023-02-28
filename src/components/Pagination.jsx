import { useState, useEffect } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { usePaginationTable } from "@app/hooks/usePaginationTable";
import ArrowRightTwo from "@app/icons/ArrowRight2";
import ArrowLeftTwo from "@app/icons/ArrowLeft2";

const Pagination = ({ pageChangeHandler, totalRows, rowsPerPage }) => {
  const noOfPages = Math.ceil(totalRows / rowsPerPage);

  // const pagesArr = [...new Array(noOfPages)];

  const [currentPage, setCurrentPage] = useState(1);

  const paginationRange = usePaginationTable({
    currentPage,
    totalCount: totalRows,
    siblingCount: 1,
    pageSize: rowsPerPage,
  });

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  const onNextPage = () => setCurrentPage(currentPage + 1);
  const onPrevPage = () => setCurrentPage(currentPage - 1);
  const onPageSelect = (pageNo) => setCurrentPage(pageNo);

  useEffect(() => {
    if (noOfPages === currentPage) {
      setCanGoNext(false);
    } else {
      setCanGoNext(true);
    }
    if (currentPage === 1) {
      setCanGoBack(false);
    } else {
      setCanGoBack(true);
    }
  }, [noOfPages, currentPage]);

  useEffect(() => {
    // const skipFactor = (currentPage - 1) * rowsPerPage;
    // Some APIs require skip for paginaiton. If needed use that instead
    // pageChangeHandler(skipFactor);
    pageChangeHandler(currentPage);
  }, [currentPage]);

  return (
    <Flex id="table-pagination">
      <IconButton
        cursor="pointer"
        w="30px"
        display="flex"
        h="30px"
        rounded="md"
        alignItems="center"
        justifyContent="center"
        onClick={onPrevPage}
        disabled={!canGoBack}
        bg="transparent"
        _hover={{
          bg: "transparent",
        }}
      >
        <ArrowLeftTwo w={18} h={18} color="#5DC3B2" />
      </IconButton>

      <Flex alignItems="center" gap="12px">
        {paginationRange?.map((pageNumber, index) => (
          <Flex
            w="30px"
            h="30px"
            rounded="xl"
            color={pageNumber === currentPage ? "white" : "primary.500"}
            cursor="pointer"
            alignItems="center"
            justifyContent="center"
            key={index}
            onClick={() => onPageSelect(pageNumber)}
            bg={pageNumber === currentPage ? "primary.500" : "white"}
          >
            {pageNumber}
          </Flex>
        ))}
      </Flex>

      <IconButton
        onClick={onNextPage}
        disabled={!canGoNext}
        cursor="pointer"
        w="30px"
        h="30px"
        rounded="md"
        display="flex"
        bg="transparent"
        _hover={{
          bg: "transparent",
        }}
        alignItems="center"
        justifyContent="center"
      >
        <ArrowRightTwo color="#5DC3B2" w={18} h={18} />
      </IconButton>
    </Flex>
  );
};

export default Pagination;
