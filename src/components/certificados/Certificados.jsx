import React, { useEffect } from 'react';
import 'react-data-table-component-extensions/dist/index.css';
import { Box, Stack, Badge, Avatar, Center, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastChakra } from '../../helpers/toast';
import { AlertaEliminar } from './AlertEliminar';
import { Loading } from '../../helpers/Loading';
import { getAllCertificados, reset } from '../../features/certificadoSlice';
import { ModalAgregarCertificado } from './ModalAgregarCertificado';
import { ModalEditarCertificado } from './ModalEditarCertificado';
import { PuffLoader  } from 'react-spinners';
import TablaCertificados from './TablaCertificados';

const Certificados = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { certificados, isLoading, isError, message } = useSelector((state) => state.certificados);

  useEffect(() => {

    async function loadCertificados() {
      try {

        if (!user) {
          navigate("/login");
        }

        if (isError) {
          ToastChakra('Error', message, 'error', 1500);
          console.log(message);
        }

        dispatch(getAllCertificados())

        return () => {
          dispatch(reset())
        }

      } catch (error) {
        console.log(error);
        ToastChakra('Error', error.message, 'error', 1500);
      }
    }

    loadCertificados();

  }, [user, navigate, dispatch, isError, message]);

  const columns = [
    {
      Header: 'LOGO',
      accessor: 'logo',
      Cell: ({ value }) => <Avatar boxSize="10" src={value?.secure_url} alt="Logo" />,
      width: 100,
    },
    {
      Header: 'TITULO',
      accessor: 'title',
    },
    {
      Header: 'HOVER TITLE',
      accessor: 'hover_title',
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
          <ModalEditarCertificado row={row.original} />
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
        <ModalAgregarCertificado />
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
            <TablaCertificados columns={columns || []} data={certificados || []} />
          )
        }
      </Box>
    </>
  );
};

export default Certificados;