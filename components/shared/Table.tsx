import { useFilters, usePagination, useTable } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Flex, Select, Button, Text } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { ICommonTable } from './Interfaces';
import { useEffect } from 'react';

const CommonTable: React.FC<ICommonTable> = ({ columns, data, filter }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
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
      data,
      initialState: { pageIndex: 0 },
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
    <TableContainer {...{ width: '100%', background: 'var(--white-color)', borderRadius: '15px' }}>
      <Table {...{ variant: 'simple', size: 'lg', w: '100%', ...getTableProps() }}>
        <Thead>
          {headerGroups.map((headerGroup: any) => (
            <Tr key={nanoid()} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <Th key={nanoid()} {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows?.length > 0 ? (
            rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={nanoid()}>
                  {row.cells.map((cell) => {
                    return (
                      <Td {...cell.getCellProps()} key={nanoid()}>
                        {cell.render('Cell')}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })
          ) : (
            <Flex {...{ padding: '20px', alignItems: 'center', justifyContent: 'center', width: '100%' }}>{'Nu exista nici o inregistrare.'}</Flex>
          )}
        </Tbody>
      </Table>
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
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Arata {pageSize}/pg
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
    </TableContainer>
  );
};

export default CommonTable;
