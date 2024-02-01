import _ from '@lodash'
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
        name: 'PREV',
        color: 'primary',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: '031',
        name: 'IN PREV',
        color: 'primary',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: '04',
        name: 'W-SR',
        color: 'warning',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: '05',
        name: 'W-BT',
        color: 'warning',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: '06',
        name: 'PROJECT',
        color: 'info',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: '07',
        name: 'PROJECT',
        color: 'info',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: 'Y',
        name: 'AUDIT',
        color: 'success',
        icon: 'heroicons-outline:check',
    },
    {
        id: 'N',
        name: 'UNAUDIT',
        color: 'error',
        icon: 'heroicons-outline:x',
    },
    {
        id: 'C',
        name: 'CANCEL',
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
        name: 'Rep',
        color: 'error',
        icon: 'heroicons-outline:x',
    },
    {
        id: 'S',
        name: 'Part',
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
        id: 'over_y',
        name: 'Over',
        color: 'success',
        icon: 'heroicons-outline:check',
    },
    {
        id: 'over_n',
        name: 'Not Yet',
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
