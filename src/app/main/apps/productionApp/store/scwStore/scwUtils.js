import dayjs from 'dayjs'
import _ from 'lodash'

export const getMonthScw = () => {
    const month = []
    for (let i = 0; i < 12; i++) {
        month.push(dayjs().month(i).format('MMMM'))
    }

    return month
}

export const getDateofMonth = (params) => {
    const month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    const date = []

    let lastDate = 31

    if (params !== 'ALL') {
        lastDate = dayjs()
            .set('month', month.indexOf(params))
            .endOf('month')
            .get('date')
    }

    for (let i = 0; i <= lastDate; i++) {
        date.push(i.toString())
    }

    return date
}

export const getCountStatusScw = (params) => {
    const chart = _(params)
        .groupBy((val) => dayjs(val.createdAt).format('MMMM'))
        .mapValues((val) => {
            return {
                Open: _.countBy(val, (status) => status.status == 'Open'),
                Close: _.countBy(val, (status) => status.status == 'Close'),
                OnProgress: _.countBy(
                    val,
                    (status) => status.status == 'On Progress'
                ),
                Sum: _.countBy(val, (status) => (status ? 'true' : 'false')),
            }
        })
        .value()
    return chart
}

export const getCountStatusOfDate = (params) => {
    const chart = _(params)
        .groupBy((val) => dayjs(val.createdAt).format('D'))
        .mapValues((val) => {
            return {
                Open: _.countBy(val, (status) => status.status == 'Open'),
                Close: _.countBy(val, (status) => status.status == 'Close'),
                OnProgress: _.countBy(
                    val,
                    (status) => status.status == 'On Progress'
                ),
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
                OnProgress: _.countBy(val, (r) => r.status == 'On Progress'),
            }
        })
        .map((val, key) => {
            return {
                name: key,
                data: [
                    { name: 'Open', value: val.Open.true || 0 },
                    { name: 'Close', value: val.Close.true || 0 },
                    { name: 'OnProgress', value: val.OnProgress.true || 0 },
                ],
            }
        })
        .value()

    return x
}
