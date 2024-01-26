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

import { filteredRequestByMonth } from '../../store/erpStore/erpMnSlices'
import DialogMenu1 from './DialogMenu1'
import DialogMenu4 from './DialogMenu4'

const schema = yup.object().shape({})

function DialogInventoryMenu({ params }) {
    const dispatch = useDispatch()
    const filterData = useSelector(filteredRequestByMonth)
    const [tabValue, setTabValue] = useState('1')

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema),
    })

    const { reset, formState } = methods

    const { errors, isValid } = formState

    useEffect(() => {
        const data = _.find(filterData, { sheet_no: params.data.sheet_no })
        if (!data) {
            return
        }
        reset(data)
        // console.log(data)
    }, [params, filterData, reset])

    function handleTabChange(event, value) {
        setTabValue(value)
    }

    return (
        <FormProvider {...methods}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleTabChange}>
                        <Tab label="AP-SHEET" value="1" />
                        <Tab label="AP-REQUEST" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <DialogMenu1 params={params.data} />
                </TabPanel>
                <TabPanel value="2">
                    <DialogMenu4 params={params.data} />
                </TabPanel>
            </TabContext>
        </FormProvider>
    )
}

export default DialogInventoryMenu
