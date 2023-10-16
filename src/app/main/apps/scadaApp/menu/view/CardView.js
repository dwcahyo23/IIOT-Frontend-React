import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CardHeader from '@mui/material/CardHeader'
import CardActionArea from '@mui/material/CardActionArea'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import indigo from '@mui/material/colors/indigo'
import red from '@mui/material/colors/red'
import green from '@mui/material/colors/green'
import { Link } from 'react-router-dom'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { lighten } from '@mui/material/styles'
import _ from 'lodash'

import Progres1 from './Utils/Progres1'

function CardView({ params, dialog }) {
    const statusColor = () => {
        if (params.zbConn !== null) {
            if (
                params.zbConn.din_zb_sens == 2 ||
                params.zbConn.din_zb_sens == 3
            ) {
                return green[500]
            } else {
                return red[500]
            }
        } else {
            return indigo[500]
        }
    }

    const progressTarget = () => {
        if (params.zbConn !== null) {
            if (params.zbConn.target_zb_sens !== 0) {
                const progress =
                    (params.zbConn.count_zb_sens /
                        params.zbConn.target_zb_sens) *
                    100
                return progress
            } else {
                return 0
            }
        } else {
            return 0
        }
    }

    return (
        <Card className="flex flex-col shadow">
            <CardActionArea
                onClick={() => {
                    dialog({ set: true, data: params })
                }}
            >
                <CardHeader
                    className="items-center py-8 px-16"
                    sx={{
                        backgroundColor: statusColor(),
                    }}
                    title={params.machine.mch_code}
                    subheader={params.machine.mch_name}
                    titleTypographyProps={{
                        className: 'text-18 font-medium',
                        align: 'center',
                        color: 'white',
                    }}
                    subheaderTypographyProps={{
                        className: 'text-13 font-medium w-11/12',
                        align: 'center',
                        color: 'white',
                    }}
                />
            </CardActionArea>

            <CardContent className="flex flex-col flex-auto p-16">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography className="text-13 font-medium w-11/12">
                            Sensor ID
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className="text-13 font-medium w-11/12">
                            : {params.id}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography className="text-13 font-medium w-11/12">
                            PD ID
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className="text-13 font-medium w-11/12">
                            : {params.zbConn?.id_production}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography className="text-13 font-medium w-11/12">
                            Stop Reason
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className="text-13 font-medium w-11/12">
                            : {params.zbConn?.stop_reason}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography className="text-13 font-medium w-11/12">
                            RPM
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className="text-13 font-medium w-11/12">
                            : {params.zbConn?.spm_zb_sens || 0} pcs/min
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography className="text-13 font-medium w-11/12">
                            Count
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className="text-13 font-medium w-11/12">
                            : {params.zbConn?.count_zb_sens || 0} pcs
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography className="text-13 font-medium w-11/12">
                            Target
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className="text-13 font-medium w-11/12">
                            : {params.zbConn?.target_zb_sens || 0} pcs
                        </Typography>
                    </Grid>
                </Grid>
                <Progres1 params={progressTarget()} />
            </CardContent>
        </Card>
    )
}

export default CardView
