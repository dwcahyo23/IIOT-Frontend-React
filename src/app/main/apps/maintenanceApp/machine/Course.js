import FusePageSimple from '@fuse/core/FusePageSimple'
import { useTheme } from '@mui/material/styles'
import Hidden from '@mui/material/Hidden'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stepper from '@mui/material/Stepper'
import withReducer from 'app/store/withReducer'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useDeepCompareEffect } from '@fuse/hooks'
import { differenceInHours, addHours } from 'date-fns'

import { Step, StepContent, StepLabel } from '@mui/material'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import ButtonGroup from '@mui/material/ButtonGroup'
import SwipeableViews from 'react-swipeable-views'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import { getCourse, selectCourse } from '../store/courseSlice'
import MaintenanceInfo from '../MaintenanceInfo'
import MaintenanceProgress from '../MaintenanceProgress'
import Grid from './Grid'
import User from './User'

function Course(props) {
    const dispatch = useDispatch()
    const course = useSelector(selectCourse)
    const routeParams = useParams()
    const { uuid } = routeParams
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))
    const theme = useTheme()
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile)

    useDeepCompareEffect(() => {
        dispatch(getCourse(uuid))
    }, [dispatch, routeParams])

    useEffect(() => {
        setLeftSidebarOpen(!isMobile)
    }, [isMobile])

    if (!course) {
        return null
    }

    function calcProgress() {
        const diff = []

        _.forEach(course.mn_items, (x) => {
            const dH =
                differenceInHours(
                    addHours(new Date(x.change_at), x.item_life_time),
                    new Date()
                ) / x.item_life_time

            diff.push(dH)
        })

        return _.min(diff) * 100
    }

    return (
        <FusePageSimple
            content={
                <div className="w-full">
                    <Hidden lgDown>
                        <MaintenanceProgress
                            className=""
                            course={calcProgress()}
                        />
                    </Hidden>

                    <Hidden lgUp>
                        <Paper
                            className="flex sticky top-0 z-10 items-center w-full px-16 py-8 border-b-1 shadow-0"
                            square
                        >
                            <IconButton
                                onClick={(ev) => setLeftSidebarOpen(true)}
                                aria-label="open left sidebar"
                                size="large"
                            >
                                <FuseSvgIcon>
                                    heroicons-outline:view-list
                                </FuseSvgIcon>
                            </IconButton>

                            <Typography className="text-13 font-medium tracking-tight mx-10">
                                {course.machine_index.mch_code}
                            </Typography>
                        </Paper>
                        <MaintenanceProgress
                            className=""
                            course={calcProgress()}
                        />
                    </Hidden>

                    <SwipeableViews enableMouseEvents>
                        <div className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64">
                            <Paper className="w-full max-w-lg mx-auto sm:my-8 lg:mt-16 p-24 sm:p-40 sm:py-48 rounded-16 shadow overflow-hidden">
                                <Typography className="text-18 font-medium tracking-tight mx-10 mb-16">
                                    Sparepart items :
                                </Typography>
                                <Grid course={course} />
                            </Paper>
                        </div>
                    </SwipeableViews>
                </div>
            }
            leftSidebarOpen={leftSidebarOpen}
            leftSidebarOnClose={() => {
                setLeftSidebarOpen(false)
            }}
            leftSidebarWidth={300}
            leftSidebarContent={
                <>
                    <div className="p-32">
                        <Button
                            to="/apps/maintenanceApp/machines"
                            component={Link}
                            className="mb-24"
                            color="secondary"
                            variant="text"
                            startIcon={
                                <FuseSvgIcon size={20}>
                                    {theme.direction === 'ltr'
                                        ? 'heroicons-outline:arrow-sm-left'
                                        : 'heroicons-outline:arrow-sm-right'}
                                </FuseSvgIcon>
                            }
                        >
                            Back
                        </Button>

                        <MaintenanceInfo course={course} />
                    </div>
                    <Divider />
                    <div className="p-32">
                        <User />
                    </div>
                    <Divider />
                </>
            }
            scroll="content"
        />
    )
}

export default withReducer('maintenanceApp', reducer)(Course)
