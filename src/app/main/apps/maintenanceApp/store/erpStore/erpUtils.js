import dayjs from 'dayjs'
import _ from 'lodash'

export const getMonthErp = () => {
    const month = []
    for (let i = 0; i < 12; i++) {
        month.push(dayjs().month(i).format('MMMM'))
    }

    return month
}

export const getCountStatusErp = (params) => {
    const chart = _(params)
        .groupBy((val) => dayjs(val.ymd).format('MMMM'))
        .mapValues((val) => {
            return {
                Open: _.countBy(val, (status) => status.chk_mark == 'N'),
                Close: _.countBy(val, (status) => status.chk_mark == 'Y'),
            }
        })
        .value()
    return chart
}
