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

export const getCountDeptChart = (params) => {
    const dept = ['PE', 'TE', 'MN', 'TD', 'PPIC', 'QC']

    const x = _(params)
        .groupBy((val) => val.req_to)
        .mapValues((val) => {
            return {
                Open: _.countBy(val, (r) => r.status == 'Open'),
                Close: _.countBy(val, (r) => r.status == 'Close'),
            }
        })
        .map((val, key) => {
            return {
                name: key,
                data: [
                    { name: 'Open', value: val.Open.true || 0 },
                    { name: 'Close', value: val.Close.true || 0 },
                ],
            }
        })
        .value()

    return x
}
