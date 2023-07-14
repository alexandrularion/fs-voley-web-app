import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { IMatchesCard } from './Interfaces';

const MatchesCard: React.FC<IMatchesCard> = ({ match: { dateTime, championship, clubFirst, clubSecond, link, location, edition, scoreClubOne, scoreClubTwo }, isUsedOnHomePage = false }) => {
  return (
    <Container {...{ isUsedOnHomePage }}>
      <Box {...{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 'var(--gap-lg)' }}>
        <Heading {...{ color: 'var(--grey-alpha-500)', fontSize: 'var(--text-xs)', fontWeight: '400' }}>
          {new Date(dateTime).toLocaleDateString('ro-Ro', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}
        </Heading>
        <Flex {...{ gap: '5px', color: 'var(--grey-alpha-500)', fontSize: 'var(--text-xs)' }}>
          <Text {...{ fontWeight: 'bold' }}>{championship?.title}</Text>
          {'x'}
          <Text {...{ fontWeight: 'bold' }}>{location}</Text>
          {'x'}
          <Text {...{ fontWeight: 'bold' }}>{`Editia ${edition?.title}`}</Text>
        </Flex>
      </Box>
      <Flex {...{ gap: 'var(--gap-md)', padding: '0 var(--gap-xl)' }}>
        <Flex {...{ gap: 'var(--gap-md)', alignItems: 'center' }}>
          <Heading {...{ as: 'h2', fontSize: 'var(--text-md)', color: 'var(--blue-500)' }}> {clubFirst?.title}</Heading>
          <Image {...{ src: clubFirst?.image!, alt: `${clubFirst?.title}`, width: 90, height: 90 }} />
        </Flex>
        <Flex {...{ border: '1px solid var(--grey-alpha-500)', padding: '0 var(--gap-sm)', alignItems: 'center', justifyContent: 'center' }}>
          <Heading {...{ as: 'h2', color: 'var(--blue-500)' }}>
            {scoreClubOne === null || scoreClubTwo === null ? new Date(dateTime).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' }) : `${scoreClubOne} - ${scoreClubTwo}`}
          </Heading>
        </Flex>
        <Flex {...{ gap: 'var(--gap-md)', alignItems: 'center' }}>
          <Image {...{ src: clubSecond?.image!, alt: `${clubSecond?.title}`, width: 90, height: 90 }} />
          <Heading {...{ as: 'h2', fontSize: 'var(--text-md)', color: 'var(--blue-500)' }}> {clubSecond?.title}</Heading>
        </Flex>
      </Flex>
      <Link {...{ href: link ? link : '', target: '_blank' }}>
        <Button {...{ borderRadius: 'none', background: 'var(--blue-400)', color: 'var(--white-color)', w: '100%', _hover: { background: 'var(--blue-300)' } }}>{'Vezi meciul live'}</Button>
      </Link>
    </Container>
  );
};
export default MatchesCard;

const Container = styled.div<{ isUsedOnHomePage: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white-color);
  transition: 0.2s all ease-in-out;
  position: relative;
  overflow: hidden;
  gap: var(--gap-xl);
  border: ${({ isUsedOnHomePage }) => (isUsedOnHomePage ? '1px solid var(--grey-alpha-100)' : '')};

  img {
    width: 60px;
    height: auto;
  }
  a {
    width: 100%;
  }
`;
