import { Flex, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import styled from 'styled-components';
import { ISponsorsCard } from './Interfaces';
import Image from 'next/image';

const SponsorsCard: React.FC<ISponsorsCard> = ({ title, logo, site, startDate, endDate }) => {
  return (
    <Container>
      <Flex {...{ background: 'var(--grey-alpha-50)', padding: '50px 25px', alignItems: 'center', justifyContent: 'center' }}>
        <Image src={logo} alt={`${title}`} width={300} height={200} />
      </Flex>
      <Flex {...{ flexDirection: 'column', padding: '40px 25px', gap: 'var(--gap-xs)' }}>
        <Heading {...{ fontSize: 'var(--heading-md)', color: 'var(--blue-600)' }}>{title}</Heading>
        <Link {...{ href: `https://${site}` }}>
          <Text {...{ fontSize: 'var(--text-lg)', color: 'var(--blue-700)' }}>{site}</Text>
        </Link>
        <Text {...{ fontSize: 'var(--text-md)', color: 'var(--blue-700)' }}>{`${startDate} - ${endDate || 'Prezent'}`}</Text>
      </Flex>
    </Container>
  );
};
export default SponsorsCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--white-color);
`;
