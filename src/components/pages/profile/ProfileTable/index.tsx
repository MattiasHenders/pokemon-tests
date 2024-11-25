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
} from '@mui/material'
import { generateClient } from 'aws-amplify/api'
import { Schema } from '@/amplify/data/resource'
import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'
import { useEffect, useState } from 'react'
import { palette } from '@/styles/palette'

Amplify.configure(outputs, { ssr: true })
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
  const [rows, setRows] = useState<Row[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

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
      setIsLoading(false)
    }

    fetchUsersTests()
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Typography variant="h5" sx={{ color: palette.primary.lightText }}>
        Past Tests
      </Typography>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 650,
            backgroundColor: alpha(palette.primary.dark, 1),
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: palette.primary.main }}>
              <TableCell sx={{ color: palette.primary.darkText }}>
                Date
              </TableCell>
              <TableCell
                sx={{ color: palette.primary.darkText }}
                align="center"
              >
                Easy
              </TableCell>
              <TableCell
                sx={{ color: palette.primary.darkText }}
                align="center"
              >
                Medium
              </TableCell>
              <TableCell
                sx={{ color: palette.primary.darkText }}
                align="center"
              >
                Hard
              </TableCell>
              <TableCell
                sx={{ color: palette.primary.darkText }}
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
                  sx={{ color: palette.primary.lightText }}
                  align="center"
                >
                  {row.easyAnswer}
                </TableCell>
                <TableCell
                  sx={{ color: palette.primary.lightText }}
                  align="center"
                >
                  {row.mediumAnswer}
                </TableCell>
                <TableCell
                  sx={{ color: palette.primary.lightText }}
                  align="center"
                >
                  {row.hardAnswer}
                </TableCell>
                <TableCell
                  sx={{ color: palette.primary.lightText }}
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
