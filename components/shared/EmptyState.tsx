import { Flex, Heading, Text } from '@chakra-ui/react';
import Image from 'next/dist/client/image';
import { IEmptyState } from './Interfaces';
import EmptyStateSVG from '../../assets/EmptyState.svg';

const EmptyState: React.FC<IEmptyState> = ({ title = 'Căutare fără rezultate', description = 'Ne pare rau dar nu există inregistrari.' }) => {
  return (
    <Flex {...{ gap: 'var(--gap-md)', alignItems: 'center', w: 'max-content' }}>
      <Image {...{ src: EmptyStateSVG, alt: 'Fara rezultate', width: 400, height: 200 }} />
      <Flex {...{ flexDirection: 'column', gap: 'var(--gap-sm)', w: 'max-content' }}>
        <Heading {...{ as: 'h2', fontSize: 'var(--heading-xs)', color: 'var(--blue-600)' }}>{title}</Heading>
        <Text {...{ fontSize: 'var(--text-md)', color: 'var(--grey-alpha-600)' }}>{description}</Text>
      </Flex>
    </Flex>
  );
};
export default EmptyState;
