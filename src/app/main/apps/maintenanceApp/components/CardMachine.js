import Card from '@mui/material/Card'
import {
    CardContent,
    CardHeader,
    CardActionArea,
    Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import indigo from '@mui/material/colors/indigo'
import _ from 'lodash'

function CardMachine({ params }) {
    if (!params) {
        return null
    }

    return (
        <div>
            <Card className="flex flex-col shadow">
                <CardActionArea>
                    <Link
                        to={`/apps/maintenanceSystem/machines/${params.uuid}`}
                    >
                        <CardHeader
                            className="items-center py-8 px-16"
                            sx={{
                                backgroundColor: indigo[500],
                            }}
                            title={params.mch_code}
                            subheader={params.mch_name}
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
                    </Link>
                </CardActionArea>

                <CardContent className="flex flex-col flex-auto p-24">
                    <Typography className="text-13 font-medium w-11/12">
                        Process : {params.mch_process_type}
                    </Typography>
                    <Typography className="text-13 font-medium w-11/12">
                        Power : {params.mch_hp} HP
                    </Typography>
                    <Typography className="text-13 font-medium w-11/12">
                        Dept no : {params.dep_no}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default CardMachine
