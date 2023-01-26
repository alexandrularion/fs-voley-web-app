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
import { deleteSponsor, updateSponsor } from '../../services/Sponsors.service';
import SponsorsCUModal from './SponsorsCUModal';
import { toast } from 'react-toastify';
import { FormApi } from 'final-form';
import { useSponsors } from '../../context/ContextSponsors';

const SponsorsTable: React.FC<ISponsorsList> = ({ filter }) => {
  const { sponsors, setSponsors } = useSponsors();
  const deleteModal = useDisclosure();
  const cuModal = useDisclosure();
  const [sponsor, setSponsor] = useState<TSponsor>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitHandler = async (values: object, form: FormApi) => {
    const { title, logo, endDate, startDate, site } = values as TSponsor;
    setIsLoading(true);
    try {
      await updateSponsor(sponsor?.id!, { title, date_end: endDate, date_start: startDate, image_url: logo, website: site } as TBESponsor);
      setSponsors(sponsors.map(({ id, ...obj }) => (id === sponsor?.id ? { id, title, logo, endDate, startDate, site } : { ...obj, id })));
      toast('Felicitari! Sponsorul a fost actualizat cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
      cuModal.onClose();
      form.reset();
    } catch (e) {
      toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
    }
    setIsLoading(false);
  };

  const onDeleteHandler = async (sponsorId: number) => {
    setIsLoading(true);
    try {
      await deleteSponsor(sponsorId);
      setSponsors(sponsors.filter(({ id }) => id !== sponsor?.id!));
      toast('Sponsorul a fost sters cu succcess.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
      deleteModal.onClose();
    } catch (e) {
      toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
    }
    setIsLoading(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
        Cell: ({ row: { original } }: CellValue) => <> {original.id ? `#${original.id}` : ''}</>,
      },
      {
        Header: 'Logo',
        accessor: 'logo',
        Cell: ({ row: { original } }: CellValue) => (
          <Flex>
            <Image {...{ src: original.logo, width: 100, height: 100, alt: 'Logo Companie' }} />
          </Flex>
        ),
      },
      {
        Header: 'Companie',
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
        Cell: ({ row: { original } }: CellValue) => Number(original.endDate) || 'Prezent',
      },
      {
        Header: 'Actiuni',
        accessor: 'actions',
        Cell: ({ row: { original } }: CellValue) =>
          original?.id && (
            <Flex {...{ gap: 'var(--gap-md)' }}>
              <Box {...{ cursor: 'pointer ' }}>
                <PenIcon
                  {...{
                    size: '22px',
                    color: 'var(--grey-alpha-600)',
                    onClick: async () => {
                      setSponsor({
                        ...original,
                      });
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
                    onClick: () => {
                      setSponsor({
                        ...original,
                      });
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
      <LayoutContainer {...{ className: 'sl-layout-container' }}>{sponsors && sponsors.length > 0 && <CommonTable {...{ columns, data: sponsors, filter }} />}</LayoutContainer>
      <DeleteModal
        {...{
          isOpen: deleteModal.isOpen,
          onClose: deleteModal.onClose,
          title: `Sterge sponsor - ${sponsor?.title}`,
          description: `Este sigur ca vrei sa stergi sponsorul ${sponsor?.title}? Toate datele asociate sponsorului vor fi sterse definitiv.`,
          isLoading,
          onDeleteHandler,
          entityId: sponsor?.id!,
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
            ...sponsor!,
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
