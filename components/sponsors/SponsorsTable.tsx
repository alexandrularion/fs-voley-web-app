import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { LayoutContainer } from '../shared/Layout';
import { ISponsorsList, TSponsor } from './Interfaces';
import { useMemo } from 'react';
import { CellValue } from 'react-table';
import Image from 'next/image';
import CommonTable from '../shared/Table';

const SponsorsTable: React.FC<ISponsorsList> = ({ data, filter }) => {
  const memoizedData: TSponsor[] = useMemo(() => data.map((obj) => ({ ...obj, key: nanoid() })), [data]);
  const columns = useMemo(
    () => [
      {
        Header: 'Logo',
        accessor: 'logo',
        Cell: ({ row: { original } }: CellValue) => (
          <div>
            <Image {...{ src: original.logo, width: 100, height: 100, alt: 'Logo Companie' }} />
          </div>
        ),
      },
      {
        Header: 'Title',
        accessor: 'title',
        Cell: ({ row: { original } }: CellValue) => original.title,
      },
      {
        Header: 'Website',
        accessor: 'site',
        Cell: ({ row: { original } }: CellValue) => original.site,
      },
      {
        Header: 'Sponsor din',
        accessor: 'startDate',
        Cell: ({ row: { original } }: CellValue) => new Date(original.startDate).getFullYear(),
      },
      {
        Header: 'Pana in',
        accessor: 'endDate',
        Cell: ({ row: { original } }: CellValue) => (original.endDate ? new Date(original.endDate).getFullYear() : 'Prezent'),
      },
    ],
    []
  );

  return (
    <Container>
      <LayoutContainer {...{ className: 'sl-layout-container' }}>
        <CommonTable {...{ columns, data: memoizedData, filter }} />
      </LayoutContainer>
    </Container>
  );
};

export default SponsorsTable;

const Container = styled.section`
  display: flex;
  justify-content: center;

  .sl-layout-container {
    display: flex;
    position: relative;
    top: -85px;
    gap: var(--gap-lg);
  }
`;
