import { useEffect, useState } from 'react'
import { Box, Tab } from '@mui/material'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, FormProvider } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import _ from 'lodash'
import userSlice from 'app/store/userSlice'

import Dialog1 from './Dialog1'
import Dialog2 from './Dialog2'

function DialogMenuScw({ params }) {
    const dispatch = useDispatch()
    const [tabValue, setTabValue] = useState('1')

    const schema = yup.object().shape({
        mch_code: yup.string().required('Required'),
        problem: yup.string().required('Required'),
    })

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema),
    })

    const { reset, formState, watch } = methods

    const { errors, isValid } = formState

    function handleTabChange(event, value) {
        setTabValue(value)
    }

    function hasFrom() {
        return !_.has(params.data, 'uuid') ? 'INPUT' : 'UPDATE'
    }

    useEffect(() => {
        if (!params) {
            return
        }
        reset(params.data)
    }, [params])

    return (
        <FormProvider {...methods}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleTabChange}>
                        <Tab label="SCW-INPUT" value="1" />
                        <Tab label="SCW-UPDATE" value="2" />
                    </TabList>
                </Box>

                <TabPanel value="1">
                    <Dialog2 params={params.data} hasForm={hasFrom()} />
                </TabPanel>
                <TabPanel value="2">
                    <Dialog1 params={params.data} hasForm={hasFrom()} />
                </TabPanel>
            </TabContext>
        </FormProvider>
    )
}

export default DialogMenuScw
