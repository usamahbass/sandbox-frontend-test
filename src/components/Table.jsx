import { useState, useEffect } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import {
  Button,
  Flex,
  Input,
  TableContainer,
  Tbody,
  Td,
  Th,
  Table as ChakraTable,
  Thead,
  Tr,
  InputGroup,
  InputRightAddon,
  IconButton,
  Stack,
  Select as ChakraSelect,
  Text,
  Box,
} from "@chakra-ui/react";
import useSWR, { mutate } from "swr";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { getNumberList } from "@app/utils/helper";
import { useStore } from "@app/hooks/useStore";
import { setTriggerTable } from "@app/context/actions";
import Pagination from "./Pagination";
import SortUpIcon from "@app/icons/SortUpIcon";
import SortDownIcon from "@app/icons/SortDownIcon";
import SearchIcon from "@app/icons/Search";

const Table = ({
  title,
  url,
  columns,
  withNumber,
  withAddButton = true,
  queryParams,
  hrefCreate,
  placeholderSearch,
  titleCreate = "Tambah Toko",
  withSelect,
  withSearch = true,
}) => {
  const navigate = useNavigate();

  const { dispatch, state } = useStore();

  const [tableMeta, setTableMeta] = useState({
    page: 1,
    per_page: 10,
    search: "",
  });

  const tableURL = `${url}?page=${tableMeta.page}&per_page=${
    tableMeta.per_page
  }&search=${tableMeta.search}${queryParams ?? ""}`;

  const { data, isLoading, error } = useSWR(url ? tableURL : null);

  const [isTableData, setIsTableData] = useState(data?.data);

  const isData = data?.data;
  const isMetaTable = data?.meta;

  const [sorting, setSorting] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [searchValueHasDebounced] = useDebounce(searchValue, 500);

  const tableData = useReactTable({
    data: isTableData,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    columns: withNumber
      ? [
          {
            header: "No",
            accessorKey: "",
            cell: ({ row }) =>
              `${getNumberList(
                row.index,
                isMetaTable?.page,
                isMetaTable?.per_page
              )}.`,
          },
          ...columns,
        ]
      : columns,
  });

  useEffect(() => {
    if (isData) {
      setIsTableData(isData);
    }
  }, [isData]);

  useEffect(() => {
    if (state.table.trigger) {
      mutate(tableURL);
    }

    return () => dispatch(setTriggerTable(false));
  }, [state.table.trigger]);

  useEffect(() => {
    if (searchValueHasDebounced || searchValueHasDebounced === "") {
      setTableMeta((prevTableMeta) => ({
        ...prevTableMeta,
        search: searchValueHasDebounced,
      }));
    }
  }, [searchValueHasDebounced]);

  if (error) {
    return <div>error render table.</div>;
  }

  return (
    <Stack spacing="30px">
      {/* card header */}

      <Stack spacing={12}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text
            color="dark.500"
            fontWeight={600}
            fontSize={["24px", "24px", "24px", "32px"]}
          >
            {title}
          </Text>

          {withAddButton && (
            <Button
              w="200px"
              h="52px"
              borderRadius="50px"
              colorScheme="primary"
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => navigate(hrefCreate)}
            >
              {titleCreate}
            </Button>
          )}
        </Flex>

        {withSearch && (
          <Flex gap="14px" justifyContent="space-between" alignItems="center">
            {withSelect && <Box w="50%">{withSelect}</Box>}

            <InputGroup>
              <Input
                h="56px"
                type="search"
                borderRadius="12px"
                borderRightWidth="0"
                placeholder={placeholderSearch}
                onChange={(e) => setSearchValue(e.target.value)}
              />

              <InputRightAddon
                bg="transparent"
                height="56px"
                borderRadius="12px"
              >
                <IconButton
                  size="lg"
                  left="10px"
                  colorScheme="primary"
                  position="relative"
                  borderRadius="10px"
                  icon={<SearchIcon strokeColor="#fff" />}
                />
              </InputRightAddon>
            </InputGroup>
          </Flex>
        )}
      </Stack>

      {/* card body */}

      <div>
        {isLoading ? (
          <div>loading...</div>
        ) : isTableData?.length > 0 ? (
          <TableContainer>
            <ChakraTable fontFamily={`'Poppins', sans-serif`} w="full">
              <Thead h="48px" borderBottom="1px solid #EEEEEE">
                {tableData?.getHeaderGroups()?.map((headerGroup) => {
                  return (
                    <Tr key={headerGroup.id} textAlign="left">
                      {headerGroup.headers.map((header) => {
                        // const meta = header.column.columnDef.meta;
                        return (
                          <Th
                            key={header.id}
                            fontWeight={600}
                            fontSize="sm"
                            color="#272C32"
                            py="3.5"
                            fontFamily={`'Poppins', sans-serif !important`}
                            px="6"
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <Flex alignItems="center" gap="6px">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}

                              <Box
                                as="span"
                                fontFamily={`'Poppins', sans-serif`}
                              >
                                {header.column.getIsSorted() ? (
                                  <>
                                    <SortUpIcon
                                      isActive={
                                        header?.column?.getIsSorted() === "asc"
                                      }
                                    />
                                    <SortDownIcon
                                      isActive={
                                        header?.column?.getIsSorted() === "desc"
                                      }
                                    />
                                  </>
                                ) : null}
                              </Box>
                            </Flex>
                          </Th>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Thead>
              <Tbody>
                {tableData.getRowModel().rows?.map((row) => (
                  <Tr key={row.id} h="96px">
                    {row.getVisibleCells()?.map((cell) => {
                      // const meta = cell.column.columnDef.meta;
                      return (
                        <Td
                          key={cell.id}
                          fontWeight={500}
                          borderBottom="1px solid #EEEEEE"
                          py="3.5"
                          px="6"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                ))}
              </Tbody>
            </ChakraTable>
          </TableContainer>
        ) : (
          <div>no data</div>
        )}
      </div>

      {/* card footer */}
      <Flex
        h="64px"
        w="full"
        pos="relative"
        alignItems="center"
        roundedBottom="2xl"
        px="3.5"
        py="6"
        justifyContent="space-between"
      >
        <Flex
          alignItems="center"
          gap="7px"
          className="flex items-center gap-[7px]"
        >
          <ChakraSelect
            bg="#F6F9FB"
            w="63px"
            h="36px"
            fontSize="xs"
            rounded="md"
            onChange={(e) =>
              setTableMeta((prevTableMeta) => ({
                ...prevTableMeta,
                per_page: e.target.value,
              }))
            }
          >
            <option className="text-center" value={10}>
              10
            </option>
            <option className="text-center" value={25}>
              25
            </option>
            <option className="text-center" value={50}>
              50
            </option>
            <option className="text-center" value={75}>
              75
            </option>
            <option className="text-center" value={100}>
              100
            </option>
          </ChakraSelect>

          <Text fontSize="xs" color="dark.500">
            Tampilkan {tableMeta.per_page} data per halaman
          </Text>
        </Flex>

        {isTableData?.length > 0 && (
          <Pagination
            rowsPerPage={tableMeta.per_page}
            totalRows={isMetaTable?.total}
            pageChangeHandler={(currentPage) => {
              // scroll to top
              window.scroll(0, 0);

              setTableMeta((prevTableMeta) => ({
                ...prevTableMeta,
                page: currentPage,
              }));
            }}
          />
        )}
      </Flex>
    </Stack>
  );
};

export default Table;
