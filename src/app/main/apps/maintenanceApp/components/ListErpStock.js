import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { Box } from '@mui/material'
import _ from 'lodash'

import Table from './Table'

function ListErpStock({ params, columns }) {
    const tableIndex = (data) => {
        // paramsId(data)
    }

    return (
        <Card
            className="flex flex-col shadow"
            sx={{
                height: 600,
            }}
        >
            <CardContent className="flex flex-col flex-auto p-16">
                <Box
                    className="flex flex-col flex-auto p-16"
                    sx={{
                        width: '100%',
                        height: 550,
                    }}
                >
                    <Table
                        params={{
                            row: params,
                            columns: columns,
                        }}
                        tableIndex={tableIndex}
                    />
                </Box>
            </CardContent>
        </Card>
    )
}

export default ListErpStock
