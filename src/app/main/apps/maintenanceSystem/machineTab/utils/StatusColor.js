import _ from '@lodash'
import clsx from 'clsx'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon'
import { Chip } from '@mui/material'

export const status = [
    {
        id: '01',
        name: 'BT',
        color: 'error',
        icon: 'heroicons-outline:exclamation',
    },
    {
        id: '02',
        name: 'SR',
        color: 'warning',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: '03',
        name: 'EP',
        color: 'primary',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: '031',
        name: 'IP',
        color: 'primary',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: '04',
        name: 'WSR',
        color: 'warning',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: '05',
        name: 'WBT',
        color: 'warning',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: '06',
        name: 'PM',
        color: 'info',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: '07',
        name: 'PW',
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
        name: 'REP',
        color: 'error',
        icon: 'heroicons-outline:x',
    },
    {
        id: 'S',
        name: 'REQ',
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
]

function StatusColor(props) {
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

export default StatusColor
