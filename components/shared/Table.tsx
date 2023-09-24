import { useFilters, usePagination, useTable } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Flex, Select, Button, Text } from '@chakra-ui/react';
import { ICommonTable } from './Interfaces';
import { useEffect, useMemo } from 'react';

const CommonTable: React.FC<ICommonTable> = ({ columns, data, filter, isFooterVisible = true, className }) => {
  const memoizedData = useMemo(() => data, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    setFilter,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: memoizedData,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useFilters,
    usePagination
  );

  useEffect(() => {
    if (filter) {
      const { columnId, value } = filter;
      setFilter(columnId, value);
    }
  }, [filter, setFilter]);

  return (
    <TableContainer {...{ width: '100%', background: 'var(--white-color)', borderRadius: '15px', className }}>
      <Table {...{ variant: 'simple', size: 'lg', w: '100%', ...getTableProps() }}>
        <Thead>
          {headerGroups.map((headerGroup: any, index: number) => (
            <Tr key={`${index}_headerGroups`} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any, indexHeader: number) => (
                <Th key={`${indexHeader}_headerGroup`} {...{ ...column.getHeaderProps(), padding: 'var(--chakra-space-4)' }}>
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page?.length > 0 ? (
            page.map((row, index: number) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={`${index}_row`}>
                  {row.cells.map((cell, indexRow: number) => {
                    return (
                      <Td {...{ ...cell.getCellProps(), padding: 'var(--chakra-space-4)' }} key={`${indexRow}_row_cells`}>
                        {cell.render('Cell')}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })
          ) : (
            <Tr>
              <Text as="td" {...{ padding: '20px', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                {'Nu exista inregistrari.'}
              </Text>
            </Tr>
          )}
        </Tbody>
      </Table>
      {isFooterVisible && (
        <Flex {...{ padding: '10px 30px', gap: 'var(--gap-md)', justifyContent: 'space-between' }}>
          <Flex {...{ gap: 'var(--gap-md)' }}>
            <Button onClick={() => previousPage()} disabled={!canPreviousPage} {...{ variant: 'outline', color: 'var(--black-color)' }}>
              {'< Inapoi'}
            </Button>
            <Button onClick={() => nextPage()} disabled={!canNextPage} {...{ variant: 'outline', color: 'var(--black-color)' }}>
              {'Inainte >'}
            </Button>
          </Flex>
          <Flex {...{ gap: 'var(--gap-md)', alignItems: 'center' }}>
            <Flex {...{ alignItems: 'center', gap: 'var(--gap-sm)' }}>
              <Text> {'Page'}</Text>
              <Text {...{ fontWeight: 'bold' }}>{` ${pageIndex + 1} of ${pageOptions.length}`}</Text>
            </Flex>
            <Select
              {...{
                value: pageSize,
                onChange: (e) => setPageSize(Number(e.target.value)),
                variant: 'outline',
                size: 'sm',
                w: '130px',
              }}
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Arata {pageSize}/pg
                </option>
              ))}
            </Select>
          </Flex>
        </Flex>
      )}
    </TableContainer>
  );
};

export default CommonTable;
