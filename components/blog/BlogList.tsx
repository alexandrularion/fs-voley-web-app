import { nanoid } from 'nanoid';
import styled from 'styled-components';
import { useMemo } from 'react';
import { useBlogArticles } from '../../context/ContextBlogArticle';
import { TBlogArticle } from './Interfaces';
import BlogCard from './BlogCard';
import { LayoutContainer } from '../shared/Layout';
import EmptyState from '../shared/EmptyState';
import { Box } from '@chakra-ui/react';

const BlogList: React.FC = () => {
  const { blogArticles } = useBlogArticles();
  const data: TBlogArticle[] = useMemo(() => blogArticles.map((obj) => ({ ...obj, key: nanoid() })), [blogArticles]);

  return (
    <Container>
      <LayoutContainer {...{ className: 'bl-layout-container' }}>
        {data && data.length > 0 ? (
          <Box
            {...{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              w: '100%',
              gap: 'var(--gap-md)',
            }}
          >
            {data?.map(({ key, title, image, tags, createdAt }) => (
              <BlogCard key={key} {...{ title, image, tags: tags!, createdAt }} />
            ))}
          </Box>
        ) : (
          <EmptyState />
        )}
      </LayoutContainer>
    </Container>
  );
};

export default BlogList;

const Container = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;

  .bl-layout-container {
    place-content: start;
    position: relative;
    top: -110px;
    gap: var(--gap-md);
  }
`;
