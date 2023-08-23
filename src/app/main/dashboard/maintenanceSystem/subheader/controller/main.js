import { resolve } from 'core-js/fn/promise'
import _, { reject } from 'lodash'

export default {
    async mapingMachinery(data, machine, comSql, comErp) {
        const filterMachinery = () => {
            return new Promise((resolve, reject) => {
                try {
                    const mapData = _(data)
                        .filter((val) => {
                            if (
                                val.com_no == comErp &&
                                val.chk_mark != 'C' &&
                                (val.pri_no == '01' ||
                                    val.pri_no == '02' ||
                                    val.pri_no == '03' ||
                                    val.pri_no == '06') &&
                                dayjs(val.ymd).year() == dayjs().year()
                            ) {
                                return val
                            }
                        })
                        .value()
                    resolve(mapData)
                } catch (error) {
                    reject(error)
                }
            })
        }

        const machines = _(machine).filter({ mch_com: comErp }).value()

        c
    },
}
