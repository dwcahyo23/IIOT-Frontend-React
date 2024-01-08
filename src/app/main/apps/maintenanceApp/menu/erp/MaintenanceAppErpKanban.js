import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, Paper, Box } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import _ from 'lodash'
import { motion } from 'framer-motion'

import { indigo, red, green, blue, orange } from '@mui/material/colors'

import {
    filteredErpsByMonth,
    filterErpsKanban,
    erpPrio,
} from '../../store/erpStore/erpMnSlices'

import {
    machinesSection,
    machinesResponbility,
} from '../../store/machineStore/machineMnSlices'
import FuseLoading from '@fuse/core/FuseLoading'

const container = {
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
}

function getColor(params) {
    if (params === 1) {
        return red[600]
    }

    if (params === 2) {
        return blue[600]
    }

    if (params === 3) {
        return indigo[600]
    }

    if (params === 4) {
        return green[600]
    }
}

function MaintenanceAppErpKanban() {
    const filterData = useSelector(filterErpsKanban)

    const [usePrio, useSection, useResponbility] = [
        useSelector(erpPrio),
        useSelector(machinesSection),
        useSelector(machinesResponbility),
    ]

    function Kanban() {
        function getKanban() {
            if (
                usePrio !== 'ALL' &&
                useSection !== 'ALL' &&
                useResponbility !== 'ALL'
            ) {
                return (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-8 gap-16 w-full min-w-0 pt-24"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {_.map(filterData.columns, (val, index) => (
                            <motion.div
                                variants={item}
                                key={index}
                                className="sm:col-span-2"
                            >
                                <Paper className="flex flex-col flex-auto shadow rounded-2xl py-16 overflow-hidden">
                                    <div className="flex items-center justify-center px-8 pt-8">
                                        <Typography
                                            className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
                                            color="text.secondary"
                                        >
                                            {val.title}
                                        </Typography>
                                    </div>

                                    {_.map(val.cards, (card, index) => (
                                        <div
                                            className="flex items-center justify-center px-8 pt-12"
                                            key={index}
                                        >
                                            <Card
                                                elevation={3}
                                                className="w-11/12"
                                            >
                                                <CardHeader
                                                    sx={{
                                                        backgroundColor:
                                                            getColor(val.id),
                                                    }}
                                                    title={card.title}
                                                    titleTypographyProps={{
                                                        className:
                                                            'text-base font-medium',
                                                        align: 'center',
                                                        color: 'white',
                                                    }}
                                                />
                                                <CardContent>
                                                    <Accordion elevation={0}>
                                                        <AccordionSummary
                                                            expandIcon={
                                                                <ExpandMoreIcon />
                                                            }
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                            <Typography
                                                                className="text-base"
                                                                color="text.secondary"
                                                            >
                                                                Problem
                                                            </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Typography
                                                                className="text-sm"
                                                                color="text.secondary"
                                                            >
                                                                {
                                                                    card.description
                                                                }
                                                            </Typography>
                                                        </AccordionDetails>
                                                    </Accordion>

                                                    {card.memo.length > 0 && (
                                                        <Accordion
                                                            elevation={0}
                                                        >
                                                            <AccordionSummary
                                                                expandIcon={
                                                                    <ExpandMoreIcon />
                                                                }
                                                                aria-controls="panel2a-content"
                                                                id="panel2a-header"
                                                            >
                                                                <Typography
                                                                    className="text-base"
                                                                    color="text.secondary"
                                                                >
                                                                    Request
                                                                </Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                {_.map(
                                                                    card.memo,
                                                                    (val) => (
                                                                        <Typography
                                                                            className="text-sm"
                                                                            color="text.secondary"
                                                                        >
                                                                            {
                                                                                val.mre
                                                                            }{' '}
                                                                            {
                                                                                val.sparepart
                                                                            }
                                                                        </Typography>
                                                                    )
                                                                )}
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </div>
                                    ))}
                                </Paper>
                            </motion.div>
                        ))}
                    </motion.div>
                )
            }
        }

        if (filterData) {
            return getKanban()
        }
    }

    return <Kanban />
}

export default MaintenanceAppErpKanban
