import { useEffect, useState } from 'react'
import { Box, Button, TextField, Grid, MenuItem } from '@mui/material'
import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import dayjs from 'dayjs'
import { Controller, useFormContext, useForm } from 'react-hook-form'
import _ from 'lodash'
import { useDispatch } from 'react-redux'
import {
    saveGenbaAcip,
    removeGenbaAcip,
} from '../../store/genba/genbaAcipSlice'
import { showMessage } from 'app/store/fuse/messageSlice'
import { selectUser } from 'app/store/userSlice'
import { useSelector } from 'react-redux'

function Tab1({ useDelete }) {
    const dispatch = useDispatch()
    const methods = useFormContext()
    const user = useSelector(selectUser)
    const [isDiable, setDisabled] = useState(true)
    const { control, formState, getValues, setValue, resetField } = methods
    const { errors, isValid } = formState
    const [open, setOpen] = useState(false)

    const { handleSubmit, register } = useForm({
        shouldUseNativeValidation: true,
    })

    useEffect(() => {
        if (user.data.userNIK !== 'user5r') setDisabled(false)
    }, [])

    const onSubmit = async (data) => {
        const { sheet } = getValues()
        if (data.confirmation == `DELETE ${sheet}`) {
            dispatch(removeGenbaAcip(getValues('id_genba'))).then((action) => {
                dispatch(
                    showMessage({
                        message: 'Data has been deleted',
                        variant: 'error',
                    })
                )
                setOpen(false)
                useDelete(false)
            })
        }
    }

    function handleSave(params) {
        dispatch(saveGenbaAcip(getValues())).then((action) => {
            if (action.payload) {
                dispatch(
                    showMessage({
                        message: 'Data has been saved successfully',
                        variant: 'success',
                    })
                )
            }
        })
    }

    function handleDelete(params) {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <div>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Controller
                            name="sheet"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    value={field.value || ''}
                                    className="mt-8 mb-16"
                                    label="Sheet"
                                    id="sheet"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Controller
                            name="from"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    value={field.value || ''}
                                    className="mt-8 mb-16"
                                    label="From"
                                    id="from"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Controller
                            name="mch_code"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    value={field.value || ''}
                                    className="mt-8 mb-16"
                                    label="Machine Code"
                                    id="mch_code"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Controller
                            name="dept"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    value={field.value || ''}
                                    className="mt-8 mb-16"
                                    label="Departement"
                                    id="dept"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Controller
                            name="area"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    value={field.value || ''}
                                    className="mt-8 mb-16"
                                    label="Area"
                                    id="area"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Controller
                            name="com"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    value={field.value || 'GM1'}
                                    className="mt-8 mb-16"
                                    label="Plant"
                                    select
                                    autoFocus
                                    id="com"
                                    fullWidth
                                >
                                    <MenuItem value="GM1">GM1</MenuItem>
                                    <MenuItem value="GM2">GM2</MenuItem>
                                    <MenuItem value="GM3">GM3</MenuItem>
                                    <MenuItem value="GM5">GM5</MenuItem>
                                    <MenuItem value="GMX">GMX</MenuItem>
                                    <MenuItem value="N/A">N/A</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Controller
                            name="cat"
                            select
                            autoFocus
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    className="mt-8 mb-16"
                                    label="Category"
                                    value={field.value || 'R1'}
                                    select
                                    autoFocus
                                    id="cat"
                                    fullWidth
                                >
                                    <MenuItem value="R1">R1</MenuItem>
                                    <MenuItem value="R2">R2</MenuItem>
                                    <MenuItem value="R3">R3</MenuItem>
                                    <MenuItem value="R4">R4</MenuItem>
                                    <MenuItem value="R5">R5</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    value={field.value || 'Open'}
                                    className="mt-8 mb-16"
                                    label="Status"
                                    select
                                    autoFocus
                                    id="status"
                                    fullWidth
                                >
                                    <MenuItem value="Open">Open</MenuItem>
                                    <MenuItem value="Close">Close</MenuItem>
                                </TextField>
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Button
                            className="whitespace-nowrap mb-16"
                            variant="contained"
                            color="secondary"
                            disabled={isDiable}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            className="whitespace-nowrap mb-16"
                            variant="contained"
                            color="error"
                            disabled={isDiable}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    To confirm, type "DELETE {getValues('sheet')}" in the box
                    bellow
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register('confirmation')}
                            className="mt-8 mb-16"
                            required
                            autoFocus
                            id="confirmation"
                            variant="outlined"
                            fullWidth
                        />

                        <Button color="error" type="submit">
                            DELETE THIS GENBA
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Tab1
