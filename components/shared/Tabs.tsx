import { Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useTab } from '../../context/ContextTab';
import { ITab, ITabs } from './Interfaces';

const Tabs: React.FC<ITabs> = ({ tabs }) => {
  const { push, pathname } = useRouter();
  const { tab, setTab } = useTab();

  return (
    <Flex {...{ gap: 'var(--gap-sm)' }}>
      {tabs.map(({ title, tabId, key, href, value }: ITab) => (
        <Button
          key={key}
          {...{
            onClick: () => {
              if (href) {
                push(href);
              } else {
                setTab && setTab({ title, tabId, href, value });
              }
            },
            variant: tab?.tabId === tabId || href === pathname ? 'solid' : 'ghost',
            color: tab?.tabId === tabId || href === pathname ? 'var(--black-color)' : 'var(--white-color)',
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
