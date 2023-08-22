import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { selectApReq } from '../store/mnReqSlice'
import dayjs from 'dayjs'

import LastApLeaderInventory from '../tabs/widget/LastApLeaderInventory'

function InventoryGM5RequestSparepart() {
    const sparepart = useSelector(selectApReq)

    const listItemUser =
        sparepart &&
        _.chain(sparepart)
            .filter((val) => {
                if (
                    val.mch_com == 'GM5' &&
                    (val.audit_request == 'Y' || val.audit_request == 'N')
                ) {
                    return val
                }
            })
            .omit(['slug'])
            .groupBy((val) => dayjs(val.createdAt).format('MMM'))
            .mapValues((items) => {
                return {
                    request: _.countBy(items, (val) => (val ? 'pass' : 'fail')),
                    request_audit_Y: _.countBy(items, (val) =>
                        val.audit_request == 'Y' ? 'pass' : 'fail'
                    ),
                    request_audit_N: _.countBy(items, (val) =>
                        val.audit_request == 'N' ? 'pass' : 'fail'
                    ),
                    request_mre: _.countBy(items, (val) =>
                        val.mre_request.length > 0 &&
                        val.item_ready == 'N' &&
                        val.audit_request == 'N'
                            ? 'pass'
                            : 'fail'
                    ),
                    request_mre_audit: _.countBy(items, (val) =>
                        val.mre_request.length > 0 &&
                        val.item_ready == 'Y' &&
                        val.audit_request == 'Y'
                            ? 'pass'
                            : 'fail'
                    ),
                    request_ready: _.countBy(items, (val) =>
                        val.item_ready == 'Y' && val.audit_request == 'N'
                            ? 'pass'
                            : 'fail'
                    ),
                    request_ready_audit: _.countBy(items, (val) =>
                        val.item_ready == 'Y' && val.audit_request == 'Y'
                            ? 'pass'
                            : 'fail'
                    ),
                    data: items,
                }
            })
            .value()

    return (
        <div className="w-full min-w-0">
            <LastApLeaderInventory
                data={{
                    listItemMonth: listItemUser,
                    user: 20,
                    leader: 'Inventory',
                }}
            />
        </div>
    )
}

export default InventoryGM5RequestSparepart
