import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import styled from 'styled-components';
import { ISponsorsCard } from './Interfaces';
import Image from 'next/image';

const SponsorsCard: React.FC<ISponsorsCard> = ({ title, logo, site, startDate, endDate }) => {
  return (
    <Container>
      <Flex {...{ background: 'var(--grey-alpha-50)', padding: '50px 25px', h: '220px', alignItems: 'center', justifyContent: 'center' }}>
        <Image src={logo} alt={`${title}`} width={200} height={100} />
      </Flex>
      <Box {...{ display: 'grid', gridTemplateRows: '80px max-content max-content', padding: '40px 25px', gap: 'var(--gap-xs)' }}>
        <Heading {...{ fontSize: 'var(--heading-sm)', color: 'var(--blue-600)', w: '100%' }}>{title}</Heading>
        <Link {...{ href: site, target: '_blank' }}>
          <Text {...{ fontSize: 'var(--text-lg)', color: 'var(--blue-700)' }}>{site.includes('https://') ? site.slice(8, site.length) : site.includes('http://') && site.slice(7, site.length)}</Text>
        </Link>
        <Text {...{ fontSize: 'var(--text-md)', color: 'var(--blue-700)' }}>{`${startDate} - ${Number(endDate) || 'Prezent'}`}</Text>
      </Box>
    </Container>
  );
};
export default SponsorsCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--white-color);

  img {
    height: 100%;
    width: auto;
  }
`;
