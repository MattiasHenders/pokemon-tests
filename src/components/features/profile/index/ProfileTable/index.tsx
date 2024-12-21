import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  alpha,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { generateClient } from 'aws-amplify/api'
import { Schema } from '@/amplify/data/resource'
import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'
import { useEffect, useState } from 'react'
import { palette } from '@/styles/palette'

Amplify.configure(outputs)
const client = generateClient<Schema>()

type Row = {
  id: string
  date: string
  easyAnswer: string
  mediumAnswer: string
  hardAnswer: string
  impossibleAnswer: string
  points: number
}

export default () => {
  const { breakpoints } = useTheme()
  const matchMobileView = useMediaQuery(breakpoints.down('sm'))
  const [rows, setRows] = useState<Row[]>([])

  useEffect(() => {
    const fetchUsersTests = async () => {
      const { data: itemList, errors } = await client.models.UserTests.list({
        limit: 10,
      })

      if (!errors) {
        const rows = itemList.map((item) => ({
          id: item.id as string,
          date: item.createdAt.split('T')[0] ?? '-',
          easyAnswer: item.easyAnswer ?? '-',
          mediumAnswer: item.mediumAnswer ?? '-',
          hardAnswer: item.hardAnswer ?? '-',
          impossibleAnswer: item.impossibleAnswer ?? '-',
          points: item.points ?? 0,
        }))

        setRows(rows)
      }
    }

    fetchUsersTests()
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <Typography variant="h5" sx={{ color: palette.primary.lightText }}>
        Past Tests
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{
            backgroundColor: alpha(palette.primary.dark, 1),
          }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: palette.primary.main }}>
              <TableCell sx={{ color: palette.primary.darkText }}>
                Date
              </TableCell>
              <TableCell
                sx={{
                  color: palette.primary.darkText,
                  display: matchMobileView ? 'none' : 'table-cell',
                }}
                align="center"
              >
                Easy
              </TableCell>
              <TableCell
                sx={{
                  color: palette.primary.darkText,
                  display: matchMobileView ? 'none' : 'table-cell',
                }}
                align="center"
              >
                Medium
              </TableCell>
              <TableCell
                sx={{
                  color: palette.primary.darkText,
                  display: matchMobileView ? 'none' : 'table-cell',
                }}
                align="center"
              >
                Hard
              </TableCell>
              <TableCell
                sx={{
                  color: palette.primary.darkText,
                  display: matchMobileView ? 'none' : 'table-cell',
                }}
                align="center"
              >
                Impossible
              </TableCell>
              <TableCell
                sx={{ color: palette.primary.darkText }}
                align="center"
              >
                Points
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.date}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  sx={{ color: palette.primary.lightText }}
                  component="th"
                  scope="row"
                >
                  {row.date}
                </TableCell>
                <TableCell
                  sx={{
                    color: palette.primary.lightText,
                    display: matchMobileView ? 'none' : 'table-cell',
                  }}
                  align="center"
                >
                  {row.easyAnswer}
                </TableCell>
                <TableCell
                  sx={{
                    color: palette.primary.lightText,
                    display: matchMobileView ? 'none' : 'table-cell',
                  }}
                  align="center"
                >
                  {row.mediumAnswer}
                </TableCell>
                <TableCell
                  sx={{
                    color: palette.primary.lightText,
                    display: matchMobileView ? 'none' : 'table-cell',
                  }}
                  align="center"
                >
                  {row.hardAnswer}
                </TableCell>
                <TableCell
                  sx={{
                    color: palette.primary.lightText,
                    display: matchMobileView ? 'none' : 'table-cell',
                  }}
                  align="center"
                >
                  {row.impossibleAnswer}
                </TableCell>
                <TableCell
                  sx={{ color: palette.primary.lightText }}
                  align="center"
                >
                  {row.points}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
