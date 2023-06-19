import Typography from '@mui/material/Typography'
import clsx from 'clsx'
import ModbusCategory from './ModbusCategory'
import _ from 'lodash'

function ModbusInfo({ params, className }) {
    if (!params) {
        return null
    }

    return (
        <div className={clsx('w-full', className)}>
            <div className="flex items-center justify-between mb-16">
                <ModbusCategory slug={params.category} />
            </div>

            <Typography className="text-16 font-medium">
                {params.mch_code}
            </Typography>

            {}

            {_.map(params.data_result, (val, key) => (
                <Typography
                    className="text-13 mt-2 line-clamp-2"
                    color="text.secondary"
                    key={key}
                >
                    {key} : {val}
                </Typography>
            ))}
        </div>
    )
}

export default ModbusInfo
