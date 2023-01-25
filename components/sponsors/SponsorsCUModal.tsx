import { Button, Checkbox, Flex, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { FormApi } from 'final-form';
import { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { convertFileToBase64URL } from '../../utils';
import { IFormModal } from '../shared/Interfaces';

const SponsorsCUModal: React.FC<IFormModal> = ({ isOpen, onClose, title, isLoading, onSubmitHandler, initialValues }) => {
  const [isNotSponsorshipFinished, setIsNotSponsorshipFinished] = useState<boolean>(false);

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
                        name: 'image_url',
                        render: ({ input: { onBlur, onChange, onFocus } }) => (
                          <InputGroup>
                            <InputLeftAddon {...{ children: 'Logo' }} />
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
                                type: 'file',
                                sx: {
                                  '::file-selector-button': {
                                    height: 10,
                                    padding: 0,
                                    mr: 4,
                                    background: 'none',
                                    border: 'none',
                                  },
                                },
                              }}
                            />
                          </InputGroup>
                        ),
                      }}
                    />
                    <Field
                      {...{
                        name: 'title',
                        render: ({ input }) => (
                          <InputGroup>
                            <InputLeftAddon {...{ children: 'Nume' }} />
                            <Input
                              {...{
                                ...input,
                                type: 'text',
                                placeholder: 'Introduceti numele companiei',
                              }}
                            />
                          </InputGroup>
                        ),
                      }}
                    />
                    <Field
                      {...{
                        name: 'website',
                        render: ({ input }) => (
                          <InputGroup>
                            <InputLeftAddon {...{ children: 'Site' }} />
                            <Input
                              {...{
                                ...input,
                                type: 'text',
                                placeholder: 'Introduceti site-ul web',
                              }}
                            />
                          </InputGroup>
                        ),
                      }}
                    />

                    <Field
                      {...{
                        name: 'date_start',
                        render: ({ input }) => (
                          <InputGroup>
                            <InputLeftAddon {...{ children: 'Sponsor din' }} />
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
                        ),
                      }}
                    />
                    <Checkbox
                      {...{
                        onChange: (e) => {
                          setIsNotSponsorshipFinished(e.target.checked);
                        },
                      }}
                    >
                      {'Sponsor pana in prezent?'}
                    </Checkbox>
                    {!isNotSponsorshipFinished && (
                      <Field
                        {...{
                          name: 'date_end',
                          render: ({ input }) => (
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
          <Button {...{ variant: 'solid', background: 'var(--blue-600)', color: 'var(--white-color)', colorScheme: 'blue', type: 'submit', form: 'sponsors-cu-modal', disabled: isLoading }}>
            {'Salveaza'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default SponsorsCUModal;
