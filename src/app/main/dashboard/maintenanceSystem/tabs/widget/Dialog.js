// import { useEffect, useState, forwardRef } from 'react'
// import {
//     Box,
//     Dialog,
//     Typography,
//     Button,
//     AppBar,
//     Toolbar,
//     Slide,
//     Grid,
//     IconButton,
//     TextField,
//     MenuItem,
// } from '@mui/material'
// import { SaveAs } from '@mui/icons-material'
// import { Cancel } from '@mui/icons-material'
// import _ from 'lodash'

// const Transition = forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />
// })

// function Dialog(params) {
//     const [open, setOpen] = useState(false)
//     const handleClose = (event, reason) => {
//         if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
//             setOpen(false)
//         }
//     }

//     useEffect(() => {
//         if (params.set == true) {
//             setOpen(true)
//         }
//     }, [params])

//     return (
//         <Dialog
//             open={open}
//             maxWidth={'xl'}
//             onClose={handleClose}
//             TransitionComponent={Transition}
//         >
//             <AppBar sx={{ position: 'relative' }}>
//                 <Toolbar>
//                     <IconButton
//                         edge="start"
//                         color="inherit"
//                         onClick={handleSave}
//                         aria-label="close"
//                     >
//                         <SaveAs />
//                     </IconButton>
//                     <Typography
//                         sx={{ ml: 2, flex: 1 }}
//                         variant="h6"
//                         component="div"
//                     >
//                         Update
//                     </Typography>

//                     <Button autoFocus color="inherit" onClick={handleClose}>
//                         Close
//                     </Button>
//                 </Toolbar>
//             </AppBar>
//         </Dialog>
//     )
// }

// export default Dialog
