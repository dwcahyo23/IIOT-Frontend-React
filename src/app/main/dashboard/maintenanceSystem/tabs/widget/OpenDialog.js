import FuseLoading from '@fuse/core/FuseLoading/FuseLoading'
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
import { selectUser } from 'app/store/userSlice'
import { getMnOne, selectMnOne } from '../../store/mnOneSlice'
import { getApSlice } from '../../store/apSlice'

import { getMnRepSlice } from '../../store/mnRepSlice'
import { getMnReqSlice } from '../../store/mnReqSlice'

import { getMachineStock } from 'src/app/main/apps/maintenanceSystem/store/machineChildren/machineStock'
import StatusColor from 'src/app/main/apps/maintenanceSystem/machineTab/utils/StatusColor'
import _ from 'lodash'

import Machine from '../widgetTab/Machine'
import ApSheet from '../widgetTab/ApSheet'
import ApReport from '../widgetTab/ApReport'
import ApRequest from '../widgetTab/ApRequest'
import ApRequestList from '../widgetTab/ApRequestList'
import Sparepart from '../widgetTab/Sparepart'
import { useEventListener } from '@fuse/hooks'

const schema = yup.object().shape({
    id_request: yup
        .string()
        .required('Require machine ap-sheet')
        .min(11)
        .max(11),
})

function OpenDialog({ data, header, apOptions, parentName }) {
    const dispatch = useDispatch()
    const dataMnOne = useSelector(selectMnOne)
    const [dataNull, setDataNull] = useState(true)
    const [tabValue, setTabValue] = useState('3')
    const [isInventory, setIsInventory] = useState(true)

    const methods = useForm({
        mode: 'onChange',
        defaultValues: {},
        resolver: yupResolver(schema),
    })

    const { reset, watch, setValue, getValues } = methods

    useEffect(() => {
        parentName == 'Inventory' ? setIsInventory(true) : setIsInventory(false)

        if (!data) {
            setDataNull(true)
        } else {
            const uuid = data.selectData.mch_index.uuid
            const sheet_no = data.selectData.sheet_no
            const uuid_request = data?.selectData.uuid_request
            dispatch(
                getMnOne({
                    uuid: uuid,
                    sheet_no: sheet_no,
                    uuid_request: uuid_request || null,
                })
            ).then((action) => {
                if (action.payload) {
                    setDataNull(false)
                }
            })
            dispatch(getMachineStock())
        }
    }, [])

    useEffect(() => {
        const newData = { ...dataMnOne }
        // console.log(newData)
        if (!dataMnOne) {
            return
        }
        const hasList = [
            'machine',
            'report',
            'request',
            'requestList',
            'sheet',
            'requestList',
        ]
        if (hasList.every((prop) => prop in dataMnOne)) {
            reset(newData)
        } else {
            const uuid = data.selectData.mch_index.uuid
            const sheet_no = data.selectData.sheet_no
            const uuid_request = data?.selectData.uuid_request
            dispatch(
                getMnOne({
                    uuid: uuid,
                    sheet_no: sheet_no,
                    uuid_request: uuid_request || null,
                })
            ).then((action) => {
                if (action.payload) {
                    setDataNull(false)
                    dispatch(getApSlice(apOptions))
                    dispatch(getMnRepSlice())
                    dispatch(getMnReqSlice())
                }
            })
        }
    }, [dataMnOne, reset])

    function handleTabChange(ev, val) {
        setTabValue(val)
        if (val == 1) {
            header('Info Mesin')
        } else if (val == 2) {
            header('Monitoring Life Time Sparepart')
        } else if (val == 3) {
            header('Maintenance Work Order FO-03-04-01')
        } else if (val == 4) {
            header('Laporan Maintenance FO-03-03-07')
        } else if (val == 5) {
            header('Penanganan Spare Part Maintenance IK-03-03-11')
        } else if (val == 6) {
            header('Penanganan Spare Part Maintenance IK-03-03-11')
        }
    }

    if (dataNull) {
        return <FuseLoading />
    }

    return (
        <FormProvider {...methods}>
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        onChange={handleTabChange}
                        aria-label="lab API tabs example"
                    >
                        {/* <Tab label="Machine" value="1" /> */}
                        {/* <Tab label="Life Time" value="2" /> */}
                        <Tab label="AP-Sheet" value="3" />
                        <Tab label="AP-Report" value="4" />
                        <Tab
                            label="AP-Request"
                            value="5"
                            disabled={isInventory}
                        />
                        <Tab label="List AP-Request" value="6" />
                    </TabList>
                </Box>
                {/* <TabPanel value="1">
                    <div style={{ width: 900, height: 500 }}>
                        <Machine />
                    </div>
                </TabPanel> */}

                {/* <TabPanel value="2">
                    <div style={{ width: 900, height: 500 }}>
                        <Sparepart />
                    </div>
                </TabPanel> */}

                <TabPanel value="3">
                    <div style={{ width: 900, height: 500 }}>
                        <ApSheet params={dataMnOne} />
                    </div>
                </TabPanel>

                <TabPanel value="4">
                    <div style={{ width: 900, height: 500 }}>
                        <ApReport params={dataMnOne} />
                    </div>
                </TabPanel>

                <TabPanel value="5">
                    <div style={{ width: 900, height: 500 }}>
                        <ApRequest />
                    </div>
                </TabPanel>

                <TabPanel value="6">
                    <div style={{ width: 900, height: 500 }}>
                        <ApRequestList />
                    </div>
                </TabPanel>
            </TabContext>
        </FormProvider>
    )
}

export default OpenDialog
