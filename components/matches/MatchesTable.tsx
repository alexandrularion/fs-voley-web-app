import styled from 'styled-components';
import { LayoutContainer } from '../shared/Layout';
import { useMemo, useState } from 'react';
import { CellValue } from 'react-table';
import CommonTable from '../shared/Table';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { PenIcon, TrashIcon } from '../../styles/Icons';
import DeleteModal from '../shared/DeleteModal';
import { FormApi } from 'final-form';
import { TBEMatch, TMatch } from './Interfaces';
import { useMatches } from '../../context/ContextMatch';
import { deleteMatch, updateMatch } from '../../services/Match.service';
import { toast } from 'react-toastify';
import EmptyState from '../shared/EmptyState';
import MatchesMatchCUModal from './MatchesMatchCUModal';

const MatchesTable: React.FC = () => {
  const { matches, setMatches } = useMatches();
  const deleteModal = useDisclosure();
  const cuModal = useDisclosure();
  const [match, setMatch] = useState<TMatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmitHandler = async (values: object, form: FormApi) => {
    const { dateTime, link, editionId, championshipId, clubOneId, clubTwoId } = values as TMatch;
    setIsLoading(true);
    try {
      await updateMatch(match?.id!, { dateTime, link, editionId, championshipId, club_firstId: clubOneId, club_secondId: clubTwoId } as TBEMatch);
      setMatches(matches.map(({ id, ...obj }) => (id === match?.id ? { id, dateTime, link, editionId, championshipId, clubOneId, clubTwoId, createdAt: new Date().toString() } : { ...obj, id })));
      toast('Felicitari! Meciul a fost actualizat cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
      cuModal.onClose();
      form.reset();
    } catch (e) {
      toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
    }
    setIsLoading(false);
  };

  const onDeleteHandler = async (matchId: number) => {
    setIsLoading(true);
    try {
      await deleteMatch(matchId);
      setMatches(matches.filter(({ id }) => id !== matchId));
      toast('Meciul a fost sters cu succcess.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
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
        Header: 'Data si Ora',
        accessor: 'dateTime',
        Cell: ({ row: { original } }: CellValue) => new Date(original.dateTime).toLocaleDateString('ro-RO', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
      },
      {
        Header: 'Link live',
        accessor: 'link',
        Cell: ({ row: { original } }: CellValue) => original.link,
      },
      {
        Header: 'Creat La',
        accessor: 'createdAt',
        Cell: ({ row: { original } }: CellValue) => original.createdAt,
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
                      setMatch({
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
                      setMatch({
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
      <LayoutContainer {...{ className: 'sl-layout-container' }}>
        {matches && matches.length > 0 ? <CommonTable {...{ columns, data: matches }} /> : <EmptyState {...{ title: 'Uuups.' }} />}
      </LayoutContainer>
      <DeleteModal
        {...{
          isOpen: deleteModal.isOpen,
          onClose: deleteModal.onClose,
          title: `Sterge meci`,
          description: `Este sigur ca vrei sa stergi meciul? Toate datele asociate meciului vor fi sterse definitiv.`,
          isLoading,
          onDeleteHandler,
          entityId: match?.id!,
        }}
      />
      <MatchesMatchCUModal
        {...{
          isOpen: cuModal.isOpen,
          onClose: cuModal.onClose,
          title: `Editeaza meci`,
          onSubmitHandler,
          isLoading,
          initialValues: {
            ...match!,
          },
        }}
      />
    </Container>
  );
};

export default MatchesTable;

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
