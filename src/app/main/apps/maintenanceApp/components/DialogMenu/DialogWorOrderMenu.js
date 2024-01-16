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
import { Link, useParams } from 'react-router-dom'

import { filteredErpsByMonth } from '../../store/erpStore/erpMnSlices'
import DialogMenu1 from './DialogMenu1'
import DialogMenu2 from './DialogMenu2'
import DialogMenu3 from './DialogMenu3'
import DialogMenu4 from './DialogMenu4'

const schema = yup.object().shape({})

function DialogWorkOrderMenu({ params }) {
    const dispatch = useDispatch()
    const filterData = useSelector(filteredErpsByMonth)
    const [tabValue, setTabValue] = useState('1')
    const routeParams = useParams()

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema),
    })

    const { reset, formState, watch } = methods

    const { errors, isValid } = formState

    useEffect(() => {
        const data = _.find(filterData, { sheet_no: params.data.sheet_no })

        if (!data) {
            return
        }
        reset(data)
    }, [params, filterData, reset, routeParams])

    function handleTabChange(event, value) {
        setTabValue(value)
    }

    return (
        <FormProvider {...methods}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleTabChange}>
                        <Tab label="AP-SHEET" value="1" />
                        <Tab label="AP-REPORT" value="2" />
                        <Tab label="AP-REQUEST" value="3" />
                        <Tab label="AP-REQUEST LIST" value="4" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <DialogMenu1 params={params.data} />
                </TabPanel>
                <TabPanel value="2">
                    <DialogMenu2 params={params.data} />
                </TabPanel>
                <TabPanel value="3">
                    <DialogMenu3 params={params.data} />
                </TabPanel>
                <TabPanel value="4">
                    <DialogMenu4 params={params.data} />
                </TabPanel>
            </TabContext>
        </FormProvider>
    )
}

export default DialogWorkOrderMenu
