import { Button, Flex, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Tooltip } from '@chakra-ui/react';
import { FormApi } from 'final-form';
import { Field, Form } from 'react-final-form';
import { convertFileToBase64URL } from '../../utils';
import { IFormModal } from '../shared/Interfaces';
import { CustomValidation } from '../shared/Validations';

const TeamCoachCUModal: React.FC<IFormModal> = ({ isOpen, onClose, title, isLoading, onSubmitHandler, initialValues }) => {
  return (
    <Modal {...{ isOpen, onClose, blockScrollOnMount: true, isCentered: true, closeOnOverlayClick: !isLoading, size: '4xl' }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          {
            <Form
              {...{
                initialValues,
                onSubmit: (values: any, form: FormApi) => onSubmitHandler(values, form),
                render: ({ handleSubmit, values }) => (
                  <Flex {...{ as: 'form', onSubmit: handleSubmit, id: 'team-player-cu-modal', display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
                    <Field
                      {...{
                        name: 'image',
                        validate: (value: string) => CustomValidation(value, 'Imaginea de profil'),
                        render: ({ input: { onBlur, onChange, onFocus }, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Imagine profil', w: '140px' }} />
                              <Input
                                {...{
                                  onBlur,
                                  onFocus,
                                  onChange: (e) => {
                                    e.target.files &&
                                      e.target.files.length > 0 &&
                                      convertFileToBase64URL(e.target.files![0], (result: string) => {
                                        onChange(result);
                                      });
                                  },
                                  isInvalid: touched && error,
                                  type: 'file',
                                  title: '',
                                  _after: {
                                    content:
                                      initialValues?.name && !touched
                                        ? `"${values?.surName?.toLowerCase()}-${values?.name?.toLowerCase()}.png"`
                                        : touched && !error
                                        ? '"Fisier adaugat ✓"'
                                        : '"Selecteaza imaginea de profil"',
                                    width: '100%',
                                    height: '100%',
                                    top: '0',
                                    left: '10px',
                                    padding: '7px',
                                    position: 'absolute',
                                    background: 'var(--white-color)',
                                    color: initialValues?.image || values?.image ? 'var(--black-color)' : 'var(--grey-alpha-600)',
                                  },
                                  sx: {
                                    '::file-selector-button': {
                                      visibility: 'hidden',
                                    },
                                    '::-webkit-file-upload-button': {
                                      visibility: 'hidden',
                                    },
                                  },
                                }}
                              />
                            </InputGroup>
                          </Tooltip>
                        ),
                      }}
                    />
                    <Field
                      {...{
                        name: 'name',
                        validate: (value: string) => CustomValidation(value, 'Numele', 3, 15),
                        render: ({ input, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Nume', w: '140px' }} />
                              <Input
                                {...{
                                  ...input,
                                  type: 'text',
                                  isInvalid: touched && error,
                                  placeholder: 'Introduceti numele antrenorului',
                                }}
                              />
                            </InputGroup>
                          </Tooltip>
                        ),
                      }}
                    />
                    <Field
                      {...{
                        name: 'surName',
                        validate: (value: string) => CustomValidation(value, 'Prenume', 3, 15),
                        render: ({ input, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Prenume', w: '140px' }} />
                              <Input
                                {...{
                                  ...input,
                                  type: 'text',
                                  isInvalid: touched && error,
                                  placeholder: 'Introduceti prenumele antrenorului',
                                }}
                              />
                            </InputGroup>
                          </Tooltip>
                        ),
                      }}
                    />
                    <Field
                      {...{
                        name: 'description',
                        validate: (value: string) => CustomValidation(value, 'Bibliografia'),
                        render: ({ input, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Biografie', w: '140px', h: 'auto' }} />
                              <Textarea
                                {...{
                                  ...input,
                                  isInvalid: touched && error,
                                  borderTopLeftRadius: 0,
                                  borderBottomLeftRadius: 0,
                                  minH: '120px',
                                  placeholder: 'Introduceti biografia',
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
          <Button
            {...{ variant: 'solid', background: 'var(--blue-600)', color: 'var(--white-color)', colorScheme: 'blue', type: 'submit', form: 'team-player-cu-modal', disabled: isLoading, isLoading }}
          >
            {'Salveaza'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default TeamCoachCUModal;
