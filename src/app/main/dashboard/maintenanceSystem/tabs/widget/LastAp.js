import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import { memo, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import { useSelector } from 'react-redux'
import Tabs from '@mui/material/Tabs'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import { Link } from 'react-router-dom'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import _ from 'lodash'
import dayjs from 'dayjs'
import { Chip } from '@mui/material'

function LastAp({ listItem }) {
    return (
        <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden h-full">
            <div className="flex flex-col sm:flex-row items-start justify-between">
                <Typography className="text-lg font-small tracking-tight leading-6 truncate">
                    Last AP
                </Typography>
            </div>
            <List className="py-0 mt-8 divide-y">
                {_.takeRight(listItem, 20).map((item, i) => (
                    <ListItem key={i} className="px-0">
                        {item.chk_mark == 'Y' ? (
                            <Chip
                                label="Audit"
                                variant="outlined"
                                color="success"
                            />
                        ) : (
                            <Chip
                                label="N.Audit"
                                variant="outlined"
                                color="error"
                            />
                        )}

                        <ListItemText
                            classes={{ root: 'px-8', primary: 'font-small' }}
                            primary={item.sheet_no}
                            secondary={
                                <span className="flex flex-col sm:flex-row sm:items-center -ml-2 mt-8 sm:mt-4 space-y-4 sm:space-y-0 sm:space-x-12">
                                    {item.s_ymd && (
                                        <span className="flex items-center">
                                            <FuseSvgIcon
                                                size={20}
                                                color="disabled"
                                            >
                                                heroicons-solid:clock
                                            </FuseSvgIcon>
                                            <Typography
                                                component="span"
                                                className="mx-6 text-md"
                                                color="text.secondary"
                                            >
                                                {dayjs(item.s_ymd).format(
                                                    'DD/MM/YYYY HH:mm'
                                                )}
                                            </Typography>
                                        </span>
                                    )}
                                </span>
                            }
                        />

                        <ListItemSecondaryAction>
                            <Typography
                                className="flex items-center sm:mb-12"
                                component={Link}
                                role="button"
                                to="/apps/maintenanceSystem"
                                color="gray"
                            >
                                <FuseSvgIcon>
                                    heroicons-solid:chevron-right
                                </FuseSvgIcon>
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Paper>
    )
}

export default memo(LastAp)
