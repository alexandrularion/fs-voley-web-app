import { NextPage, GetStaticProps, GetStaticPropsContext } from 'next';
import Layout, { LayoutContainer } from '../../components/shared/Layout';
import styled from 'styled-components';
import { getAllArticlesIds, getArticle } from '../../services/Blog.service';
import { IBlogArticlePage } from '../../components/blog/Interfaces';
import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { useMemo, useState } from 'react';
import { copyTextToClipboard, getHumanDate } from '../../utils';
import { CheckedIcon, FacebookIcon, InstagramIcon, LinkIcon } from '../../styles/Icons';
import Link from 'next/dist/client/link';

const BlogArticlePage: NextPage<IBlogArticlePage> = ({ data: { id, image, title, tags, createdAt, content } }) => {
  const data = useMemo(() => tags?.map(({ title }) => ({ title, key: nanoid() })), [tags]);
  const memoziedDate = useMemo(() => getHumanDate(new Date(createdAt)), [createdAt]);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  return (
    <Layout {...{ bgColor: 'var(--blue-700)' }}>
      <Container>
        <Box
          {...{
            position: 'relative',
            background: `linear-gradient(1.57deg, rgba(3, 0, 183,0.9) 20.32%, rgba(108, 106, 255, 0.376) 96.57%), url(${image})`,
            backgroundSize: 'cover',
            w: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <LayoutContainer {...{ className: 'ba-layout-container' }}>
            <Heading {...{ color: 'var(--white-color)', fontSize: 'var(--heading-sm)' }}>{title}</Heading>
            <Flex {...{ w: '100%', gap: 'var(--gap-md)', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Box {...{ borderBottom: '2px solid var(--grey-alpha-200)', paddingBottom: '20px', w: '100%' }}>
                <Flex {...{ justifyContent: 'space-between', w: '100%' }}>
                  <Flex {...{ gap: 'var(--gap-sm)' }}>
                    {data?.slice(0, 3).map(({ title, key }) => (
                      <Text key={key} {...{ color: 'var(--grey-alpha-200)' }}>{`#${title}`}</Text>
                    ))}
                  </Flex>
                  <Text {...{ color: 'var(--grey-alpha-200)' }}>{memoziedDate}</Text>
                </Flex>
              </Box>
              <Flex {...{ gap: 'var(--gap-sm)', position: 'relative', bottom: '-15px' }}>
                <Link {...{ href: `https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXTAUTH_URL}/${id}`, target: '_blank' }}>
                  <Center {...{ borderRadius: '50%', border: '1px solid var(--grey-alpha-300)', w: '34px', h: '34px' }}>
                    <FacebookIcon {...{ size: '24px', color: 'var(--grey-alpha-300)' }} />
                  </Center>
                </Link>
                <Link {...{ href: `https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXTAUTH_URL}/${id}`, target: '_blank' }}>
                  <Center {...{ borderRadius: '50%', border: '1px solid var(--grey-alpha-300)', w: '34px', h: '34px' }}>
                    <InstagramIcon {...{ size: '22px', color: 'var(--grey-alpha-300)' }} />
                  </Center>
                </Link>
                <Center
                  {...{
                    borderRadius: '50%',
                    border: '1px solid var(--grey-alpha-300)',
                    w: '34px',
                    h: '34px',
                    onClick: async () => {
                      copyTextToClipboard(`${process.env.NEXTAUTH_URL}/${id}`);
                      setIsCopied(true);
                      setTimeout(() => setIsCopied(false), 1500);
                    },
                    cursor: 'pointer',
                  }}
                >
                  {isCopied ? <CheckedIcon {...{ size: '22px', color: 'var(--grey-alpha-300)' }} /> : <LinkIcon {...{ size: '22px', color: 'var(--grey-alpha-300)' }} />}
                </Center>
              </Flex>
            </Flex>
          </LayoutContainer>
          <Box {...{ position: 'absolute', bottom: '-120px', left: 0, w: '20px', h: '250px', zIndex: 'var(--z-index-2)', background: 'var(--blue-400)' }} />
        </Box>
        <LayoutContainer {...{ className: 'bax-layout-container' }}>
          <Text {...{ w: '70%', textAlign: 'left', color: 'var(--grey-alpha-200)' }}>{content}</Text>
        </LayoutContainer>
      </Container>
    </Layout>
  );
};

export default BlogArticlePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .ba-layout-container {
    height: 500px;
    align-items: flex-start;
    justify-content: flex-end;
    padding-bottom: 50px;
    gap: var(--gap-xl);
    flex-direction: column;
  }
  .bax-layout-container {
    align-items: flex-start;
    justify-content: flex-start;
    padding: 75px 0;
    white-space: pre-line;
  }
`;
export const getStaticPaths = async () => {
  try {
    const { data } = await getAllArticlesIds();
    return {
      paths: data.map(({ id }: { id: number }) => ({ params: { id: String(id) } })),
      fallback: 'blocking',
    };
  } catch (e) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
  try {
    const { data } = await getArticle(Number(ctx.params?.id!));
    return {
      props: {
        data,
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
