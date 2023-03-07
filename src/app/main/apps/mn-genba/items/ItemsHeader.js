import { Button, Input, Paper, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { selectItemsSearchText, setItemsSearchText } from '../store/itemsSlice'

function ItemsHeader(props) {
    const dispatch = useDispatch()
    const searchText = useSelector(selectItemsSearchText)
    return (
        <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
            <Typography
                component={motion.span}
                initial={{ x: -20 }}
                animate={{ x: 0, transition: { delay: 0.2 } }}
                delay={300}
                className="text-24 md:text-32 font-extrabold tracking-tight"
            >
                Items
            </Typography>
            <div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
                <Paper
                    component={motion.div}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                    className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
                >
                    <FuseSvgIcon color="disabled">
                        heroicons-solid:search
                    </FuseSvgIcon>

                    <Input
                        placeholder="Search items"
                        className="flex flex-1"
                        disableUnderline
                        fullWidth
                        value={searchText}
                        inputProps={{ 'aria-label': 'Search' }}
                        onChange={(event) =>
                            dispatch(setItemsSearchText(event))
                        }
                    ></Input>
                </Paper>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                >
                    <Button
                        className=""
                        component={Link}
                        to="/apps/mn-genbaitems/new"
                        variant="contained"
                        color="secondary"
                        startIcon={
                            <FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>
                        }
                    >
                        Add
                    </Button>
                </motion.div>
            </div>
        </div>
    )
}

export default ItemsHeader
