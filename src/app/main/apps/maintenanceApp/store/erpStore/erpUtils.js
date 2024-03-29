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
                Sum: _.countBy(val, (status) => (status ? 'true' : 'false')),
            }
        })
        .value()
    return chart
}

export const getCountStatusRequest = (params) => {
    const chart = _(params)
        .groupBy((val) => dayjs(val.createdAt).format('MMMM'))
        .mapValues((val) => {
            return {
                Unaudit: _.countBy(
                    val,
                    (status) => status.audit_request == 'N'
                ),
                Close: _.countBy(val, (status) => status.audit_request == 'Y'),
                Sum: _.countBy(val, (status) => status.audit_request !== 'C'),
                MRE: _.countBy(
                    val,
                    (status) =>
                        status.mre_request.length > 0 &&
                        status.audit_request === 'N' &&
                        status.item_ready === 'N'
                ),
                Ready: _.countBy(
                    val,
                    (status) =>
                        status.item_ready === 'Y' &&
                        status.audit_request === 'N'
                ),
                Open: _.countBy(
                    val,
                    (status) =>
                        status.audit_request === 'N' &&
                        status.item_ready === 'N' &&
                        status.mre_request.length === 0
                ),
            }
        })
        .value()
    return chart
}

export const getPareto = (params) => {
    let y = 0

    const chart = _(params)
        .groupBy('mch_no')
        .mapValues((val) => {
            return {
                count: val.length,
            }
        })
        .omit(['-'])
        .map((i, k) => {
            return { name: k, ...i }
        })
        .sort((a, b) => a.count - b.count)
        .reverse()
        .take(20)
        .value()

    const total = _.sumBy(chart, 'count')

    const pareto = _.map(chart, (val) => {
        y += val.count
        return { ...val, persen: (y / total) * 100 }
    })

    return pareto
}
