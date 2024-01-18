import ModbusApp from './modbusApp/ModbusAppConfig'
import MaintenanceSystem from './maintenanceSystem/MaintenanceSystemConfig'
import AcipApp from './acipApp/AcipAppConfig'
import ScadaAppConfig from './scadaApp/ScadaAppConfig'
import MaintenanceAppConfig from './maintenanceApp/MaintenanceAppConfig'
import E3viewAppConfig from './e3viewApp/E3viewAppconfig'
import ProductionAppConfig from './productionApp/ProductionAppConfig'

const appsConfig = [
    ModbusApp,
    MaintenanceSystem,
    AcipApp,
    ScadaAppConfig,
    MaintenanceAppConfig,
    E3viewAppConfig,
    ProductionAppConfig,
]

export default appsConfig
