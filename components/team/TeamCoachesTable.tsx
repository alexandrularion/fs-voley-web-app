import styled from 'styled-components';
import { LayoutContainer } from '../shared/Layout';
import { useMemo, useState } from 'react';
import { CellValue } from 'react-table';
import CommonTable from '../shared/Table';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { EyeIcon, PenIcon, TrashIcon } from '../../styles/Icons';
import DeleteModal from '../shared/DeleteModal';
import { toast } from 'react-toastify';
import { FormApi } from 'final-form';
import { TBETeamCoach, TTeamCoach } from './Interfaces';
import { deleteCoach, updateCoach } from '../../services/Team.service';
import Image from 'next/image';
import EmptyState from '../shared/EmptyState';
import ImageModal from '../shared/ImageModal';
import { useTeamCoaches } from '../../context/ContextTeamCoaches';
import TeamCoachCUModal from './TeamCoachCUModal';
import TeamCommonDModal from './TeamCommonDModal';

const TeamCoachesTable: React.FC = () => {
  const { teamCoaches, setTeamCoaches } = useTeamCoaches();
  const deleteModal = useDisclosure();
  const dModal = useDisclosure();
  const cuModal = useDisclosure();
  const iModal = useDisclosure();
  const [teamCoach, setTeamCoach] = useState<TTeamCoach>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitHandler = async (values: object, form: FormApi) => {
    const { name, surName, description, image } = values as TTeamCoach;
    setIsLoading(true);
    try {
      await updateCoach(teamCoach?.id!, { first_name: name, last_name: surName, description, image } as TBETeamCoach);
      setTeamCoaches(teamCoaches.map(({ id, ...obj }) => (id === teamCoach?.id ? { id, name, surName, description, image } : { ...obj, id })));
      toast('Felicitari! Antrenorul a fost actualizat cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
      cuModal.onClose();
      form.reset();
    } catch (e) {
      toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
    }
    setIsLoading(false);
  };

  const onDeleteHandler = async (coachId: number) => {
    setIsLoading(true);
    try {
      await deleteCoach(coachId);
      setTeamCoaches(teamCoaches.filter(({ id }) => id !== coachId));
      toast('Antrenorul a fost sters cu succes.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
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
        Header: 'Profil',
        accessor: 'image',
        Cell: ({ row: { original } }: CellValue) => (
          <Flex
            {...{
              cursor: 'pointer',
              gap: 'var(--gap-xs)',
              alignItems: 'center',
              onClick: async () => {
                setTeamCoach(original);
                iModal.onOpen();
              },
            }}
          >
            <Image {...{ src: original.image, width: 100, height: 100, alt: 'Fotografie de profil' }} />
          </Flex>
        ),
      },
      {
        Header: 'Nume',
        accessor: 'name',
        Cell: ({ row: { original } }: CellValue) => original.name,
      },
      {
        Header: 'Prenume',
        accessor: 'surName',
        Cell: ({ row: { original } }: CellValue) => original.surName,
      },
      {
        Header: 'Biografie',
        accessor: 'description',
        Cell: ({ row: { original } }: CellValue) => (
          <Flex
            {...{
              cursor: 'pointer',
              gap: 'var(--gap-xs)',
              alignItems: 'center',
              onClick: async () => {
                setTeamCoach(original);
                dModal.onOpen();
              },
            }}
          >
            <EyeIcon
              {...{
                size: '20px',
                color: 'var(--grey-alpha-600)',
              }}
            />
            Vezi Biografie
          </Flex>
        ),
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
                      setTeamCoach(original);
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
                      setTeamCoach(original);
                      deleteModal.onOpen();
                    },
                  }}
                />
              </Box>
            </Flex>
          ),
      },
    ],
    [deleteModal, cuModal, dModal, iModal]
  );

  return (
    <Container>
      <LayoutContainer {...{ className: 'sl-layout-container' }}>
        {teamCoaches && teamCoaches.length > 0 ? <CommonTable {...{ columns, data: teamCoaches }} /> : <EmptyState {...{ title: 'Uuups.' }} />}
      </LayoutContainer>
      <DeleteModal
        {...{
          isOpen: deleteModal.isOpen,
          onClose: deleteModal.onClose,
          title: `Sterge Antrenor - ${teamCoach?.name} ${teamCoach?.surName}`,
          description: `Este sigur ca vrei sa stergi antrenorul ${teamCoach?.name}? Toate datele asociate antrenorului vor fi sterse definitiv.`,
          isLoading,
          onDeleteHandler,
          entityId: teamCoach?.id!,
        }}
      />
      <TeamCoachCUModal
        {...{
          isOpen: cuModal.isOpen,
          onClose: cuModal.onClose,
          title: `Editeaza Antrenor - ${teamCoach?.name} ${teamCoach?.surName}`,
          onSubmitHandler,
          isLoading,
          initialValues: { ...teamCoach! } as TTeamCoach,
        }}
      />
      <TeamCommonDModal
        {...{
          isOpen: dModal.isOpen,
          onClose: dModal.onClose,
          title: `Biografie - ${teamCoach?.name} ${teamCoach?.surName}`,
          description: teamCoach?.description!,
        }}
      />
      <ImageModal
        {...{
          isOpen: iModal.isOpen,
          onClose: iModal.onClose,
          title: `Vizualiare imagine profil - ${teamCoach?.name} ${teamCoach?.surName}`,
          image: teamCoach?.image!,
          createdAt: '',
        }}
      />
    </Container>
  );
};

export default TeamCoachesTable;

const Container = styled.section`
  display: flex;
  justify-content: center;

  .sl-layout-container {
    display: flex;
    position: relative;
    top: -110px;
    gap: var(--gap-lg);
  }
`;
