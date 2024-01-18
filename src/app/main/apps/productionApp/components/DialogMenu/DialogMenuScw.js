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
        area: yup.string().required('Required'),
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

    useEffect(() => {
        !_.has(params.data, 'uuid') ? setTabValue('1') : setTabValue('2')
    }, [])

    useEffect(() => {
        if (!params) {
            return
        }
        console.log(_.has(params.data, 'uuid'))

        reset(params.data)
    }, [params])

    return (
        <FormProvider {...methods}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleTabChange}>
                        {!_.has(params.data, 'uuid') && (
                            <Tab label="SCW-INPUT" value="1" />
                        )}
                        {_.has(params.data, 'uuid') && (
                            <Tab label="SCW-UPDATE" value="2" />
                        )}
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Dialog2 params={params.data} />
                </TabPanel>
                <TabPanel value="2">
                    <Dialog1 params={params.data} />
                </TabPanel>

                {/* {!_.has(params.data, 'uuid') && (
                    <TabPanel value="1">
                        <Dialog2 params={params.data} />
                    </TabPanel>
                )}
                {_.has(params.data, 'uuid') && (
                    <TabPanel value="2">
                        <Dialog1 params={params.data} />
                    </TabPanel>
                )} */}
            </TabContext>
        </FormProvider>
    )
}

export default DialogMenuScw
