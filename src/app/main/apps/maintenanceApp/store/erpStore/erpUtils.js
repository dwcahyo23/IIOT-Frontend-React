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
                Brekdown_Open: _.countBy(val, (status) =>
                    status.pri_no == '02' && status.chk_mrk == 'N'
                        ? 'pass'
                        : 'fail'
                ),
                Brekdown_Close: _.countBy(
                    val,
                    (status) => status.pri_no == '02'
                ),
            }
        })
        .value()
    return chart
}
