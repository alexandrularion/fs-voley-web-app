import styled from 'styled-components';
import Image from 'next/image';
import { Heading, Divider, Flex, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { IBlogCard } from './Interfaces';

const BlogCard: React.FC<IBlogCard> = ({ image, title, tags, createdAt }) => {
  const data = useMemo(() => tags.map(({ title }) => ({ title, key: nanoid() })), [tags]);
  const memoziedDate = useMemo(() => new Date(createdAt).toLocaleDateString('ro-RO', { day: 'numeric', month: 'numeric', year: 'numeric' }), [createdAt]);
  return (
    <Container>
      <Image {...{ src: image, alt: title, width: 300, height: 300 }} />
      <Heading>{title}</Heading>
      <Divider {...{ w: '100%', color: 'var(--grey-alpha-300)' }} />
      <Flex {...{ justifyContent: 'space-between', w: '100%' }}>
        <Flex>
          {data?.slice(0, 3).map(({ title, key }) => (
            <Text key={key}>{`#${title}`}</Text>
          ))}
        </Flex>
        <Text>{memoziedDate}</Text>
      </Flex>
    </Container>
  );
};

export default BlogCard;

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 80px auto auto;
  gap: var(--gap-md);
`;
