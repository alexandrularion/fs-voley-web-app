import { Button, Flex, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, Tooltip } from '@chakra-ui/react';
import { FormApi } from 'final-form';
import { Field, Form } from 'react-final-form';
import { convertFileToBase64URL } from '../../utils';
import { IFormModal } from '../shared/Interfaces';
import { CustomValidation } from '../shared/Validations';

const HistoryCUModal: React.FC<IFormModal> = ({ isOpen, onClose, title, isLoading, onSubmitHandler, initialValues }) => {
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
                  <Flex {...{ as: 'form', onSubmit: handleSubmit, id: 'history-cu-modal', display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
                    <Field
                      {...{
                        name: 'image',
                        validate: (value: string) => CustomValidation(value, 'Logo'),
                        render: ({ input: { onBlur, onChange, onFocus }, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Imagine', w: '115px' }} />
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
                                    content: `"${initialValues?.title ? `${initialValues?.title?.toLowerCase()}.png` : touched && !error ? 'Fisier adaugat ✓' : 'Incarca o imagine din computer'}"`,
                                    width: '100%',
                                    height: '100%',
                                    top: '0',
                                    left: '10px',
                                    padding: '7px',
                                    position: 'absolute',
                                    background: 'var(--white-color)',
                                    color: values?.image ? 'var(--black-color)' : 'var(--grey-alpha-600)',
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
                        name: 'title',
                        validate: (value: string) => CustomValidation(value, 'Nume'),
                        render: ({ input, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Nume', w: '115px' }} />
                              <Input
                                {...{
                                  ...input,
                                  type: 'text',
                                  isInvalid: touched && error,
                                  placeholder: 'Introduceti un titlu',
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
                        validate: (value: string) => CustomValidation(value, 'Descrierea continutului'),
                        render: ({ input, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Continut', w: '140px', h: 'auto' }} />
                              <Textarea
                                {...{
                                  ...input,
                                  isInvalid: touched && error,
                                  borderTopLeftRadius: 0,
                                  borderBottomLeftRadius: 0,
                                  minH: '120px',
                                }}
                              />
                            </InputGroup>
                          </Tooltip>
                        ),
                      }}
                    />
                    <Field
                      {...{
                        name: 'aligned',
                        validate: (value: string) => CustomValidation(value, 'Alinatul'),
                        render: ({ input, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Aliniat', w: '140px' }} />
                              <Select
                                {...{
                                  isInvalid: touched && error,
                                  placeholder: 'Alegeti centrarea continutul',
                                  ...input,
                                  borderTopLeftRadius: 0,
                                  borderBottomLeftRadius: 0,
                                }}
                              >
                                {<option {...{ value: 'left' }}>{'La stânga'}</option>}
                                {<option {...{ value: 'center' }}>{'În centru'}</option>}
                                {<option {...{ value: 'right' }}>{'La dreapta'}</option>}
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
          <Button {...{ variant: 'solid', background: 'var(--blue-600)', color: 'var(--white-color)', colorScheme: 'blue', type: 'submit', form: 'history-cu-modal', disabled: isLoading, isLoading }}>
            {'Salveaza'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default HistoryCUModal;
