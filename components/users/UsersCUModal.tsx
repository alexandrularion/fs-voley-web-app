import { Button, Flex, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Tooltip } from '@chakra-ui/react';
import { FormApi } from 'final-form';
import { Field, Form } from 'react-final-form';
import { IFormModal } from '../shared/Interfaces';
import { CustomValidation, EmailValidation } from '../shared/Validations';

const UsersCUModal: React.FC<IFormModal> = ({ isOpen, onClose, title, isLoading, onSubmitHandler, initialValues }) => {
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
                    <Field
                      {...{
                        name: 'role',
                        validate: (value: string) => CustomValidation(value, 'Tipul de utilizator'),
                        render: ({ input, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Tip de utilizator' }} />
                              <Select
                                {...{
                                  isInvalid: touched && error,
                                  placeholder: 'Alegeti tipul de utilizator',
                                  ...input,
                                }}
                              >
                                {<option {...{ value: 1 }}>{'Administrator'}</option>}
                                {<option {...{ value: 2 }}>{'Creator de continut'}</option>}
                              </Select>
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
export default UsersCUModal;
