import roadmap from '@/src/data/roadmap'
import { alpha, Box } from '@mui/material'
import { FC, useState } from 'react'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import { palette } from '@/styles/palette'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const Roadmap: FC = () => {
  const [expandedId, setExpandedId] = useState<number>(
    roadmap.find((item) => !item.dateCompleted)?.id || 0
  )

  const handleChange =
    (panel: number) => (_: React.SyntheticEvent, newExpanded: boolean) => {
      setExpandedId(newExpanded ? panel : 0)
    }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {roadmap.map((item) => (
        <MuiAccordion
          key={item.id}
          expanded={item.id === expandedId}
          onChange={handleChange(item.id)}
          sx={{
            borderRadius: 2,
            backgroundColor: item.dateCompleted
              ? alpha(palette.primary.light, 0.5)
              : palette.primary.light,
          }}
        >
          <MuiAccordionSummary
            expandIcon={
              <KeyboardArrowUpIcon sx={{ color: palette.primary.darkText }} />
            }
          >
            <Box
              sx={{
                gap: 1,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: palette.primary.darkText,
                  textDecoration: item.dateCompleted ? 'line-through' : 'none',
                  fontSize: { xs: 18, md: 24 },
                }}
              >
                {item.title}
              </Typography>
              {item.dateCompleted && (
                <Typography
                  variant="body1"
                  sx={{
                    mr: { xs: 1, md: 2 },
                    color: palette.primary.darkText,
                    fontSize: { xs: 12, md: 18 },
                  }}
                >
                  Completed on: {item.dateCompleted.toDateString()}
                </Typography>
              )}
            </Box>
          </MuiAccordionSummary>
          <MuiAccordionDetails>
            <Typography
              variant="body2"
              sx={{ color: palette.primary.darkText }}
            >
              {item.content}
            </Typography>
          </MuiAccordionDetails>
        </MuiAccordion>
      ))}
    </Box>
  )
}
export default Roadmap
