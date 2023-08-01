import {
    Box,
    Button,
    Typography,
    Tab,
    TextField,
    Grid,
    MenuItem,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useFormContext, useFieldArray } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { showMessage } from 'app/store/fuse/messageSlice'
import dayjs from 'dayjs'

function OpenDialog() {
    return <div></div>
}

export default OpenDialog
