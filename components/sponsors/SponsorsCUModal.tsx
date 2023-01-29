import { Button, Checkbox, Flex, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tooltip } from '@chakra-ui/react';
import { FormApi } from 'final-form';
import { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { convertFileToBase64URL } from '../../utils';
import { IFormModal } from '../shared/Interfaces';
import { CustomValidation, UrlValidation } from '../shared/Validations';

const SponsorsCUModal: React.FC<IFormModal> = ({ isOpen, onClose, title, isLoading, onSubmitHandler, initialValues }) => {
  const [hasEndedSponsorship, setHasEndedSponsorship] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading) {
      setHasEndedSponsorship(Boolean(Number(initialValues?.endDate)));
    }
  }, [initialValues, isLoading]);

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
                onSubmit: (values: any, form: FormApi) => onSubmitHandler(hasEndedSponsorship ? values : { ...values, endDate: '0' }, form),
                render: ({ handleSubmit, values }) => (
                  <Flex {...{ as: 'form', onSubmit: handleSubmit, id: 'sponsors-cu-modal', display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
                    <Field
                      {...{
                        name: 'logo',
                        validate: (value: string) => CustomValidation(value, 'Logo'),
                        render: ({ input: { onBlur, onChange, onFocus }, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Logo', w: '115px' }} />
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
                                    content: `"${initialValues?.title ? `${initialValues?.title?.toLowerCase()}.png` : touched && !error ? 'Fisier adaugat ✓' : 'Incarca un logo din computer'}"`,
                                    width: '100%',
                                    height: '100%',
                                    top: '0',
                                    left: '10px',
                                    padding: '7px',
                                    position: 'absolute',
                                    background: 'var(--white-color)',
                                    color: values?.logo ? 'var(--black-color)' : 'var(--grey-alpha-600)',
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
                                  placeholder: 'Introduceti numele companiei',
                                }}
                              />
                            </InputGroup>
                          </Tooltip>
                        ),
                      }}
                    />
                    <Field
                      {...{
                        name: 'site',
                        validate: (value: string) => UrlValidation(value),
                        render: ({ input, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Site', w: '115px' }} />
                              <Input
                                {...{
                                  ...input,
                                  type: 'text',
                                  isInvalid: touched && error,
                                  placeholder: 'Introduceti site-ul web',
                                }}
                              />
                            </InputGroup>
                          </Tooltip>
                        ),
                      }}
                    />
                    <Field
                      {...{
                        name: 'startDate',
                        validate: (value: string) => CustomValidation(value, 'Sponsor din'),
                        render: ({ input, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Sponsor din', w: '115px' }} />
                              <Input
                                {...{
                                  ...input,
                                  type: 'number',
                                  min: '2000',
                                  max: '2023',
                                  step: '1',
                                  isInvalid: touched && error,
                                  placeholder: 'Introduceti anul',
                                }}
                              />
                            </InputGroup>
                          </Tooltip>
                        ),
                      }}
                    />
                    <Checkbox
                      {...{
                        isChecked: !hasEndedSponsorship,
                        onChange: (e) => {
                          setHasEndedSponsorship(!e.target.checked);
                        },
                      }}
                    >
                      {'Sponsor pana in prezent?'}
                    </Checkbox>
                    {hasEndedSponsorship && (
                      <Field
                        {...{
                          name: 'endDate',
                          render: ({ input, meta: { touched, error } }) => (
                            <Tooltip {...{ label: touched && error ? error : '' }}>
                              <InputGroup>
                                <InputLeftAddon {...{ children: 'Pana in' }} />
                                <Input
                                  {...{
                                    ...input,
                                    type: 'number',
                                    min: '2000',
                                    max: '2023',
                                    step: '1',
                                    placeholder: 'Introduceti anul',
                                  }}
                                />
                              </InputGroup>
                            </Tooltip>
                          ),
                        }}
                      />
                    )}
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
export default SponsorsCUModal;
