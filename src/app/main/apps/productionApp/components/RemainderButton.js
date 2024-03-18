import { LoadingButton } from '@mui/lab'
import React from 'react'
import { Send } from '@mui/icons-material'
import axios from 'axios'
import { getCountDeptChart } from '../store/scwStore/scwUtils'

function RemainderButton({ params }) {
    const handleSubmit = async () => {
        console.log(getCountDeptChart(params))
    }
    return (
        <div>
            <LoadingButton
                variant="outline"
                color="secondary"
                // loading={isPending}
                loadingPosition="start"
                startIcon={<Send />}
                onClick={handleSubmit}
            >
                <span>Remainder WA</span>
            </LoadingButton>
        </div>
    )
}

export default RemainderButton
