import { Box, Grow, Slide, SlideProps } from "@mui/material"
import { FC } from "react"

const SlideAndGrow: FC<SlideProps> = ({direction, in: inProp, appear, unmountOnExit, children, ...props}) => {
    return (
        <Slide
            direction={direction}
            in={inProp}
            appear={appear}
        >
            <Box
                width='100%'
            >
                <Grow
                    in={inProp}
                    appear={appear}
                    unmountOnExit={unmountOnExit}
                    >
                        {children}
                </Grow>
            </Box>
        </Slide>
    )
}

export default SlideAndGrow
