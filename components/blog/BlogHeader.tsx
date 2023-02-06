import styled from 'styled-components';
import { IBlogHeader } from './Interfaces';
import Background from '../../assets/Background.png';
import { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { LayoutContainer } from '../shared/Layout';
import Tabs from '../shared/Tabs';
import { ITab } from '../shared/Interfaces';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Link from 'next/dist/client/link';
import { adminRoutes } from '../../constants/Navigation';
import { getRoleNameByRoleId } from '../../utils';
// import { toast } from 'react-toastify';
// import { FormApi } from 'final-form';
import { PlusIcon } from '../../styles/Icons';
import { USER_ROLE } from '../../constants/Enums';
// import { createArticle } from '../../services/Blog.service';
// import { useBlogArticles } from '../../context/ContextBlogArticle';

const BlogHeader: React.FC<IBlogHeader> = ({ isUsedInAdminPage = false }) => {
  const tabs: ITab[] = useMemo(
    () =>
      [
        { tabId: 0, title: 'Toate', value: 0 },
        { tabId: 1, title: 'Ultimile 30 de zile', value: 30 },
        { tabId: 2, title: 'Ultimile 3 luni', value: 90 },
        { tabId: 3, title: 'Ultimile 9 luni', value: 270 },
      ].map((obj) => ({ ...obj, key: nanoid() })),
    []
  );
  const { data } = useSession();

  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const { setBlogArticles, blogArticles } = useBlogArticles();
  // const { onClose, isOpen, onOpen } = useDisclosure();

  // const onSubmitHandler = async (values: object, form: FormApi) => {
  //   setIsLoading(true);
  //   try {
  //     const { data } = await createArticle(values as TBlogArticle);
  //     const { id } = data as TBlogArticle;
  //     setBlogArticles([...blogArticles, { ...values, id } as TBlogArticle]);
  //     toast('Felicitari! Articolul a fost adaugat cu success.', { hideProgressBar: true, autoClose: 5000, type: 'success', position: 'bottom-right' });
  //     onClose();
  //     form.reset();
  //   } catch (err) {
  //     toast('Ooops. Ceva nu a mers bine, te rugam incearca din nou.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
  //   }

  //   setIsLoading(false);
  // };

  return (
    <Container {...{ src: Background.src, isUsedInAdminPage }}>
      <LayoutContainer {...{ className: 'sh-layout-container' }}>
        {isUsedInAdminPage && data?.role === USER_ROLE.ADMIN ? (
          <Text {...{ color: 'var(--white-color)', fontSize: 'var(--text-sm)' }}>{getRoleNameByRoleId(data?.role)}</Text>
        ) : (
          <Text {...{ color: 'var(--white-color)', fontSize: 'var(--text-sm)' }}>{'C.S.M Suceava'}</Text>
        )}

        <Flex {...{ w: '100%', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--gap-md)' }}>
          <Heading {...{ color: 'var(--grey-alpha-50)', fontSize: 'var(--heading-md)' }}>{'Noutăți'}</Heading>
          {data?.role === USER_ROLE.ADMIN && (
            <>
              {isUsedInAdminPage && (
                <Button
                  {...{
                    variant: 'outline',
                    colorScheme: 'whiteAlpha',
                    color: 'var(--white-color)',
                    // onClick: () => onOpen(),
                    leftIcon: <PlusIcon {...{ color: 'var(--white-color)', size: '22px' }} />,
                  }}
                >
                  {'Adaugă un articol'}
                </Button>
              )}
              {!isUsedInAdminPage && (
                <Link {...{ href: adminRoutes.sponsors.url }}>
                  <Button {...{ variant: 'solid', colorScheme: 'whiteAlpha', color: 'var(--black-color)', background: 'var(--white-color)' }}>{'Gestionează articole'}</Button>
                </Link>
              )}
            </>
          )}
        </Flex>
        <Tabs {...{ tabs }} />
      </LayoutContainer>
      <Box {...{ position: 'absolute', top: '265px', left: 0, w: '20px', h: '170px', zIndex: 'var(--z-index-2)', background: 'var(--blue-500)' }} />
    </Container>
  );
};
export default BlogHeader;

const Container = styled.section<{ src: string; isUsedInAdminPage: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: url(${({ src }) => src});
  min-height: 350px;
  background-size: cover;
  position: relative;
  z-index: var(--z-index-1);
  padding: 50px;

  &::after {
    top: 0;
    left: 0;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${({ isUsedInAdminPage }) =>
      isUsedInAdminPage
        ? 'linear-gradient(1.57deg, rgba(3, 209, 255, 0.931) 1.32%, rgba(54, 54, 218, 0.833) 57.87%, rgba(127, 106, 255, 0.8) 96.57%)'
        : 'linear-gradient(1.57deg, rgba(6, 4, 183, 0.8) 1.32%, rgba(56, 54, 218, 0.8) 57.87%, rgba(108, 106, 255, 0.8) 96.57%)'};
    z-index: var(--z-index-1);
  }

  .sh-layout-container {
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: var(--gap-md);
  }
`;
