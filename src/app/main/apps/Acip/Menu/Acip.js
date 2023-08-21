import _ from '@lodash'
import { useDeepCompareEffect, useThemeMediaQuery } from '@fuse/hooks'
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading'
import FusePageCarded from '@fuse/core/FusePageCarded/FusePageCarded'
import {
    Box,
    Dialog,
    Typography,
    Button,
    AppBar,
    Toolbar,
    Slide,
    Grid,
    IconButton,
    TextField,
    MenuItem,
} from '@mui/material'
import { motion } from 'framer-motion'
import { SaveAs } from '@mui/icons-material'
import { useEffect, useMemo, useState, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { Controller, useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { selectUser } from 'app/store/userSlice'

import {
    getGenbaAcip,
    selectGenbaAcip,
    saveGenbaAcip,
    resetGenbaAcip,
} from '../store/genba/genbaAcipSlice'

import AcipHeader from './AcipHeader'
import AcipFormulir from './AcipFormulir'

const schema = yup.object().shape({
    dept: yup.string().required('Require dept name').min(3).max(11),
})

function Acip() {
    const dispatch = useDispatch()
    const genba = useSelector(selectGenbaAcip)
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const [isNoGenba, setIsNoGenba] = useState(false)
    const user = useSelector(selectUser)

    useDeepCompareEffect(() => {
        function updateGenba() {
            dispatch(getGenbaAcip()).then((action) => {
                if (!action.payload) {
                    setIsNoGenba(true)
                }
            })
        }
        updateGenba()
    }, [dispatch])

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema),
    })

    const {
        control,
        formState,
        watch,
        getValues,
        setValue,
        getFieldState,
        reset,
    } = methods

    const form = watch()

    useEffect(() => {
        const data = genba
        console.log('refrsh')
        if (!genba) {
            return
        }
        reset(data)
    }, [genba, reset])

    useEffect(() => {
        return () => {
            dispatch(resetGenbaAcip())
            setIsNoGenba(false)
        }
    }, [dispatch])

    if (isNoGenba) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.1 } }}
                className="flex flex-col flex-1 items-center justify-center h-full"
            >
                <Typography color="text.secondary" varian="h5">
                    There is no such data!
                </Typography>
                <Button
                    className="mt-24"
                    component={Link}
                    variant="outlined"
                    to="/apps/madbusApp/address"
                    color="inherit"
                >
                    Go to Address Page
                </Button>
            </motion.div>
        )
    }

    if (_.isEmpty(form) || !genba) {
        return <FuseLoading />
    }

    return (
        <FormProvider {...methods}>
            <FusePageCarded
                header={<AcipHeader />}
                content={
                    <>
                        <AcipFormulir />
                    </>
                }
                scroll={isMobile ? 'normal' : 'content'}
            />
        </FormProvider>
    )
}

export default Acip
