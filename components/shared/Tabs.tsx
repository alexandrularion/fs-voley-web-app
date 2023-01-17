import { Button, Flex } from '@chakra-ui/react';
import { ITabs } from './Interfaces';

const Tabs: React.FC<ITabs> = ({ setTab, tab, tabs }) => {
  return (
    <Flex {...{ gap: 'var(--gap-sm)' }}>
      {tabs.map(({ title, tabId, key }) => (
        <Button
          key={key}
          {...{
            onClick: () => setTab(tabId),
            variant: tab === tabId ? 'solid' : 'ghost',
            color: tab === tabId ? 'var(--black-color)' : 'var(--white-color)',
            borderRadius: '50px',
            fontWeight: 'normal',
            _hover: {
              color: 'var(--black-color)',
              background: 'var(--white-color)',
            },
          }}
        >
          {title}
        </Button>
      ))}
    </Flex>
  );
};
export default Tabs;
