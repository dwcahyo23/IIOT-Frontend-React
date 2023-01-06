import _ from '@lodash';
import clsx from 'clsx';

export const itemStatuses = [
  {
    id: 1,
    name: 'In good condition',
    color: 'bg-blue text-white',
  },
  {
    id: 2,
    name: 'Awaiting check conditions',
    color: 'bg-orange text-black',
  },
  {
    id: 3,
    name: 'Over-limit lifetime',
    color: 'bg-red text-white',
  },
];

function ItemsStatus(props) {
  return (
    <div
      className={clsx(
        'inline text-12 font-semibold py-4 px-12 rounded-full truncate',
        _.find(itemStatuses, { id: props.id }).color
      )}
    >
      {_.find(itemStatuses, { id: props.id }).name}
    </div>
  );
}

export default ItemsStatus;
