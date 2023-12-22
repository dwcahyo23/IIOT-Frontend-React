import { useEffect, useState } from 'react'
import { Box, Tab } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import dayjs from 'dayjs'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { getGenbaAcip, selectGenba } from '../store/genba/genbaAcipSlice'
import Tab1 from './MenuTab/Tab1'
import Tab2 from './MenuTab/Tab2'
import Tab3 from './MenuTab/Tab3'

import { selectUser } from 'app/store/userSlice'
import { showMessage } from 'app/store/fuse/messageSlice'

const schema = yup.object().shape({
    id: yup.string().required('Require id').min(11),
    b_r1: yup.number().min(0).max(30).default(0),
    b_r2: yup.number().min(0).max(30).default(0),
    b_r3: yup.number().min(0).max(30).default(0),
    b_r4: yup.number().min(0).max(30).default(0),
    b_r5: yup.number().min(0).max(30).default(0),
    a_r1: yup.number().min(0).max(30).default(0),
    a_r2: yup.number().min(0).max(30).default(0),
    a_r3: yup.number().min(0).max(30).default(0),
    a_r4: yup.number().min(0).max(30).default(0),
    a_r5: yup.number().min(0).max(30).default(0),
})

function AcipDialog({ params, useDelete }) {
    // console.log(data)
    const dispatch = useDispatch()
    const genba = useSelector(selectGenba)
    const [tabValue, setTabValue] = useState('1')

    useEffect(() => {
        const getId = (id) => {
            dispatch(getGenbaAcip(id))
        }

        if (params) {
            getId(params.id_genba)
        }
    }, [params])

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema),
    })

    const { reset, formState } = methods

    const { errors, isValid } = formState

    useEffect(() => {
        if (!genba) {
            return
        }
        reset(genba)
    }, [genba, reset])

    function handleTabChange(event, value) {
        setTabValue(value)
    }
    const withDelete = (data) => {
        useDelete(data)
    }

    return (
        <FormProvider {...methods}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        onChange={handleTabChange}
                        aria-label="lab API tabs example"
                    >
                        <Tab label="Genba Acip 5R" value="1" />
                        <Tab label="Genba Before" value="2" />
                        <Tab label="Genba Afer" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Tab1 useDelete={withDelete} />
                </TabPanel>
                <TabPanel value="2">
                    <Tab2 />
                </TabPanel>
                <TabPanel value="3">
                    <Tab3 />
                </TabPanel>
            </TabContext>
        </FormProvider>
    )
}

export default AcipDialog
