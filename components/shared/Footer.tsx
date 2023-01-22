import React from 'react';
import styled from 'styled-components';
import { device } from './DevicesBreakpoints';
import Logo from '../../assets/Logo.png';
import Image from 'next/image';
import { Box, Flex, Text } from '@chakra-ui/react';
import { footerData, footerSocialMediaData } from '../../constants/Footer';
import { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { IUrl } from './Interfaces';
import Link from 'next/link';
import { navigationUrls } from '../../constants/Navigation';
import { useRouter } from 'next/router';
import { ArrowUpIcon } from '../../styles/Icons';

const Footer = () => {
  const urls: IUrl[] = useMemo(() => navigationUrls.map((link) => ({ ...link, key: nanoid() })), []);
  const socialMediaUrls: IUrl[] = useMemo(() => footerSocialMediaData.map((link) => ({ ...link, key: nanoid() })), []);
  const { pathname } = useRouter();
  const { address, email, telephone, rightsMessage } = footerData;
  return (
    <Container>
      <div {...{ className: 'f-container' }}>
        <Flex {...{ gap: 'var(--gap-xl)', w: '100%', className: 'f-info' }}>
          <Image src={Logo} alt={'C.S.M Suceava'} />
          <Flex {...{ flexDirection: 'column', justifyContent: 'space-between', height: '100%', gap: 'var(--gap-xl)' }}>
            <Text {...{ fontSize: 'var(--text-lg)', width: '300px', color: 'var(--black-color)', className: 'f-address' }}>{address}</Text>
            <Flex {...{ flexDirection: 'column', gap: '5px' }}>
              <Text {...{ fontSize: 'var(--text-xs)', color: 'var(--grey-alpha-900)' }}>{telephone}</Text>
              <Text {...{ fontSize: 'var(--text-xs)', color: 'var(--grey-alpha-900)' }}>{email}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex {...{ flexDirection: 'column', gap: '50px', className: 'f-nav' }}>
          <Flex {...{ gap: 'calc( var(--gap-xl) + var(--gap-xl) )' }}>
            <Flex {...{ flexDirection: 'column', gap: 'var(--gap-xs)' }}>
              {urls.map(({ title, url, key }, index) => (
                <Link key={key} {...{ href: url }}>
                  <Flex {...{ alignItems: 'center', gap: 'var(--gap-xs)', className: 'n-link-container' }}>
                    {(pathname.localeCompare(url) === 0 || (index !== 0 && pathname.includes(url))) && (
                      <Box
                        {...{
                          w: '7px',
                          h: '7px',
                          borderRadius: '50px',
                          bg: pathname.localeCompare(url) === 0 || (index !== 0 && pathname.includes(url)) ? 'var(--blue-400)' : 'var(--grey-alpha-800)',
                          transition: '0.2s all ease-in-out',
                        }}
                      />
                    )}
                    <Text
                      {...{
                        color: pathname.localeCompare(url) === 0 || (index !== 0 && pathname.includes(url)) ? 'var(--blue-400)' : 'var(--grey-alpha-800)',
                        fontWeight: pathname.localeCompare(url) === 0 || (index !== 0 && pathname.includes(url)) ? 'bold' : 'normal',
                        fontSize: 'var(--text-xs)',
                        transition: '0.2s all ease-in-out',
                      }}
                    >
                      {title}
                    </Text>
                  </Flex>
                </Link>
              ))}
            </Flex>
            <Flex {...{ flexDirection: 'column', gap: 'var(--gap-xs)' }}>
              {socialMediaUrls.map(({ title, url, key }) => (
                <Link key={key} {...{ href: url }}>
                  <Text
                    {...{
                      color: 'var(--grey-alpha-800)',
                      fontSize: 'var(--text-xs)',
                      transition: '0.2s all ease-in-out',
                      _hover: {
                        color: 'var(--blue-400)',
                      },
                    }}
                  >
                    {title}
                  </Text>
                </Link>
              ))}
            </Flex>
          </Flex>
          <Text
            {...{
              color: 'var(--grey-alpha-800)',
              fontSize: 'var(--text-xs)',
              transition: '0.2s all ease-in-out',
            }}
          >
            {rightsMessage}
          </Text>
        </Flex>
        <Box {...{ placeSelf: 'start end', className: 'f-back-to-top-btn' }}>
          <Link {...{ href: '#nav' }}>
            <Flex {...{ as: 'button', bg: 'var(--blue-600)', w: '52px', h: '52px', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowUpIcon {...{ color: 'var(--white-color)', size: '24px' }} />
            </Flex>
          </Link>
        </Box>
      </div>
    </Container>
  );
};
export default Footer;

const Container = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: var(--white-color);

  .f-container {
    display: grid;
    grid-template-columns: repeat(3, auto);
    width: 1300px;
    padding: 100px 0;

    img {
      width: 100px;
      height: 100px;

      @media ${device.tablet} {
        width: 70px;
        height: 70px;
      }
      @media ${device.mobile} {
        width: 55px;
        height: 55px;
      }
    }
    .n-link-container:hover {
      p {
        color: var(--blue-400);
      }
      div {
        background: var(--blue-400);
      }
    }

    @media ${device.tablet} {
      grid-template-columns: auto;
      grid-template-rows: repeat(3, auto);
      gap: var(--gap-xl);

      .f-address {
        width: 100%;
      }
      .f-info {
        order: 2;
      }
      .f-nav {
        order: 3;
      }
      .f-back-to-top-btn {
        order: 1;

        button {
          width: 40px;
          height: 40px;
        }
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
