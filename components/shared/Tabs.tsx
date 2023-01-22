import { Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ITabs } from './Interfaces';

const Tabs: React.FC<ITabs> = ({ setTab, tab, tabs }) => {
  const { push, pathname } = useRouter();

  return (
    <Flex {...{ gap: 'var(--gap-sm)' }}>
      {tabs.map(({ title, tabId, key, href }) => (
        <Button
          key={key}
          {...{
            onClick: () => {
              if (href) {
                push(href);
              } else {
                setTab && setTab(tabId);
              }
            },
            variant: tab === tabId || href === pathname ? 'solid' : 'ghost',
            color: tab === tabId || href === pathname ? 'var(--black-color)' : 'var(--white-color)',
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
