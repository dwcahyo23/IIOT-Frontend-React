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
        name: 'E.Preventive',
        color: 'primary',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: '031',
        name: 'I.Preventive',
        color: 'primary',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: '04',
        name: 'Workshop',
        color: 'warning',
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
        name: 'n.audit',
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
        name: 'Ready',
        color: 'warning',
        icon: 'heroicons-outline:exclamation-circle',
    },
    {
        id: 'N/Y',
        name: 'NOT YET',
        color: 'error',
        icon: 'heroicons-outline:exclamation',
    },
    {
        id: 'Open',
        name: 'Open',
        color: 'success',
        icon: 'heroicons-outline:check',
    },
    {
        id: 'R',
        name: 'n.report',
        color: 'error',
        icon: 'heroicons-outline:x',
    },
    {
        id: 'T',
        name: 'n.target',
        color: 'error',
        icon: 'heroicons-outline:x',
    },
    {
        id: 'Close',
        name: 'Close',
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
