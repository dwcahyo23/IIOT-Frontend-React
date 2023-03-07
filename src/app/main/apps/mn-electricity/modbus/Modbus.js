import FusePageCarded from '@fuse/core/FusePageCarded'
import withReducer from 'app/store/withReducer'
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery'
import reducer from '../store'
import ModbusHeader from './ModbusHeader'
import ModbusTable from './ModbusTable'

function Modbus() {
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'))

    return (
        <FusePageCarded
            header={<ModbusHeader />}
            content={<ModbusTable />}
            scroll={isMobile ? 'normal' : 'content'}
        />
    )
}

export default withReducer('mnElectricityApp', reducer)(Modbus)
