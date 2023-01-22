import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import Footer from '../../components/shared/Footer';
import Navigation from '../../components/shared/Navigation';

export default function Home() {
  return (
    <div>
      <Navigation />
      <Footer />
    </div>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};
