import { Flex, Heading, Text } from '@chakra-ui/react';
import { SearchIcon } from '../../styles/Icons';
import { IEmptyState } from './Interfaces';

const EmptyState: React.FC<IEmptyState> = ({ title = 'Cautare', description = 'Ne pare rau dar nu exista inregistrari.' }) => {
  return (
    <Flex {...{ gap: 'var(--gap-md)' }}>
      <SearchIcon {...{ size: '60px', color: 'var(--blue-600)' }} />
      <Flex {...{ flexDirection: 'column', gap: 'var(--gap-sm)' }}>
        <Heading {...{ as: 'h2', size: 'var(--heading-xs)', color: 'var(--blue-600)' }}>{title}</Heading>
        <Text {...{ size: 'var(--text-sm)', color: 'var(--grey-alpha-600)' }}>{description}</Text>
      </Flex>
    </Flex>
  );
};
export default EmptyState;
