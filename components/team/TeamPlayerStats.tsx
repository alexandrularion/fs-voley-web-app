import { Flex, Heading, Text } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import styled from 'styled-components';
import { ITeamPlayerStats } from './Interfaces';

const TeamPlayerStats: React.FC<ITeamPlayerStats> = ({ data: { name, surName, position, nationality, birthday, height } }) => {
  const playerStats = useMemo(
    () =>
      [
        {
          title: 'Nume',
          description: name,
        },
        {
          title: 'Prenume',
          description: surName,
        },
        {
          title: 'Post',
          description: position,
        },
        {
          title: 'Nationalitate',
          description: nationality,
        },
        {
          title: 'Data Nasterii',
          description: new Date(birthday).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' }),
        },
        {
          title: 'Inaltime',
          description: `${height}CM`,
        },
      ].map((obj) => ({ ...obj, key: nanoid() })),
    [name, surName, position, nationality, birthday, height]
  );
  return (
    <Container>
      {playerStats?.map(({ title, description, key }) => (
        <Flex key={key} {...{ flexDirection: 'column', gap: 'var(--gap-sm)' }}>
          <Text {...{ color: 'var(--black-color)', fontSize: 'var(--text-md)' }}>{title}</Text>
          <Heading {...{ color: 'var(--blue-600)', fontSize: 'var(--text-lg)', textTransform: 'uppercase' }}>{description}</Heading>
        </Flex>
      ))}
    </Container>
  );
};
export default TeamPlayerStats;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: var(--gap-md);
`;
