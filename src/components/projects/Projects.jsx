import React, { useEffect } from 'react';
import { useColorModeValue, Spacer, Box, Stack, Center, Badge, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastChakra } from '../../helpers/toast';
import { AlertaEliminar } from './AlertEliminar';
import { Loading } from '../../helpers/Loading';
import { PuffLoader } from 'react-spinners';
import { getAllProjects, reset } from '../../features/projectSlice';
import { ModalEditarProyecto } from './ModalEditarProyecto';
import { ModalAgregarProyecto } from './ModalAgregarProyecto';
import TablaProyectos from './TablaProyecto';

export const Projects = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const themeTable = useColorModeValue('default', 'solarized');

  const { user } = useSelector((state) => state.auth);

  const { projects, isLoading, isError, message } = useSelector((state) => state.projects);

  useEffect(() => {

    async function loadData() {
      try {

        if (!user) {
          navigate("/login");
        }

        if (isError) {
          ToastChakra('Error', message, 'error', 1500);
          console.log(message);
        }

        dispatch(getAllProjects())

        return () => {
          dispatch(reset())
        }

      } catch (error) {
        console.log(error);
        ToastChakra('Error', error.message, 'error', 1500);
      }
    }

    loadData();

  }, [user, navigate, dispatch, isError, message]);

  const columns = [
    {
      Header: 'TITULO DE PROYECTO',
      accessor: 'title',
    },
    {
      Header: 'PARTICIPANTES',
      accessor: 'authors',
      Cell: ({ value }) => (
        <>
          <Text>{value.join(', ')}</Text>
        </>
      )
    },
    {
      Header: 'ETIQUETAS',
      accessor: 'topics',
      Cell: ({ value }) => (
        <>
          <Text>{value.join(', ')}</Text>
        </>
      )
    },
    {
      Header: 'ESTADO',
      accessor: 'estado',
      Cell: ({ value }) => (
        <Center>
          <Badge
            bg={value === 'ACTIVO' ? 'green.600' : 'red.600'}
            variant="solid"
            w={'full'}
            textAlign="center"
            py={1.5}
            px={4}
            rounded="md"
          >
            {value}
          </Badge>
        </Center>
      ),
      style: { textAlign: 'center' },
    },
    {
      Header: 'ACCIONES',
      accessor: 'acciones',
      exports: false,
      Cell: ({ row }) => (
        <Center>
          <ModalEditarProyecto row={row.original} />
          <AlertaEliminar row={row.original} />
        </Center>
      ),
    },
  ];

  return (
    <>
      <Stack direction="row" justifyContent="space-between" p={4} boxShadow={'base'}
        bg="white"
        _dark={{
          bg: "primary.1000",
        }}
        borderRadius={'md'}>
        <Spacer />
        <ModalAgregarProyecto />
      </Stack>

      <Box
        overflow="hidden"
        boxShadow={'base'}
        bg="white"
        _dark={{
          bg: "primary.1000",
        }}
        borderRadius={'md'}
        mt={2}
        pt={2}
      >
        {
          isLoading ? (
            <Loading>
              <PuffLoader color="#805ad5" loading={true} size={120} />
            </Loading>
          ) : (
            <TablaProyectos columns={columns || []} data={projects || []} />
          )
        }
      </Box>
    </>
  );
};