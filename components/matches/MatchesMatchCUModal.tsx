import { Button, Flex, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Tooltip } from '@chakra-ui/react';
import { FormApi } from 'final-form';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import { Field, Form } from 'react-final-form';
import useSWR from 'swr';
import { getAllChampionshipsSWRKey, getAllClubsSWRKey } from '../../services/Match.service';
import { getAllEditionsSWRKey } from '../../services/Team.service';
import { fetcher } from '../../utils';
import { IFormModal } from '../shared/Interfaces';
import { CustomDateValidation, CustomValidation, UrlValidation } from '../shared/Validations';
import { TTeamEdition } from '../team/Interfaces';
import { TMatchChampionship, TMatchClub } from './Interfaces';

const MatchesMatchCUModal: React.FC<IFormModal> = ({ isOpen, onClose, title, isLoading, onSubmitHandler, initialValues }) => {
  const { data: championships } = useSWR(getAllChampionshipsSWRKey, fetcher);
  const championshipOptions: TMatchChampionship[] = useMemo(() => championships?.map((obj: TMatchChampionship) => ({ ...obj, key: nanoid() })) || [], [championships]);
  const { data: edition } = useSWR(getAllEditionsSWRKey, fetcher);
  const editionOptions: TTeamEdition[] = useMemo(() => edition?.map((obj: TTeamEdition) => ({ ...obj, key: nanoid() })) || [], [edition]);

  const { data: clubs } = useSWR(getAllClubsSWRKey, fetcher);
  const clubOptions: TMatchClub[] = useMemo(() => clubs?.map((obj: TMatchClub) => ({ ...obj, key: nanoid() })) || [], [clubs]);

  const scoreOptions = useMemo(
    () =>
      Array(30)
        .fill(1)
        .map((_, index: number) => ({ key: nanoid(), value: index })),
    []
  );

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
                  <Flex {...{ as: 'form', onSubmit: handleSubmit, id: 'common-cu-modal', display: 'flex', flexDirection: 'column', gap: 'var(--gap-md)' }}>
                    <Field
                      {...{
                        name: 'link',
                        validate: (value: string) => UrlValidation(value),
                        render: ({ input, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Link' }} />
                              <Input
                                {...{
                                  ...input,
                                  type: 'text',
                                  isInvalid: touched && error,
                                  placeholder: 'Introduceti un link pentru vizualizare live',
                                }}
                              />
                            </InputGroup>
                          </Tooltip>
                        ),
                      }}
                    />

                    <Flex {...{ w: '100%', gap: 'var(--gap-md)', alignItems: 'center' }}>
                      <Field
                        {...{
                          name: 'dateTime',
                          validate: (value: string) => CustomDateValidation(value, Boolean(String(values.scoreClubOne) || String(values.scoreClubTwo))),
                          render: ({ input, meta: { touched, error } }) => (
                            <Tooltip {...{ label: touched && error ? error : '' }}>
                              <InputGroup>
                                <InputLeftAddon {...{ children: 'Data si Ora', w: '160px' }} />
                                <Input
                                  {...{
                                    ...input,
                                    type: 'datetime-local',
                                    isInvalid: touched && error,
                                    placeholder: 'Introduceti data si ora ',
                                  }}
                                />
                              </InputGroup>
                            </Tooltip>
                          ),
                        }}
                      />
                      <Field
                        {...{
                          name: 'location',
                          validate: (value: string) => CustomValidation(value, 'Locatia'),
                          render: ({ input, meta: { touched, error } }) => (
                            <Tooltip {...{ label: touched && error ? error : '' }}>
                              <InputGroup>
                                <InputLeftAddon {...{ children: 'Locatia', w: '190px' }} />
                                <Input
                                  {...{
                                    ...input,
                                    type: 'text',
                                    isInvalid: touched && error,
                                    placeholder: 'Introduceti locatia unde se desfasoara meciul',
                                  }}
                                />
                              </InputGroup>
                            </Tooltip>
                          ),
                        }}
                      />
                    </Flex>

                    <Flex {...{ w: '100%', gap: 'var(--gap-md)', alignItems: 'center' }}>
                      <Field
                        {...{
                          name: 'championshipId',
                          validate: (value: string) => CustomValidation(value, 'Campionatul'),
                          render: ({ input, meta: { touched, error } }) => (
                            <Tooltip {...{ label: touched && error ? error : '' }}>
                              <InputGroup>
                                <InputLeftAddon {...{ children: 'Campionat', w: '160px' }} />
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
                      <Field
                        {...{
                          name: 'editionId',
                          validate: (value: string) => CustomValidation(value, 'Editia'),
                          render: ({ input, meta: { touched, error } }) => (
                            <Tooltip {...{ label: touched && error ? error : '' }}>
                              <InputGroup>
                                <InputLeftAddon {...{ children: 'Editia', w: '190px' }} />
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
                    <Flex {...{ w: '100%', gap: 'var(--gap-md)', alignItems: 'center', padding: '10px', border: '1px solid var(--blue-600)', borderRadius: '16px' }}>
                      <Field
                        {...{
                          name: 'clubOneId',
                          validate: (value: string) => CustomValidation(value, 'Acasă'),
                          render: ({ input, meta: { touched, error } }) => (
                            <Tooltip {...{ label: touched && error ? error : '' }}>
                              <InputGroup>
                                <InputLeftAddon {...{ children: 'Echipă Acasă', w: '160px' }} />
                                <Select
                                  {...{
                                    isInvalid: touched && error,
                                    placeholder: 'Alegeti club',
                                    ...input,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                    _placeholder: {
                                      color: 'var(--grey-alpha-3)',
                                    },
                                  }}
                                >
                                  {clubOptions?.map(
                                    ({ title, key, id }) =>
                                      id !== Number(values.clubTwoId) && (
                                        <option key={key} {...{ value: id }}>
                                          {title}
                                        </option>
                                      )
                                  )}
                                </Select>
                              </InputGroup>
                            </Tooltip>
                          ),
                        }}
                      />
                      <Text>{'VS'}</Text>
                      <Field
                        {...{
                          name: 'clubTwoId',
                          validate: (value: string) => CustomValidation(value, 'Echipă Deplasare'),
                          render: ({ input, meta: { touched, error } }) => (
                            <Tooltip {...{ label: touched && error ? error : '' }}>
                              <InputGroup>
                                <InputLeftAddon {...{ children: 'Echipă Deplasare', w: '190px' }} />
                                <Select
                                  {...{
                                    isInvalid: touched && error,
                                    placeholder: 'Alegeti club',
                                    ...input,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                    _placeholder: {
                                      color: 'var(--grey-alpha-3)',
                                    },
                                  }}
                                >
                                  {clubOptions?.map(
                                    ({ title, key, id }) =>
                                      id !== Number(values.clubOneId) && (
                                        <option key={key} {...{ value: id }}>
                                          {title}
                                        </option>
                                      )
                                  )}
                                </Select>
                              </InputGroup>
                            </Tooltip>
                          ),
                        }}
                      />
                    </Flex>
                    <Flex {...{ w: '100%', gap: 'var(--gap-md)', alignItems: 'center' }}>
                      <Field
                        {...{
                          name: 'scoreClubOne',
                          render: ({ input, meta: { touched, error } }) => (
                            <Tooltip {...{ label: touched && error ? error : '' }}>
                              <InputGroup>
                                <InputLeftAddon {...{ children: 'Scor Echipă Acasă', w: '160px' }} />
                                <Select
                                  {...{
                                    isInvalid: touched && error,
                                    placeholder: 'Alegeti scor',
                                    ...input,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                    _placeholder: {
                                      color: 'var(--grey-alpha-3)',
                                    },
                                  }}
                                >
                                  {scoreOptions?.map(({ key, value }) => (
                                    <option key={key} {...{ value }}>
                                      {value}
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
                          name: 'scoreClubTwo',
                          render: ({ input, meta: { touched, error } }) => (
                            <Tooltip {...{ label: touched && error ? error : '' }}>
                              <InputGroup>
                                <InputLeftAddon {...{ children: 'Scor Echipă Deplasare', w: '190px' }} />
                                <Select
                                  {...{
                                    isInvalid: touched && error,
                                    placeholder: 'Alegeti scor',
                                    ...input,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                    _placeholder: {
                                      color: 'var(--grey-alpha-3)',
                                    },
                                  }}
                                >
                                  {scoreOptions?.map(({ key, value }) => (
                                    <option key={key} {...{ value }}>
                                      {value}
                                    </option>
                                  ))}
                                </Select>
                              </InputGroup>
                            </Tooltip>
                          ),
                        }}
                      />
                    </Flex>
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
export default MatchesMatchCUModal;
