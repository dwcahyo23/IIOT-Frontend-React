import dayjs from 'dayjs'
import _ from 'lodash'

export const getMonthScw = () => {
    const month = []
    for (let i = 0; i < 12; i++) {
        month.push(dayjs().month(i).format('MMMM'))
    }

    return month
}

export const getCountStatusScw = (params) => {
    const chart = _(params)
        .groupBy((val) => dayjs(val.createdAt).format('MMMM'))
        .mapValues((val) => {
            return {
                Open: _.countBy(val, (status) => status.status == 'Open'),
                Close: _.countBy(val, (status) => status.status == 'Close'),
                Sum: _.countBy(val, (status) => (status ? 'true' : 'false')),
            }
        })
        .value()
    return chart
}
