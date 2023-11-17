import { useEffect } from 'react';
import { Box, Center, Stack, Avatar, Badge, Text, Spacer } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, reset } from '../../features/userSlice';
import { ToastChakra } from '../../helpers/toast';
import { AlertaEliminar } from './AlertEliminar';
import { ModalAgregarUsuario } from './ModalAgregarUsuario';
import { Loading } from '../../helpers/Loading';
import { ModalEditarUsuario } from './ModalEditarUsuario';
import { PuffLoader } from 'react-spinners';
import TablaUsuarios from './TablaUsuarios';

const Usuarios = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { users, isLoading, isError, message } = useSelector((state) => state.users);

  useEffect(() => {

    async function loadUsers() {
      try {

        if (!user) {
          navigate("/login");
        }

        if (isError) {
          ToastChakra('Error', message, 'error', 1500);
          console.log(message);
        }

        dispatch(getAllUsers())

        return () => {
          dispatch(reset())
        }

      } catch (error) {
        console.log(error);
        ToastChakra('Error', error.message, 'error', 1500);
      }
    }

    loadUsers();

  }, [user, navigate, dispatch, isError, message]);

  const columns = [
    {
      Header: 'NOMBRES',
      accessor: 'name',
      Cell: ({ row }) => (
        <Stack spacing={2} direction={{ base: "column", lg: "row" }}>
          <Avatar
            size="sm"
            name={row.original.name}
            src={row.original.image}
            bg='purple.500'
            fontSize="xs"
            color="white"
            alignSelf={'center'}
            display={{
              base: 'none',
              lg: 'flex'
            }}
          />
          <Text ml={2} alignSelf={'center'} fontSize="13px" noOfLines={1}>{row.original.name}</Text>
        </Stack>
      )
    },
    {
      Header: 'USERNAME',
      accessor: 'username',
    },
    {
      Header: 'CORREO',
      accessor: 'email',
    },
    {
      Header: 'ROL',
      accessor: 'role',
      Cell: ({ value }) => (
        <Badge
          bg={value === 'ADMIN' ? 'messenger.600' : 'red.600'}
          variant="solid"
          w={'full'}
          textAlign="center"
          py={2}
          px={4}
          rounded="md"
          color="white"
        >
          {value === 'ADMIN' ? 'ADMINISTRADOR' : 'USUARIO'}
        </Badge>
      )
    },
    {
      Header: 'ESTADO',
      accessor: 'estado',
      Cell: ({ value }) => (
        <Badge
          bg={value === 'ACTIVO' ? 'green.600' : 'red.600'}
          variant="solid"
          w={'full'}
          textAlign="center"
          py={2}
          px={4}
          rounded="md"
        >
          {value}
        </Badge>
      ),
    },
    {
      Header: 'ACCIONES',
      accessor: 'acciones',
      exports: false,
      Cell: ({ row }) => (
        <Center>
          <ModalEditarUsuario row={row.original} />
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
        <ModalAgregarUsuario />
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
            <TablaUsuarios columns={columns || []} data={users || []} />
          )
        }
      </Box>
    </>
  );
};

export default Usuarios;