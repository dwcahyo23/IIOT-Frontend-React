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
        id: 'N/Y',
        name: 'NOT YET',
        color: 'error',
        icon: 'heroicons-outline:exclamation',
    },
]

function StatusColor(props) {
    return (
        <div>
            <Chip
                icon={
                    <FuseSvgIcon size={12}>
                        {_.isUndefined(_.find(status, { id: props.id }))
                            ? 'heroicons-outline:x'
                            : _.find(status, { id: props.id }).icon}
                    </FuseSvgIcon>
                }
                variant="outlined"
                size="small"
                label={
                    _.isUndefined(_.find(status, { id: props.id }))
                        ? 'undefined'
                        : _.find(status, { id: props.id }).name
                }
                color={
                    _.isUndefined(_.find(status, { id: props.id }))
                        ? 'error'
                        : _.find(status, { id: props.id }).color
                }
            />
        </div>
    )
}

export default StatusColor
