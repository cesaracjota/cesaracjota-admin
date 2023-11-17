import React, { useEffect } from 'react';
import { Box, Center, Stack, Avatar, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastChakra } from '../../helpers/toast';
import { Loading } from '../../helpers/Loading';
import { getAllMensajes, reset } from '../../features/mensajeSlice';
import DetallesMensaje from './DetallesMensaje';
import { AlertaEliminar } from './AlertEliminar';
import moment from 'moment';
import { PuffLoader } from 'react-spinners';
import TablaMensajes from './TablaMensajes';

const Mensajes = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const { mensajes, isLoading, isError, message } = useSelector((state) => state.mensajes);

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

                dispatch(getAllMensajes())

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
            Header: 'USUARIO',
            accessor: 'nombres_usuario',
            Cell: ({ row }) => (
                <Stack spacing={2} direction={{ base: "column", lg: "row" }}>
                    <Avatar
                        size="sm"
                        name={row.original.nombres_usuario}
                        fontWeight="bold"
                        fontSize="xs"
                        color="white"
                        alignSelf={'center'}
                        display={{
                            base: 'none',
                            lg: 'flex'
                        }}
                    />
                    <Text ml={2} alignSelf={'center'} fontSize="13px" noOfLines={1}>{row.original.nombres_usuario}</Text>
                </Stack>
            )
        },
        {
            Header: 'CORREO',
            accessor: 'email',
        },
        {
            Header: 'TELEFONO',
            accessor: 'telefono',
        },
        {
            Header: 'FECHA DE ENVIO',
            accessor: 'createdAt',
            Cell: ({ value }) => moment(value.createdAt).format('YYYY-MM-DD - H:mm:ss A')
        },
        {
            Header: 'ACCIONES',
            accessor: 'acciones',
            Cell: ({ row }) => (
                <Center>
                    <DetallesMensaje row={row.original} />
                    <AlertaEliminar row={row.original} />
                </Center>
            ),
        },
    ];

    return (
        <>
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
                        <TablaMensajes columns={columns || []} data={mensajes || []} />
                    )
                }
            </Box>
        </>
    );
};

export default Mensajes;