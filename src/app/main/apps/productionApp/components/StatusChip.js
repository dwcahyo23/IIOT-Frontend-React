import _ from '@lodash'
import clsx from 'clsx'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon'
import { Chip } from '@mui/material'

export const status = [
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
        id: 'Cancel',
        name: 'Cancel',
        color: 'error',
        icon: 'heroicons-outline:x',
    },
    {
        id: 'On Progress',
        name: 'Progress',
        color: 'warning',
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
