import { Button, Flex, FormControl, Heading, Input, InputGroup, InputLeftAddon, InputRightElement, Text, Tooltip } from '@chakra-ui/react';
import styled from 'styled-components';
import Background from '../../assets/Background.png';
import { authData } from '../../constants/Auth';
import { useState } from 'react';
import { EmailIcon, PasswordFillIcon } from '../../styles/Icons';
import { CustomValidation, EmailValidation } from '../shared/Validations';
import { Form, Field } from 'react-final-form';
import { device } from '../shared/DevicesBreakpoints';
import { LayoutContainer } from '../shared/Layout';
import { signIn, SignInResponse } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { userRoutes } from '../../constants/Navigation';

const SignIn = () => {
  const { title, subTitle } = authData;
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { push } = useRouter();

  const { settings } = userRoutes;

  const onSignInHandler = async ({ email, password }: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const res: SignInResponse | undefined = await signIn('credentials', { email, password, redirect: false });
      if (res?.status !== 200) {
        toast('Email-ul sau parola sunt incorecte.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
        setIsLoading(false);
      } else {
        push(settings.url);
      }
    } catch (error: any) {
      toast('Ne pare rau! A aparut o eroare la server.', { hideProgressBar: true, autoClose: 5000, type: 'error', position: 'bottom-right' });
      setIsLoading(false);
    }
  };

  return (
    <Container {...{ src: Background.src }}>
      <LayoutContainer {...{ className: 'si-layout-container' }}>
        <Flex {...{ position: 'relative', zIndex: 'var(--z-index-1)', flexDirection: 'column', alignItems: 'center', gap: 'var(--gap-xs)' }}>
          <Heading {...{ color: 'var(--grey-alpha-100)', fontSize: 'var(--heading-md)' }}>{title}</Heading>
          <Text {...{ color: 'var(--grey-alpha-300)', fontSize: 'var(--text-sm)', textAlign: 'center' }}>{subTitle}</Text>
        </Flex>
        <Form
          {...{
            onSubmit: (values) => onSignInHandler(values as { email: string; password: string }),
            render: ({ handleSubmit, pristine }) => (
              <FormControl
                {...{
                  position: 'relative',
                  zIndex: 'var(--z-index-1)',
                  w: '500px',
                  className: 'si-form-container',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--gap-xl)',
                  as: 'form',
                  onSubmit: handleSubmit,
                }}
              >
                <Flex {...{ flexDirection: 'column', gap: 'var(--gap-md)' }}>
                  <Field
                    {...{
                      name: 'email',
                      validate: (value: string) => EmailValidation(value),
                      render: ({ input, meta: { touched, error } }) => (
                        <Tooltip {...{ label: touched && error ? error : '' }}>
                          <InputGroup>
                            <InputLeftAddon {...{ background: 'var(--blue-400)', children: <EmailIcon {...{ color: 'var(--grey-alpha-50)', size: '22px' }} /> }} />
                            <Input
                              {...{
                                isInvalid: touched && error,
                                type: 'text',
                                placeholder: 'Email: Introduceti email-ul dvs.',
                                _placeholder: { color: 'var(--grey-alpha-300)' },
                                outline: 'none',
                                _focus: { borderColor: 'var(--grey-alpha-50)' },
                                color: 'var(--grey-alpha-50)',
                                ...input,
                              }}
                            />
                          </InputGroup>
                        </Tooltip>
                      ),
                    }}
                  />
                  <Field
                    {...{
                      name: 'password',
                      validate: (value: string) => CustomValidation(value, 'Parola'),
                      render: ({ input, meta: { error, touched } }) => (
                        <Tooltip {...{ label: touched && error ? error : '' }}>
                          <InputGroup>
                            <InputLeftAddon {...{ background: 'var(--blue-400)', children: <PasswordFillIcon {...{ color: 'var(--grey-alpha-50)', size: '22px' }} /> }} />
                            <Input
                              {...{
                                isInvalid: touched && error,
                                type: isPasswordVisible ? 'text' : 'password',
                                placeholder: 'Parola: Introduceti parola dvs.',
                                _placeholder: { color: 'var(--grey-alpha-300)' },
                                outline: 'none',
                                _focus: { borderColor: 'var(--grey-alpha-50)' },
                                color: 'var(--grey-alpha-50)',
                                ...input,
                              }}
                            />
                            <InputRightElement {...{ width: '4.5rem' }}>
                              <Button {...{ h: '1.75rem', size: 'sm', onClick: () => setIsPasswordVisible(!isPasswordVisible) }}>{isPasswordVisible ? 'Hide' : 'Show'}</Button>
                            </InputRightElement>
                          </InputGroup>
                        </Tooltip>
                      ),
                    }}
                  />
                </Flex>
                <Button {...{ type: 'submit', isLoading, disabled: pristine || isLoading }}>{'Autentifica-te'}</Button>
              </FormControl>
            ),
          }}
        />
      </LayoutContainer>
    </Container>
  );
};
export default SignIn;

const Container = styled.section<{ src: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${({ src }) => src});
  background-size: cover;
  width: 100%;
  min-height: 600px;
  position: relative;

  &::after {
    top: 0;
    left: 0;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(1.57deg, rgba(6, 4, 183, 0.9) 1.32%, rgba(56, 54, 218, 0.9) 57.87%, rgba(108, 106, 255, 0.9) 96.57%);
    z-index: 0;
  }

  .si-layout-container {
    flex-direction: column;
    gap: var(--gap-xl);
  }

  @media ${device.mobile} {
    .si-form-container {
      width: 100%;
    }
  }
`;
