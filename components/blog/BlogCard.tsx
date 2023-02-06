import styled from 'styled-components';
import Image from 'next/image';
import { Heading, Divider, Flex, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { IBlogCard } from './Interfaces';
import Link from 'next/link';
import { navigationRoutes } from '../../constants/Navigation';

const BlogCard: React.FC<IBlogCard> = ({ image, title, tags, createdAt, id }) => {
  const data = useMemo(() => tags?.map(({ title }) => ({ title, key: nanoid() })), [tags]);
  const memoziedDate = useMemo(() => new Date(createdAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'numeric', year: 'numeric' }), [createdAt]);
  return (
    <Link {...{ href: `${navigationRoutes.blog.url}/${id}` }}>
      <Container>
        <Image {...{ src: image, alt: title, width: 300, height: 300 }} />
        <Heading {...{ fontSize: '18px', whiteSpace: 'pre-line', color: 'var(--blue-600)' }}>{title}</Heading>
        <Divider {...{ w: '100%', color: 'var(--grey-alpha-400)', border: '1px solid' }} />
        <Flex {...{ justifyContent: 'space-between', w: '100%' }}>
          <Flex {...{ gap: 'var(--gap-sm)' }}>
            {data?.slice(0, 3).map(({ title, key }) => (
              <Text key={key} {...{ color: 'var(--blue-600)' }}>{`#${title}`}</Text>
            ))}
          </Flex>
          <Text {...{ color: 'var(--grey-alpha-400)' }}>{memoziedDate}</Text>
        </Flex>
      </Container>
    </Link>
  );
};

export default BlogCard;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 70px auto auto;
  gap: var(--gap-md);

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
`;
