import FuseLoading from '@fuse/core/FuseLoading'
import Card from '@mui/material/Card'
import { CardContent, CardActions, CardHeader } from '@mui/material'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { lighten } from '@mui/material/styles'
import _ from 'lodash'
import ModbusInfo from '../ModbusInfo'

function MachineCard({ params }) {
    return (
        <Card className="flex flex-col shadow">
            <CardContent className="flex flex-col flex-auto p-24">
                <ModbusInfo params={params} className="" />
            </CardContent>

            <CardActions
                className="items-center justify-end py-16 px-24"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? lighten(theme.palette.background.default, 0.4)
                            : lighten(theme.palette.background.default, 0.03),
                }}
            >
                <Button
                    to={`/apps/modbusApp/address/${params.mch_code}`}
                    component={Link}
                    className="px-16 min-w-100"
                    variant="contained"
                    color="secondary"
                    endIcon={
                        <FuseSvgIcon className="" size={20}>
                            heroicons-solid:arrow-sm-right
                        </FuseSvgIcon>
                    }
                >
                    Continue
                </Button>
            </CardActions>
        </Card>
    )
}

export default MachineCard
