import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { IEmptyState } from './Interfaces';
import EmptyStateSVG from '../../assets/EmptyState.svg';
import Image from 'next/image';

const EmptyState: React.FC<IEmptyState> = ({ title = 'Căutare fără rezultate', description = 'Ne pare rau dar nu există inregistrari.' }) => {
  return (
    <Box
      {...{
        display: 'flex',
        w: '100%',
        gap: 'var(--gap-md)',
        bg: 'var(--white-color)',
        h: ['max-content', '330px'],
        padding: ['20px', '0'],
        borderRadius: '15px',
      }}
    >
      <Flex {...{ gap: 'var(--gap-md)', alignItems: 'center', w: 'max-content', flexDirection: ['column', 'row'] }}>
        <Image {...{ src: EmptyStateSVG, alt: 'Fara rezultate', width: 320, height: 200 }} />
        <Flex {...{ flexDirection: 'column', gap: 'var(--gap-xs)', w: 'max-content' }}>
          <Heading {...{ as: 'h2', fontSize: ['lg', '2xl'], color: 'var(--blue-600)' }}>{title}</Heading>
          <Text {...{ color: 'var(--grey-alpha-600)', fontSize: ['md', 'xl'] }}>{description}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};
export default EmptyState;
