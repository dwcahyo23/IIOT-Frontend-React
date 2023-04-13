import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import { lighten } from '@mui/material/styles'
import { differenceInHours, addHours } from 'date-fns'
import _ from 'lodash'
import MaintenanceInfo from '../MaintenanceInfo'
import MaintenanceProgress from '../MaintenanceProgress'

function CourseCard({ course }) {
    function calcProgress() {
        const diff = []

        _.forEach(course.mn_items, (x) => {
            const dH =
                differenceInHours(
                    addHours(new Date(x.change_at), x.item_life_time),
                    new Date()
                ) / x.item_life_time

            diff.push(dH)
        })

        return _.min(diff) * 100
    }

    function colorProgress() {
        if (calcProgress() < 20) {
            return 'error'
        } else {
            return 'secondary'
        }
    }

    return (
        <Card className="flex flex-col shadow">
            <CardContent className="flex flex-col flex-auto p-24">
                <MaintenanceInfo course={course} className="" />
            </CardContent>

            <MaintenanceProgress className="" course={calcProgress()} />

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
                    //   to={`/apps/academy/courses/${course.id}/${course.slug}`}
                    //   component={Link}
                    className="px-16 min-w-100"
                    color={colorProgress()}
                    variant="contained"
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

export default CourseCard
