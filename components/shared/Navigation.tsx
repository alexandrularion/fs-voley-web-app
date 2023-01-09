import React, { useMemo } from 'react';
import styled from 'styled-components';
import Logo from '../../assets/Logo.png';
import Image from 'next/image';
import { authUrls, navigationUrls } from '../../constants/Navigation';
import { IUrl } from './Interfaces';
import Link from 'next/link';
import { nanoid } from 'nanoid';
import { Box, Button, Flex, IconButton, Menu, Text } from '@chakra-ui/react';
import { MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { ArrowDownIcon, MenuIcon } from '../../styles/Icons';
import { useRouter } from 'next/router';
import { device } from './DevicesBreakpoints';

const Navigation = () => {
  const urls: IUrl[] = useMemo(() => navigationUrls.map((link) => ({ ...link, key: nanoid() })), []);
  const { pathname } = useRouter();

  return (
    <Container>
      <div {...{ className: 'n-container' }}>
        <Image src={Logo} alt={'C.S.M Suceava'} />
        <div {...{ className: 'n-urls-container' }}>
          {urls.slice(0, urls.length - 2).map(({ title, url, key }, index) => (
            <Link key={key} {...{ href: url }}>
              <Flex {...{ alignItems: 'center', gap: 'var(--gap-xs)', className: 'n-link-container' }}>
                {(pathname.localeCompare(url) === 0 || (index !== 0 && pathname.includes(url))) && (
                  <Box {...{ w: '10px', h: '10px', borderRadius: '50px', bg: 'var(--blue-600)', transition: '0.2s all ease-in-out' }} />
                )}
                <Text
                  {...{
                    color: 'var(--blue-600)',
                    fontWeight: pathname.localeCompare(url) === 0 || (index !== 0 && pathname.includes(url)) ? 'bold' : 'normal',
                    fontSize: 'var(--text-l)',
                    transition: '0.2s all ease-in-out',
                  }}
                >
                  {title}
                </Text>
              </Flex>
            </Link>
          ))}
          <Flex {...{ alignItems: 'center', gap: 'var(--gap-sm)' }}>
            <Menu>
              <MenuButton
                {...{
                  as: Button,
                  rightIcon: <ArrowDownIcon {...{ color: 'var(--blue-600)' }} />,
                  bg: 'none',
                  _hover: { background: 'none' },
                  _active: { background: 'none' },
                  textColor: 'var(--blue-600)',
                  fontSize: 'var(--text-l)',
                  fontWeight: pathname.includes(urls[urls.length - 2].url) || pathname.includes(urls[urls.length - 1].url) ? 'bold' : 'normal',
                  padding: 0,
                }}
              >
                ALTELE
              </MenuButton>
              <MenuList {...{ borderColor: 'var(--grey-alpha-100)', borderRadius: '0', padding: '0' }}>
                <MenuItem>
                  <Link {...{ href: urls[urls.length - 2].url }}>
                    <Flex {...{ alignItems: 'center', gap: 'var(--gap-xs)', className: 'n-link-container' }}>
                      {pathname.includes(urls[urls.length - 2].url) && <Box {...{ w: '10px', h: '10px', borderRadius: '50px', bg: 'var(--blue-600)', transition: '0.2s all ease-in-out' }} />}
                      <Text
                        {...{
                          color: 'var(--blue-600)',
                          fontWeight: pathname.includes(urls[urls.length - 2].url) ? 'bold' : 'normal',
                          _hover: { color: 'var(--blue-400)' },
                          transition: '0.2s all ease-in-out',
                        }}
                      >
                        {urls[urls.length - 2].title}
                      </Text>
                    </Flex>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link {...{ href: urls[urls.length - 1].url }}>
                    <Flex {...{ alignItems: 'center', gap: 'var(--gap-xs)', className: 'n-link-container' }}>
                      {pathname.includes(urls[urls.length - 1].url) && <Box {...{ w: '10px', h: '10px', borderRadius: '50px', bg: 'var(--blue-600)', transition: '0.2s all ease-in-out' }} />}
                      <Text
                        {...{
                          color: 'var(--blue-600)',
                          fontWeight: pathname.includes(urls[urls.length - 1].url) ? 'bold' : 'normal',
                          _hover: { color: 'var(--blue-400)' },
                          transition: '0.2s all ease-in-out',
                        }}
                      >
                        {urls[urls.length - 1].title}
                      </Text>
                    </Flex>
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
            <Box {...{ borderLeft: '2px solid var(--blue-600)', h: '30px', borderRadius: '5px' }} />
            <Link {...{ href: authUrls.signIn.url }}>
              <Flex {...{ alignItems: 'center', gap: 'var(--gap-xs)', className: 'n-link-container' }}>
                {pathname.includes(authUrls.signIn.url) && <Box {...{ w: '10px', h: '10px', borderRadius: '50px', bg: 'var(--blue-600)', transition: '0.2s all ease-in-out' }} />}
                <Text {...{ color: 'var(--blue-600)', fontSize: 'var(--text-l)', transition: '0.2s all ease-in-out' }}>{authUrls.signIn.title}</Text>
              </Flex>
            </Link>
          </Flex>
        </div>
        <Menu>
          <MenuButton {...{ as: IconButton, ['aria-label']: 'Options', icon: <MenuIcon />, variant: 'outline', className: 'n-mobile-container' }} />
          <MenuList {...{ padding: '0', borderRadius: '0' }}>
            {urls.map(({ title, url, key }, index) => (
              <Link key={key} {...{ href: url }}>
                <MenuItem>
                  <Flex {...{ alignItems: 'center', gap: 'var(--gap-xs)', className: 'n-link-container' }}>
                    {(pathname.localeCompare(url) === 0 || (index !== 0 && pathname.includes(url))) && (
                      <Box {...{ w: '10px', h: '10px', borderRadius: '50px', bg: 'var(--blue-600)', transition: '0.2s all ease-in-out' }} />
                    )}
                    <Text
                      {...{
                        color: 'var(--blue-600)',
                        fontWeight: pathname.localeCompare(url) === 0 || (index !== 0 && pathname.includes(url)) ? 'bold' : 'normal',
                        fontSize: 'var(--text-s)',
                        transition: '0.2s all ease-in-out',
                      }}
                    >
                      {title}
                    </Text>
                  </Flex>
                </MenuItem>
              </Link>
            ))}
          </MenuList>
        </Menu>
      </div>
    </Container>
  );
};
export default Navigation;

const Container = styled.section`
  display: flex;
  justify-content: center;

  .n-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    width: 1300px;
    padding: 20px 0;

    .n-urls-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--gap-lg);

      .n-link-container:hover {
        p {
          color: var(--blue-400);
        }
        div {
          background: var(--blue-400);
        }
      }

      @media ${device.tablet} {
        display: none;
      }
    }
    .n-mobile-container {
      display: none;

      @media ${device.tablet} {
        display: flex;
      }
    }

    img {
      width: 90px;
      height: 90px;

      @media ${device.tablet} {
        width: 70px;
        height: 70px;
      }
      @media ${device.mobile} {
        width: 55px;
        height: 55px;
      }
    }

    @media ${device.smallLaptop}, ${device.tablet} {
      width: 90vw;
    }
  }
`;
