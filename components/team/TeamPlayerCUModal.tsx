import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Textarea,
  Tooltip,
} from '@chakra-ui/react';
import { FormApi } from 'final-form';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import { Field, Form } from 'react-final-form';
import { getAllCategoriesSWRKey, getAllEditionsSWRKey } from '../../services/Team.service';
import { convertFileToBase64URL, fetcher, getNationalities } from '../../utils';
import { IFormModal } from '../shared/Interfaces';
import { CustomValidation } from '../shared/Validations';
import { TTeamCategory, TTeamEdition } from './Interfaces';
import useSWR from 'swr';

const TeamPlayerCUModal: React.FC<IFormModal> = ({ isOpen, onClose, title, isLoading, onSubmitHandler, initialValues }) => {
  const { data: categories } = useSWR(getAllCategoriesSWRKey, fetcher);
  const categoryOptions: TTeamCategory[] = useMemo(() => categories?.map((obj: TTeamCategory) => ({ ...obj, key: nanoid() })) || [], [categories]);
  const nationalityOptions = useMemo(() => getNationalities(), []);
  const { data: edition } = useSWR(getAllEditionsSWRKey, fetcher);
  const editionOptions: TTeamEdition[] = useMemo(() => edition?.map((obj: TTeamEdition) => ({ ...obj, key: nanoid() })) || [], [edition]);
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
                                        : '"Selecteaza imaginea de profile"',
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
                    <Flex {...{ w: '100%', justifyContent: 'space-between', gap: 'var(--gap-md)' }}>
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
                                    placeholder: 'Introduceti numele jucatorului',
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
                                    placeholder: 'Introduceti prenumele jucatorului',
                                  }}
                                />
                              </InputGroup>
                            </Tooltip>
                          ),
                        }}
                      />
                    </Flex>
                    <Flex {...{ w: '100%', justifyContent: 'space-between', gap: 'var(--gap-md)' }}>
                      <Field
                        {...{
                          name: 'position',
                          validate: (value: string) => CustomValidation(value, 'Pozitia'),
                          render: ({ input, meta: { touched, error } }) => (
                            <Tooltip {...{ label: touched && error ? error : '' }}>
                              <InputGroup>
                                <InputLeftAddon {...{ children: 'Pozitia', w: '140px' }} />
                                <Select
                                  {...{
                                    isInvalid: touched && error,
                                    placeholder: 'Alegeti pozitia jucatorului',
                                    ...input,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                  }}
                                >
                                  {<option {...{ value: 'În față - Stânga' }}>{'În față - Stânga'}</option>}
                                  {<option {...{ value: 'În față - Centru' }}>{'În față - Centru'}</option>}
                                  {<option {...{ value: 'În față - Dreapta' }}>{'În față - Dreapta'}</option>}
                                  {<option {...{ value: 'În spate - Stânga' }}>{'În spate - Stânga'}</option>}
                                  {<option {...{ value: 'În spate - Centru' }}>{'În spate - Centru'}</option>}
                                  {<option {...{ value: 'În spate - Dreapta' }}>{'În spate - Dreapta'}</option>}
                                </Select>
                              </InputGroup>
                            </Tooltip>
                          ),
                        }}
                      />
                      <Field
                        {...{
                          name: 'height',
                          validate: (value: string) => CustomValidation(value, 'înaltimea'),
                          render: ({ input, meta: { touched, error } }) => (
                            <Tooltip {...{ label: touched && error ? error : '' }}>
                              <InputGroup>
                                <InputLeftAddon {...{ children: 'Înălțime', w: '140px' }} />
                                <Input
                                  {...{
                                    ...input,
                                    type: 'number',
                                    min: 120,
                                    max: 220,
                                    isInvalid: touched && error,
                                    placeholder: 'Introduceti înălțimea jucatorului',
                                  }}
                                />
                                <InputRightAddon {...{ children: 'cm' }} />
                              </InputGroup>
                            </Tooltip>
                          ),
                        }}
                      />
                    </Flex>
                    <Flex {...{ w: '100%', justifyContent: 'space-between', gap: 'var(--gap-md)' }}>
                      <Field
                        {...{
                          name: 'shirtNumber',
                          validate: (value: string) => CustomValidation(value, 'Numarul de jucator'),
                          render: ({ input, meta: { touched, error } }) => (
                            <Tooltip {...{ label: touched && error ? error : '' }}>
                              <InputGroup>
                                <InputLeftAddon {...{ children: 'Numar', w: '140px' }} />
                                <NumberInput {...{ ...input, onChange: (value) => input.onChange(Number(value)), w: '100%', min: 0, max: 30, isInvalid: touched && error }}>
                                  <NumberInputField {...{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} />
                                  <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                  </NumberInputStepper>
                                </NumberInput>
                              </InputGroup>
                            </Tooltip>
                          ),
                        }}
                      />
                      <Field
                        {...{
                          name: 'nationality',
                          validate: (value: string) => CustomValidation(value, 'Nationalitatea'),
                          render: ({ input, meta: { touched, error } }) => (
                            <Tooltip {...{ label: touched && error ? error : '' }}>
                              <InputGroup>
                                <InputLeftAddon {...{ children: 'Nationalitate', w: '140px' }} />
                                <Select
                                  {...{
                                    isInvalid: touched && error,
                                    placeholder: 'Alegeti nationalitatea',
                                    ...input,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                  }}
                                >
                                  {nationalityOptions?.map(({ title, key }) => (
                                    <option key={key} {...{ value: title }}>
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
                    <Flex {...{ w: '100%', justifyContent: 'space-between', gap: 'var(--gap-md)' }}>
                      <Field
                        {...{
                          name: 'categoryId',
                          validate: (value: string) => CustomValidation(value, 'Lotul'),
                          render: ({ input, meta: { touched, error } }) => (
                            <Tooltip {...{ label: touched && error ? error : '' }}>
                              <InputGroup>
                                <InputLeftAddon {...{ children: 'Lot', w: '140px' }} />
                                <Select
                                  {...{
                                    isInvalid: touched && error,
                                    placeholder: 'Alegeti lotul',
                                    ...input,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                    _placeholder: {
                                      color: 'var(--grey-alpha-3)',
                                    },
                                  }}
                                >
                                  {categoryOptions?.map(({ title, key, id }) => (
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
                      <Field
                        {...{
                          name: 'editionId',
                          validate: (value: string) => CustomValidation(value, 'Editia'),
                          render: ({ input, meta: { touched, error } }) => (
                            <Tooltip {...{ label: touched && error ? error : '' }}>
                              <InputGroup>
                                <InputLeftAddon {...{ children: 'Editia', w: '140px' }} />
                                <Select
                                  {...{
                                    isInvalid: touched && error,
                                    placeholder: 'Alegeti editia',
                                    ...input,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                    _placeholder: {
                                      color: 'var(--grey-alpha-3)',
                                    },
                                  }}
                                >
                                  {editionOptions?.map(({ title, key, id }) => (
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
                    <Field
                      {...{
                        name: 'birthday',
                        validate: (value: string) => CustomValidation(value, 'Data nasterii'),
                        render: ({ input, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Data nasterii', w: '140px' }} />
                              <Input
                                {...{
                                  ...input,
                                  type: 'date',
                                  isInvalid: touched && error,
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
export default TeamPlayerCUModal;
