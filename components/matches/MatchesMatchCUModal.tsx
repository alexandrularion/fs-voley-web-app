import { Button, Flex, Input, InputGroup, InputLeftAddon, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, Tooltip } from '@chakra-ui/react';
import { FormApi } from 'final-form';
import { nanoid } from 'nanoid';
import { useMemo } from 'react';
import { Field, Form } from 'react-final-form';
import useSWR from 'swr';
import { getAllChampionshipsSWRKey } from '../../services/Match.service';
import { getAllEditionsSWRKey } from '../../services/Team.service';
import { fetcher } from '../../utils';
import { IFormModal } from '../shared/Interfaces';
import { CustomValidation, UrlValidation } from '../shared/Validations';
import { TTeamEdition } from '../team/Interfaces';
import { TMatchChampionship, TMatchClub } from './Interfaces';

const MatchesMatchCUModal: React.FC<IFormModal> = ({ isOpen, onClose, title, isLoading, onSubmitHandler, initialValues }) => {
  const { data: championships } = useSWR(getAllChampionshipsSWRKey, fetcher);
  const championshipOptions: TMatchChampionship[] = useMemo(() => championships?.map((obj: TMatchChampionship) => ({ ...obj, key: nanoid() })) || [], [championships]);
  const { data: edition } = useSWR(getAllEditionsSWRKey, fetcher);
  const editionOptions: TTeamEdition[] = useMemo(() => edition?.map((obj: TTeamEdition) => ({ ...obj, key: nanoid() })) || [], [edition]);

  const { data: clubs } = useSWR(getAllChampionshipsSWRKey, fetcher);
  const clubOptions: TMatchClub[] = useMemo(() => clubs?.map((obj: TMatchClub) => ({ ...obj, key: nanoid() })) || [], [clubs]);

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
                render: ({ handleSubmit }) => (
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
                    <Field
                      {...{
                        name: 'dateTime',
                        validate: (value: string) => CustomValidation(value, 'Data si Ora'),
                        render: ({ input, meta: { touched, error } }) => (
                          <Tooltip {...{ label: touched && error ? error : '' }}>
                            <InputGroup>
                              <InputLeftAddon {...{ children: 'Data si Ora' }} />
                              <Input
                                {...{
                                  ...input,
                                  type: 'date',
                                  isInvalid: touched && error,
                                  placeholder: 'Introduceti data si ora ',
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
                          name: 'clubOneId',
                          validate: (value: string) => CustomValidation(value, 'Primul club'),
                          render: ({ input, meta: { touched, error } }) => (
                            <Tooltip {...{ label: touched && error ? error : '' }}>
                              <InputGroup>
                                <InputLeftAddon {...{ children: 'Primul Club', w: '140px' }} />
                                <Select
                                  {...{
                                    isInvalid: touched && error,
                                    placeholder: 'Alegeti club',
                                    ...input,
                                    defaultValue: 1,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                    disabled: true,
                                    _placeholder: {
                                      color: 'var(--grey-alpha-3)',
                                    },
                                  }}
                                >
                                  {clubOptions?.map(({ title, key, id }) => (
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
                      <Text>{'VS'}</Text>
                      <Field
                        {...{
                          name: 'clubTwoId',
                          validate: (value: string) => CustomValidation(value, 'Al doilea club'),
                          render: ({ input, meta: { touched, error } }) => (
                            <Tooltip {...{ label: touched && error ? error : '' }}>
                              <InputGroup>
                                <InputLeftAddon {...{ children: 'Al Doilea Club', w: '140px' }} />
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
                                  {clubOptions?.map(({ title, key, id }) => (
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
