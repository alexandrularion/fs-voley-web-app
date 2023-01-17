import { NextPage } from 'next';
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
