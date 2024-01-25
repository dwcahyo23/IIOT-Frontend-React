import _ from '@lodash'
import clsx from 'clsx'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon'
import { Chip } from '@mui/material'

export const status = [
    {
        id: '01',
        name: 'Breakdown',
        color: 'error',
        icon: 'heroicons-outline:exclamation',
    },
    {
        id: '02',
        name: 'Still Run',
        color: 'warning',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: '03',
        name: 'Preventive',
        color: 'primary',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: '031',
        name: 'Internal Preventive',
        color: 'primary',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: '04',
        name: 'Workshop Still Run',
        color: 'warning',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: '05',
        name: 'Workshop Breakdown',
        color: 'warning',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: '06',
        name: 'Project Machinery',
        color: 'info',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: '07',
        name: 'Project Workshop',
        color: 'info',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: 'Y',
        name: 'Audit',
        color: 'success',
        icon: 'heroicons-outline:check',
    },
    {
        id: 'N',
        name: 'unaudit',
        color: 'error',
        icon: 'heroicons-outline:x',
    },
    {
        id: 'C',
        name: 'Cancel',
        color: 'error',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: 'MRE',
        name: 'MRE',
        color: 'warning',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: 'Ready',
        name: 'Rdy',
        color: 'warning',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: 'N/Y',
        name: 'N/Yt',
        color: 'error',
        icon: 'heroicons-outline:exclamation',
    },
    {
        id: 'R',
        name: 'Report',
        color: 'error',
        icon: 'heroicons-outline:x',
    },
    {
        id: 'S',
        name: 'Sparepart',
        color: 'error',
        icon: 'heroicons-outline:exclamation',
    },
    {
        id: 'SN',
        name: 'NO',
        color: 'success',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: 'T',
        name: 'Target',
        color: 'error',
        icon: 'heroicons-outline:x',
    },
    {
        id: 'Close',
        name: 'Close',
        color: 'success',
        icon: 'heroicons-outline:check',
    },
    {
        id: 'Open',
        name: 'Open',
        color: 'error',
        icon: 'heroicons-outline:x',
    },
    {
        id: 'Stock Ready',
        name: 'Stock Ready',
        color: 'success',
        icon: 'heroicons-outline:check',
    },
    {
        id: 'Open PO',
        name: 'Open PP',
        color: 'error',
        icon: 'heroicons-outline:x',
    },
]

function StatusChip(props) {
    return (
        <div>
            {_.isUndefined(_.find(status, { id: props.id })) == false && (
                <Chip
                    icon={
                        <FuseSvgIcon size={12}>
                            {_.find(status, { id: props.id }).icon}
                        </FuseSvgIcon>
                    }
                    variant="outlined"
                    size="small"
                    label={_.find(status, { id: props.id }).name}
                    color={_.find(status, { id: props.id }).color}
                />
            )}
        </div>
    )
}

export default StatusChip
