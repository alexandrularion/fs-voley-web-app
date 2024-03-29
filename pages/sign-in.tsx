import { GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import SignIn from '../components/authentication/SignIn';
import Layout from '../components/shared/Layout';

const SignInPage: NextPage = () => {
  return (
    <Layout>
      <SignIn />
    </Layout>
  );
};

export default SignInPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
};
