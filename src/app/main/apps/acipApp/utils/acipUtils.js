import dayjs from 'dayjs'
import _ from 'lodash'

export const getMonthAcip = () => {
    const month = []
    for (let i = 0; i < 12; i++) {
        month.push(dayjs().month(i).format('MMMM'))
    }

    return month
}

export const getCountStatusAcip = (params) => {
    const chart = _(params)
        .map((val) => {
            if (dayjs(val.createdAt).year() == dayjs().year())
                return {
                    ...val,
                }
        })
        .groupBy((val) => dayjs(val.createdAt).format('MMMM'))
        .mapValues((val) => {
            return {
                Open: _.countBy(val, (status) => status.status == 'Open'),
                Close: _.countBy(val, (status) => status.status == 'Close'),
            }
        })
        .value()
    return chart
}
