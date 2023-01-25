import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { LayoutContainer } from '../shared/Layout';
import { ISponsorsList, TBESponsor, TSponsor } from './Interfaces';
import { useMemo, useState } from 'react';
import { CellValue } from 'react-table';
import Image from 'next/image';
import CommonTable from '../shared/Table';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { PenIcon, TrashIcon } from '../../styles/Icons';
import DeleteModal from '../shared/DeleteModal';
import { deleteSponsor } from '../../services/Sponsors.service';
import SponsorsCUModal from './SponsorsCUModal';
import { toast } from 'react-toastify';
import { createSponsor } from '../../services/Sponsors.service';
import { FormApi } from 'final-form';

const SponsorsTable: React.FC<ISponsorsList> = ({ data, filter }) => {
  const memoizedData: TSponsor[] = useMemo(() => data.map((obj) => ({ ...obj, key: nanoid() })), [data]);
  const deleteModal = useDisclosure();
  const cuModal = useDisclosure();
  const [sponsor, setSponsor] = useState<TSponsor>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitHandler = async (values: object, form: FormApi) => {
    setIsLoading(true);
    try {
      await createSponsor({ date_end: null, ...values } as TBESponsor);
      toast('Felicitari! Sponsorul a fost adaugat cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
      form.reset();
    } catch (err) {
      toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
    }

    setIsLoading(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
        Cell: ({ row: { original } }: CellValue) => <> {`#${original.id}`}</>,
      },
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
        Cell: ({ row: { original } }: CellValue) => original.startDate,
      },
      {
        Header: 'Pana in',
        accessor: 'endDate',
        Cell: ({ row: { original } }: CellValue) => original.endDate || 'Prezent',
      },
      {
        Header: 'Actiuni',
        accessor: 'actions',
        Cell: ({ row: { original } }: CellValue) => (
          <Flex {...{ gap: 'var(--gap-md)' }}>
            <Box {...{ cursor: 'pointer ' }}>
              <PenIcon
                {...{
                  size: '22px',
                  color: 'var(--grey-alpha-600)',
                  onClick: async () => {
                    await Promise.resolve(
                      setSponsor({
                        id: original.id,
                        title: original.title,
                        logo: original.logo,
                        startDate: original.startDate,
                        endDate: original.endDate,
                        site: original.site,
                      })
                    );
                    cuModal.onOpen();
                  },
                }}
              />
            </Box>
            <Box {...{ cursor: 'pointer ' }}>
              <TrashIcon
                {...{
                  size: '22px',
                  color: 'var(--red-color)',
                  onClick: async () => {
                    await Promise.resolve(
                      setSponsor({
                        id: original.id,
                        title: original.title,
                        logo: original.logo,
                        startDate: original.startDate,
                        endDate: original.endDate,
                        site: original.site,
                      })
                    );
                    deleteModal.onOpen();
                  },
                }}
              />
            </Box>
          </Flex>
        ),
      },
    ],
    [deleteModal, cuModal]
  );

  return (
    <Container>
      <LayoutContainer {...{ className: 'sl-layout-container' }}>
        <CommonTable {...{ columns, data: memoizedData, filter }} />
      </LayoutContainer>
      <DeleteModal
        {...{
          isOpen: deleteModal.isOpen,
          onClose: deleteModal.onClose,
          title: `Sterge sponsor - ${sponsor?.title}`,
          description: `Este sigur ca vrei sa stergi sponsorul ${sponsor?.title}? Toate datele asociate sponsorului vor fi sterse definitiv.`,
          onDeleteBtnClick: async () => {
            await deleteSponsor(sponsor?.id!);
          },
        }}
      />
      <SponsorsCUModal
        {...{
          isOpen: cuModal.isOpen,
          onClose: cuModal.onClose,
          title: `Editeaza sponsor - ${sponsor?.title}`,
          onSubmitHandler,
          isLoading,
          initialValues: {
            title: sponsor?.title,
            image_url: sponsor?.logo,
            date_start: Number(sponsor?.startDate),
            date_end: Number(sponsor?.endDate),
            website: sponsor?.site,
          },
        }}
      />
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
