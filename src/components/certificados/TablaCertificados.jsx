import React from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import {
    Box,
    Table,
    TableCaption,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
    IconButton,
    Flex,
    Text,
    Tooltip,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Select,
    InputGroup,
    InputLeftElement,
    Stack,
    HStack,
    Button,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { FaSort } from 'react-icons/fa';
import { LuChevronLast, LuChevronFirst, LuChevronRight, LuChevronLeft } from 'react-icons/lu';
import 'jspdf-autotable';
import { CSVLink, CSVDownload } from "react-csv";
import { CiExport } from 'react-icons/ci';

const GlobalFilter = ({ globalFilter, setGlobalFilter, data }) => {
    const csvData = [
        ["ID", "TITLE", "HOVER TITLE", "DESCRIPCION", "ENLACE", "FECHA", "ESTADO"],
        ...data.map(({ _id, title, hover_title, description, link, updatedAt, estado }) => [
            _id,
            title,
            hover_title,
            description,
            link,
            updatedAt,
            estado,
        ]),
    ];

    return (
        <Flex align="center" px={4} mb={4} py={2}>
            <Stack direction={"column"} spacing={2} w="full">
                <Stack direction={"row"} spacing={2} w="full" justifyContent="space-between">
                    <CSVLink separator={";"} filename="my-file.csv" data={csvData}>
                        <Button
                            leftIcon={<CiExport size={25} />}
                            background={'purple.500'}
                            fontWeight={'normal'}
                            color={'white'}
                            fontSize={'md'}
                            _hover={{
                                background: 'purple.700'
                            }}
                        >
                            Exportar
                        </Button>
                    </CSVLink>
                    <InputGroup maxW={400}>
                        <InputLeftElement pointerEvents='none'>
                            <SearchIcon color='purple.500' />
                        </InputLeftElement>
                        <Input
                            value={globalFilter || ''}
                            onChange={(e) => setGlobalFilter(e.target.value || undefined)}
                            placeholder={`Buscar registros...`}
                            variant='outline'
                            _focus={{
                                borderColor: 'purple.600',
                                boxShadow: 'none',
                            }}
                        />
                    </InputGroup>
                </Stack>
            </Stack>
        </Flex>
    );
};


const TablaCertificados = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        state,
        setGlobalFilter,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
    } = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <Box overflowX="auto">
            <GlobalFilter
                preGlobalFilteredRows={state.preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                data={data}
            />
            <Table {...getTableProps()} size="sm" variant='simple'>
                <TableCaption px={4} mb={4} fontSize={14}>
                    <Flex justifyContent={{ base: 'center', lg: 'space-between' }} alignItems="center">
                        <HStack display={{ base: 'none', lg: 'flex' }}>
                            <Text>Ir a la Pagina: </Text>
                            <NumberInput
                                w={28}
                                min={1}
                                max={pageOptions.length}
                                onChange={(value) => {
                                    const page = value ? value - 1 : 0;
                                    gotoPage(page);
                                }}
                                defaultValue={pageIndex + 1}
                            >
                                <NumberInputField _focus={{
                                    borderColor: 'purple.600',
                                    boxShadow: 'none',
                                }} />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </HStack>
                        <HStack spacing={2}>
                            <Text flexShrink="0" display={{ base: 'none', lg: 'flex' }}>Filas por página:</Text>{" "}
                            <Select
                                w={20}
                                _focus={{
                                    borderColor: 'purple.600',
                                    boxShadow: 'none',
                                }}
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                }}
                            >
                                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </Select>
                            <Text flexShrink="0">
                                <Text fontWeight="bold" as="span">
                                    {pageIndex + 1}
                                </Text>{" "}
                                -{" "}
                                <Text fontWeight="bold" as="span">
                                    {pageSize}
                                </Text>{" "}
                                de{" "}
                                <Text fontWeight="bold" as="span">
                                    {pageOptions.length}
                                </Text>
                            </Text>
                            <IconButton
                                onClick={() => gotoPage(0)}
                                isDisabled={!canPreviousPage}
                                icon={<LuChevronFirst size={20} />}
                                colorScheme='gray'
                                variant={'ghost'}
                                isRound
                            />
                            <IconButton
                                onClick={previousPage}
                                isDisabled={!canPreviousPage}
                                icon={<LuChevronLeft size={20} />}
                                colorScheme='gray'
                                variant={'ghost'}
                                isRound
                            />
                            <IconButton
                                onClick={nextPage}
                                isDisabled={!canNextPage}
                                icon={<LuChevronRight size={20} />}
                                colorScheme='gray'
                                variant={'ghost'}
                                isRound
                            />
                            <IconButton
                                onClick={() => gotoPage(pageCount - 1)}
                                isDisabled={!canNextPage}
                                icon={<LuChevronLast size={20} />}
                                colorScheme='gray'
                                variant={'ghost'}
                                isRound
                            />
                        </HStack>
                    </Flex>
                </TableCaption>
                <Thead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <Th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                >
                                    <Flex justify={isEstadoAccionesColumn(column) ? 'center' : 'start'} alignItems="center">
                                        {column.render('Header')}
                                        {column.isSorted ? (
                                            <div style={{ marginLeft: '5px' }}>
                                                {column.isSortedDesc ? (
                                                    <FaSort size={16} />
                                                ) : (
                                                    <FaSort size={16} />
                                                )}
                                            </div>
                                        ) : null}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                                ))}
                            </Tr>
                        );
                    })}
                </Tbody>
            </Table>
        </Box>
    );
};

export default TablaCertificados;

const isEstadoAccionesColumn = (column) => {
    return column.id === 'estado' || column.id === 'acciones';
};
