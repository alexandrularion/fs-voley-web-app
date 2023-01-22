import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { IMatchesCard } from './Interfaces';

const MatchesCard: React.FC<IMatchesCard> = ({ date, edition, championship, location, league, teams, link }) => {
  return (
    <Container>
      <Box {...{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 'var(--gap-lg)' }}>
        <Heading {...{ color: 'var(--grey-alpha-500)', fontSize: 'var(--text-xs)', fontWeight: 'bold' }}>
          {new Date(date).toLocaleDateString('ro-Ro', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}
        </Heading>
        <Text {...{ color: 'var(--grey-alpha-500)', fontSize: 'var(--text-xs)' }}>{`${league} x Editia ${edition} x ${championship} x ${location}`}</Text>
      </Box>
      <Flex {...{ gap: 'var(--gap-md)', padding: '0 var(--gap-xl)' }}>
        <Flex {...{ gap: 'var(--gap-md)', alignItems: 'center' }}>
          <Heading {...{ as: 'h2', fontSize: 'var(--text-md)', color: 'var(--blue-500)' }}> {teams[0].name}</Heading>
          <Image {...{ src: teams[0].logo, alt: `${teams[0].name}`, width: 90, height: 90 }} />
        </Flex>
        <Flex {...{ border: '1px solid var(--grey-alpha-500)', padding: '0 var(--gap-sm)', alignItems: 'center', justifyContent: 'center' }}>
          <Heading {...{ as: 'h2', color: 'var(--blue-500)' }}>{new Date(date).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}</Heading>
        </Flex>
        <Flex {...{ gap: 'var(--gap-md)', alignItems: 'center' }}>
          <Image {...{ src: teams[1].logo, alt: `${teams[1].name}`, width: 90, height: 90 }} />
          <Heading {...{ as: 'h2', fontSize: 'var(--text-md)', color: 'var(--blue-500)' }}> {teams[1].name}</Heading>
        </Flex>
      </Flex>
      <Link {...{ href: link, target: '_blank' }}>
        <Button {...{ borderRadius: 'none', background: 'var(--blue-400)', color: 'var(--white-color)', w: '100%', _hover: { background: 'var(--blue-300)' } }}>{'Vezi meciul live'}</Button>
      </Link>
    </Container>
  );
};
export default MatchesCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white-color);
  transition: 0.2s all ease-in-out;
  position: relative;
  overflow: hidden;
  gap: var(--gap-xl);

  img {
    width: 60px;
    height: auto;
  }
  a {
    width: 100%;
  }
`;
