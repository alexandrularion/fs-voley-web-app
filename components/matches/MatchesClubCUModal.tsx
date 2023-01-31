import { Button, Flex, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Tooltip } from '@chakra-ui/react';
import { FormApi } from 'final-form';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import { Field, Form } from 'react-final-form';
import useSWR from 'swr';
import { getAllChampionshipsSWRKey } from '../../services/Match.service';
import { convertFileToBase64URL, fetcher } from '../../utils';
import { IFormModal } from '../shared/Interfaces';
import { CustomValidation } from '../shared/Validations';
import { TMatchChampionship } from './Interfaces';

const MatchesClubCUModal: React.FC<IFormModal> = ({ isOpen, onClose, title, isLoading, onSubmitHandler, initialValues }) => {
  const { data: championships } = useSWR(getAllChampionshipsSWRKey, fetcher);
  const championshipOptions: TMatchChampionship[] = useMemo(() => championships?.map((obj: TMatchChampionship) => ({ ...obj, key: nanoid() })) || [], [championships]);

  return (
    <Modal {...{ isOpen, onClose, blockScrollOnMount: true, isCentered: true, closeOnOverlayClick: !isLoading, size: '2xl' }}>
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
                  <Flex {...{ as: 'form', onSubmit: handleSubmit, id: 'common-cu-modal', display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
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
                                    content: initialValues?.title && !touched ? `"${values?.title?.toLowerCase()}.png"` : touched && !error ? '"Fisier adaugat ✓"' : '"Selecteaza imaginea de profile"',
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
                        name: 'title',
                        validate: (value: string) => CustomValidation(value, 'Numele', 3, 30),
                        render: ({ input, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Nume', w: '140px' }} />
                              <Input
                                {...{
                                  ...input,
                                  type: 'text',
                                  isInvalid: touched && error,
                                  placeholder: 'Introduceti numele ',
                                }}
                              />
                            </InputGroup>
                          </Tooltip>
                        ),
                      }}
                    />
                    <Field
                      {...{
                        name: 'championshipId',
                        validate: (value: string) => CustomValidation(value, 'Campionatul'),
                        render: ({ input, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Campionat', w: '140px' }} />
                              <Select
                                {...{
                                  isInvalid: touched && error,
                                  placeholder: 'Alegeti campionatul',
                                  ...input,
                                  borderTopLeftRadius: 0,
                                  borderBottomLeftRadius: 0,
                                  _placeholder: {
                                    color: 'var(--grey-alpha-3)',
                                  },
                                }}
                              >
                                {championshipOptions?.map(({ title, key, id }) => (
                                  <option key={key} {...{ value: id }}>
                                    {title}
                                  </option>
                                ))}
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
          <Button {...{ variant: 'solid', background: 'var(--blue-600)', color: 'var(--white-color)', colorScheme: 'blue', type: 'submit', form: 'common-cu-modal', disabled: isLoading, isLoading }}>
            {'Salveaza'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default MatchesClubCUModal;
