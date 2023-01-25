import React, { useMemo } from 'react';
import styled from 'styled-components';
import Logo from '../../assets/Logo.png';
import Image from 'next/image';
import { authRoutes, navigationRoutes, userRoutes, adminRoutes } from '../../constants/Navigation';
import { IUrl } from './Interfaces';
import Link from 'next/link';
import { nanoid } from 'nanoid';
import { Avatar, Box, Button, Flex, Heading, IconButton, Menu, Text } from '@chakra-ui/react';
import { MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/menu';
import { ArrowDownIcon, MenuIcon } from '../../styles/Icons';
import { useRouter } from 'next/router';
import { device } from './DevicesBreakpoints';
import { signOut, useSession } from 'next-auth/react';
import { getRoleNameByRoleId } from '../../utils';

const Navigation = () => {
  const urls: IUrl[] = useMemo(() => Object.values(navigationRoutes).map((link) => ({ ...link, key: nanoid() })), []);
  const menuRoutes: IUrl[] = useMemo(() => Object.values(adminRoutes).map((link) => ({ ...link, key: nanoid() })), []);
  const { pathname } = useRouter();
  const { data, status } = useSession();

  return (
    <Container {...{ id: 'nav' }}>
      <div {...{ className: 'n-container' }}>
        <Flex {...{ alignItems: 'center', gap: 'var(--gap-xs)' }}>
          <Image src={Logo} alt={'C.S.M Suceava'} />
          <Heading {...{ fontSize: 'var(--heading-xs)', color: 'var(--blue-600)' }}>{'C.S.M Suceava'}</Heading>
        </Flex>
        <div {...{ className: 'n-urls-container' }}>
          {urls.slice(0, urls.length - 2).map(({ title, url, key }, index) => (
            <Link key={key} {...{ href: url }}>
              <Flex {...{ alignItems: 'center', gap: 'var(--gap-xs)', className: 'n-link-container' }}>
                {(pathname.localeCompare(url) === 0 || (index !== 0 && pathname.localeCompare(url) === 0)) && (
                  <Box
                    {...{
                      w: '10px',
                      h: '10px',
                      borderRadius: '50px',
                      bg: pathname.localeCompare(url) === 0 || (index !== 0 && pathname.localeCompare(url) === 0) ? 'var(--blue-400)' : 'var(--blue-600)',
                      transition: '0.2s all ease-in-out',
                    }}
                  />
                )}
                <Text
                  {...{
                    color: pathname.localeCompare(url) === 0 || (index !== 0 && pathname.localeCompare(url) === 0) ? 'var(--blue-400)' : 'var(--blue-600)',
                    fontWeight: pathname.localeCompare(url) === 0 || (index !== 0 && pathname.localeCompare(url) === 0) ? 'bold' : 'normal',
                    fontSize: 'var(--text-l)',
                    transition: '0.2s all ease-in-out',
                    textTransform: 'uppercase',
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
                  fontWeight: pathname.localeCompare(urls[urls.length - 2].url) === 0 || pathname.localeCompare(urls[urls.length - 1].url) === 0 ? 'bold' : 'normal',
                  padding: 0,
                }}
              >
                ALTELE
              </MenuButton>
              <MenuList {...{ borderColor: 'var(--grey-alpha-100)', padding: '0' }}>
                <MenuItem>
                  <Link {...{ href: urls[urls.length - 2].url }}>
                    <Flex {...{ alignItems: 'center', gap: 'var(--gap-xs)', className: 'n-link-container' }}>
                      {pathname.localeCompare(urls[urls.length - 2].url) === 0 && (
                        <Box {...{ w: '10px', h: '10px', borderRadius: '50px', bg: 'var(--blue-600)', transition: '0.2s all ease-in-out' }} />
                      )}
                      <Text
                        {...{
                          color: 'var(--blue-600)',
                          fontWeight: pathname.localeCompare(urls[urls.length - 2].url) === 0 ? 'bold' : 'normal',
                          _hover: { color: 'var(--blue-400)' },
                          transition: '0.2s all ease-in-out',
                          textTransform: 'uppercase',
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
                      {pathname.localeCompare(urls[urls.length - 1].url) === 0 && (
                        <Box {...{ w: '10px', h: '10px', borderRadius: '50px', bg: 'var(--blue-600)', transition: '0.2s all ease-in-out' }} />
                      )}
                      <Text
                        {...{
                          color: 'var(--blue-600)',
                          fontWeight: pathname.localeCompare(urls[urls.length - 1].url) === 0 ? 'bold' : 'normal',
                          _hover: { color: 'var(--blue-400)' },
                          transition: '0.2s all ease-in-out',
                          textTransform: 'uppercase',
                        }}
                      >
                        {urls[urls.length - 1].title}
                      </Text>
                    </Flex>
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
            <Box {...{ borderLeft: '2px solid var(--blue-600)', h: '30px', borderRadius: '5px', m: '0 15px' }} />
            {status === 'authenticated' ? (
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
                    fontWeight: pathname.localeCompare(urls[urls.length - 2].url) === 0 || pathname.localeCompare(urls[urls.length - 1].url) === 0 ? 'bold' : 'normal',
                    padding: 0,
                  }}
                >
                  <Flex {...{ alignItems: 'center', gap: 'var(--gap-sm)' }}>
                    <Avatar {...{ name: data?.name || 'Alex', size: 'md', mb: '3px' }} />
                    <Flex {...{ flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Text {...{ fontWeight: 'bold', color: 'var(--blue-500)' }}>{data?.name}</Text>
                      <Text {...{ fontSize: 'var(--text-xs)', color: 'var(--grey-alpha-600)', fontWeight: '400' }}>{getRoleNameByRoleId(data?.role)}</Text>
                    </Flex>
                  </Flex>
                </MenuButton>
                <MenuList {...{ borderColor: 'var(--grey-alpha-100)', padding: '0', position: 'relative', zIndex: '200' }}>
                  <MenuGroup title="Gestionare">
                    {menuRoutes?.map(({ key, title, url }) => (
                      <Link key={key} {...{ href: url }}>
                        <MenuItem>
                          <Flex {...{ alignItems: 'center', gap: 'var(--gap-xs)', className: 'n-link-container' }}>
                            {pathname.localeCompare(url) === 0 && (
                              <Box
                                {...{
                                  w: '10px',
                                  h: '10px',
                                  borderRadius: '50px',
                                  bg: pathname.localeCompare(url) === 0 ? 'var(--blue-400)' : 'var(--grey-alpha-700)',
                                  transition: '0.2s all ease-in-out',
                                }}
                              />
                            )}
                            <Text
                              {...{
                                color: pathname.localeCompare(url) === 0 ? 'var(--blue-400)' : 'var(--grey-alpha-700)',
                                fontWeight: pathname.localeCompare(url) === 0 ? 'bold' : 'normal',
                                _hover: { color: 'var(--blue-400)' },
                                transition: '0.2s all ease-in-out',
                              }}
                            >
                              {title}
                            </Text>
                          </Flex>
                        </MenuItem>
                      </Link>
                    ))}
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="Cont">
                    <MenuItem>
                      <Link {...{ href: userRoutes.settings.url }}>
                        <Flex {...{ alignItems: 'center', gap: 'var(--gap-xs)', className: 'n-link-container' }}>
                          {pathname.includes(userRoutes.settings.url) && <Box {...{ w: '10px', h: '10px', borderRadius: '50px', bg: 'var(--blue-600)', transition: '0.2s all ease-in-out' }} />}
                          <Text
                            {...{
                              color: pathname.includes(userRoutes.settings.url) ? 'var(--blue-600)' : 'var(--grey-alpha-700)',
                              fontWeight: pathname.includes(userRoutes.settings.url) ? 'bold' : 'normal',
                              _hover: { color: 'var(--blue-400)' },
                              transition: '0.2s all ease-in-out',
                            }}
                          >
                            {userRoutes.settings.title}
                          </Text>
                        </Flex>
                      </Link>
                    </MenuItem>
                    <MenuItem {...{ onClick: () => signOut() }}>
                      <Flex {...{ alignItems: 'center', gap: 'var(--gap-xs)' }}>
                        <Text
                          {...{
                            color: 'var(--red-color)',
                            _hover: {
                              color: '#ff0000',
                            },
                            transition: '0.2s all ease-in-out',
                          }}
                        >
                          {'Iesiți din cont'}
                        </Text>
                      </Flex>
                    </MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            ) : status === 'unauthenticated' ? (
              <Link {...{ href: authRoutes.signIn.url }}>
                <Flex {...{ alignItems: 'center', gap: 'var(--gap-xs)', className: 'n-link-container' }}>
                  {pathname.includes(authRoutes.signIn.url) && <Box {...{ w: '10px', h: '10px', borderRadius: '50px', bg: 'var(--blue-600)', transition: '0.2s all ease-in-out' }} />}
                  <Text {...{ color: 'var(--blue-600)', fontSize: 'var(--text-l)', transition: '0.2s all ease-in-out', textTransform: 'uppercase' }}>{authRoutes.signIn.title}</Text>
                </Flex>
              </Link>
            ) : (
              <></>
            )}
          </Flex>
        </div>
        <Menu>
          <MenuButton {...{ as: IconButton, ['aria-label']: 'Options', icon: <MenuIcon size={'24px'} />, variant: 'outline', className: 'n-mobile-container' }} />
          <MenuList {...{ padding: '0' }}>
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
                        textTransform: 'uppercase',
                      }}
                    >
                      {title}
                    </Text>
                  </Flex>
                </MenuItem>
              </Link>
            ))}
            <Link {...{ href: authRoutes.signIn.url }}>
              <MenuItem>
                <Flex {...{ alignItems: 'center', gap: 'var(--gap-xs)', className: 'n-link-container' }}>
                  {pathname.includes(authRoutes.signIn.url) && <Box {...{ w: '10px', h: '10px', borderRadius: '50px', bg: 'var(--blue-600)', transition: '0.2s all ease-in-out' }} />}
                  <Text {...{ color: 'var(--blue-600)', fontSize: 'var(--text-l)', transition: '0.2s all ease-in-out', textTransform: 'uppercase' }}>{authRoutes.signIn.title}</Text>
                </Flex>
              </MenuItem>
            </Link>
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
  position: relative;
  z-index: var(--z-index-6);
  background-color: var(--white-color);

  .n-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    @media ${device.mobile} {
      width: 85vw;
    }
  }
`;
