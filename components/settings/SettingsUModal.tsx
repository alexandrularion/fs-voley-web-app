import { Button, Flex, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip } from '@chakra-ui/react';
import { FormApi } from 'final-form';
import { Field, Form } from 'react-final-form';
import { IFormModal } from '../shared/Interfaces';
import { CustomValidation, EmailValidation } from '../shared/Validations';

const SettingsUModal: React.FC<IFormModal> = ({ isOpen, onClose, isLoading, onSubmitHandler, initialValues, title }) => {
  return (
    <Modal {...{ isOpen, onClose, blockScrollOnMount: true, isCentered: true, closeOnOverlayClick: !isLoading }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          {
            <Form
              {...{
                initialValues,
                onSubmit: (values: any, form: FormApi) => onSubmitHandler(values, form),
                render: ({ handleSubmit }) => (
                  <Flex {...{ as: 'form', onSubmit: handleSubmit, id: 'sponsors-cu-modal', display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
                    <Field
                      {...{
                        name: 'firstName',
                        validate: (value: string) => CustomValidation(value, 'Numele', 3, 15),
                        render: ({ input, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Nume' }} />
                              <Input
                                {...{
                                  ...input,
                                  type: 'text',
                                  isInvalid: touched && error,
                                  textTransform: 'capitalize',
                                  placeholder: 'Introduceti numele utilizatorului',
                                }}
                              />
                            </InputGroup>
                          </Tooltip>
                        ),
                      }}
                    />
                    <Field
                      {...{
                        name: 'lastName',
                        validate: (value: string) => CustomValidation(value, 'Prenume', 3, 15),
                        render: ({ input, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Prenume' }} />
                              <Input
                                {...{
                                  ...input,
                                  type: 'text',
                                  isInvalid: touched && error,
                                  textTransform: 'capitalize',
                                  placeholder: 'Introduceti prenumele utilizatorului',
                                }}
                              />
                            </InputGroup>
                          </Tooltip>
                        ),
                      }}
                    />
                    <Field
                      {...{
                        name: 'email',
                        validate: (value: string) => EmailValidation(value),
                        render: ({ input, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Email' }} />
                              <Input
                                {...{
                                  ...input,
                                  type: 'email',
                                  isInvalid: touched && error,
                                  placeholder: 'Introduceti email-ul de conectare',
                                }}
                              />
                            </InputGroup>
                          </Tooltip>
                        ),
                      }}
                    />
                  </Flex>
                ),
              }}
            />
          }
        </ModalBody>
        <ModalFooter>
          <Button {...{ onClick: onClose, mr: 3, variant: 'outline', disabled: isLoading }}>Inchide</Button>
          <Button {...{ variant: 'solid', background: 'var(--blue-600)', color: 'var(--white-color)', colorScheme: 'blue', type: 'submit', form: 'sponsors-cu-modal', disabled: isLoading, isLoading }}>
            {'Salveaza'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SettingsUModal;
