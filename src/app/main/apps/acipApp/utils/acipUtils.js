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
        .groupBy((val) => dayjs(val.createdAt).format('MMMM'))
        .mapValues((val) => {
            return {
                Open: _.countBy(val, (status) => status.status == 'Open'),
                Close: _.countBy(val, (status) => status.status == 'Close'),
                Sum: _.countBy(val, (status) => (status ? 'true' : 'false')),
                AR1: _.sumBy(val, (status) => status.a_r1),
                AR2: _.sumBy(val, (status) => status.a_r2),
                AR3: _.sumBy(val, (status) => status.a_r3),
                AR4: _.sumBy(val, (status) => status.a_r4),
                AR5: _.sumBy(val, (status) => status.a_r5),
                BR1: _.sumBy(val, (status) => status.b_r1),
                BR2: _.sumBy(val, (status) => status.b_r2),
                BR3: _.sumBy(val, (status) => status.b_r3),
                BR4: _.sumBy(val, (status) => status.b_r4),
                BR5: _.sumBy(val, (status) => status.b_r5),
            }
        })
        .value()
    return chart
}
