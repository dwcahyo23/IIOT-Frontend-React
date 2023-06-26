import _ from '@lodash'
import clsx from 'clsx'

export const status = [
    {
        id: '01',
        name: 'Breakdown',
        color: 'bg-red-700 text-white',
    },
    {
        id: '02',
        name: 'Still Run',
        color: 'bg-orange-700 text-white',
    },
    {
        id: '03',
        name: 'Preventive',
        color: 'bg-orange-700 text-white',
    },
    {
        id: '04',
        name: 'Workshop',
        color: 'bg-orange-700 text-white',
    },
    {
        id: 'Y',
        name: 'Audit',
        color: 'bg-green-700 text-white',
    },
    {
        id: 'N',
        name: 'n.audit',
        color: 'bg-red-700 text-white',
    },
]

function StatusColor(props) {
    return (
        <div
            className={clsx(
                'inline text-12 font-semibold py-4 px-12 rounded-full truncate',
                _.find(status, { id: props.id }).color
            )}
        >
            {_.find(status, { id: props.id }).name}
        </div>
    )
}

export default StatusColor
