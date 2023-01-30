import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { NextPage, GetStaticProps, GetStaticPropsContext } from 'next';
import Layout, { LayoutContainer } from '../../components/shared/Layout';
import { IPlayerProfilePage, TTeamPlayer } from '../../components/team/Interfaces';
import { getPlayer } from '../../services/Team.service';
import Background from '../../assets/Background.png';
import styled from 'styled-components';
import Image from 'next/dist/client/image';
import TeamPlayerStats from '../../components/team/TeamPlayerStats';

const PlayerProfilePage: NextPage<IPlayerProfilePage> = ({ data: { name, surName, image, position, nationality, birthday, height, shirtNumber, description, ...rest } }) => {
  return (
    <Layout {...{ bgColor: 'var(--blue-600)' }}>
      <Container {...{ bgSrc: Background.src }}>
        <Flex {...{ w: '100%', background: 'var(--blue-700)', position: 'relative' }}>
          <Box {...{ w: '60%', h: '700px', className: 'tm-img-container' }}>
            <Image {...{ src: image, alt: '', width: 420, height: 500 }} />
          </Box>
        </Flex>
        <LayoutContainer {...{ className: 'tm-layout-container' }}>
          <Flex {...{ flexDirection: 'column', gap: 'var(--gap-xl)', position: 'absolute', top: '50px', left: 0, zIndex: 'var(--z-index-4)' }}>
            <Text {...{ color: 'var(--white-color)' }}>{'ECHIPĂ'}</Text>
            <Flex {...{ flexDirection: 'column', gap: 'var(--gap-sm)' }}>
              <Heading {...{ color: 'var(--white-color)', fontSize: 'calc(var(--heading-md) + var(--heading-xs))' }}>{surName}</Heading>
              <Heading {...{ color: 'var(--white-color)', fontSize: '280px', position: 'relative', left: '-16px' }}>{name}</Heading>
            </Flex>
          </Flex>
          <Heading {...{ color: 'var(--blue-400)', fontSize: '200px', position: 'absolute', right: '0', top: '80px', zIndex: 'var(--z-index-5)' }}>{shirtNumber}</Heading>
        </LayoutContainer>
        <LayoutContainer {...{ className: 'tm-layout-container-info' }}>
          <TeamPlayerStats {...{ data: { ...rest, position, nationality, birthday, height, name, surName, image, description, shirtNumber } }} />
          <Flex {...{ flexDirection: 'column', gap: 'var(--gap-sm)' }}>
            <Text {...{ fontSize: 'var(--text-md)', color: 'var(--black-color)' }}>{'Biografie'}</Text>
            <Heading {...{ fontSize: 'var(--heading-xs)', color: 'var(--blue-600)' }}>{description}</Heading>
          </Flex>
          {/* timeline */}
        </LayoutContainer>
      </Container>
    </Layout>
  );
};

export default PlayerProfilePage;

const Container = styled.div<{ bgSrc: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  .tm-layout-container {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .tm-layout-container-info {
    justify-content: flex-start;
    position: relative;
    top: -80px;
    z-index: var(--z-index-6);
    background-color: var(--white-color);
    padding: 80px 100px;
    flex-direction: column;
    gap: var(--gap-lg);
    border-left: 20px solid var(--blue-400);
    border-top: 20px solid var(--blue-600);
  }
  .tm-img-container {
    position: relative;
    background: linear-gradient(1.57deg, rgba(6, 4, 183, 0.7) 1.32%, rgba(56, 54, 218, 0.7) 57.87%, rgba(108, 106, 255, 0.7) 96.57%), url(${({ bgSrc }) => bgSrc});
    background-size: cover;

    img {
      position: absolute;
      right: calc(-420px / 2);
      bottom: 79px;
      z-index: var(--z-index-6);
      width: 420px;
      height: max-content;
      pointer-events: none;
    }
  }
`;
export const getStaticPaths = async () => {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } }, { params: { id: '3' } }, { params: { id: '4' } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
  try {
    const { data } = await getPlayer(Number(ctx.params?.id!));
    return {
      props: {
        data: {
          ...data,
          name: data?.first_name,
          surName: data?.last_name,
        } as TTeamPlayer,
      },
    };
  } catch (e) {
    return {
      props: {
        data: {},
      },
    };
  }
};
