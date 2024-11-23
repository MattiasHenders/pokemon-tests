import { useRef, useState } from 'react'
import {
  Autocomplete,
  autocompleteClasses,
  Box,
  TextField,
  Typography,
} from '@mui/material'
import { getAllValidPokemon } from '@/services/getAllValidPokemon'
import { Species } from '@pkmn/dex'
import SinglePokemonSelect from './SinglePokemonSelect'
import { useAnswerStore } from '@/src/stores/answer'
import { useInputStore } from '@/src/stores/input'
import { palette } from '@/styles/palette'

export default () => {
  const { input, setInput, setSelectedPokemon } = useInputStore()
  const { displayAnswer } = useAnswerStore()
  const [allValidPokemon] = useState(getAllValidPokemon())
  const [isOpen, setIsOpen] = useState(false)
  const hint = useRef('')

  const handleInputChange = (
    _: React.SyntheticEvent<Element, Event>,
    value: string
  ) => {
    setInput(value)
    setIsOpen(value.length >= 2)
  }

  return (
    <Autocomplete
      freeSolo
      fullWidth
      disabled={displayAnswer}
      inputValue={input}
      options={allValidPokemon}
      open={isOpen}
      onKeyDown={(event) => {
        if (event.key === 'Tab') {
          if (hint.current) {
            setInput(hint.current)
            event.preventDefault()
          }
        }
      }}
      onClose={() => {
        hint.current = ''
      }}
      onChange={(_: any, newValue: Species | string | null) => {
        if (newValue && typeof newValue !== 'string')
          setSelectedPokemon(newValue)
        setIsOpen(false)
      }}
      onInputChange={(event, value) => handleInputChange(event, value)}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.name
      }
      sx={{
        width: { xs: 300, md: 400 },
      }}
      componentsProps={{
        popper: {
          sx: {
            '& .MuiAutocomplete-listbox': {
              p: 0,
            },
          },
        },
      }}
      renderOption={({ key, ...props }, option) => {
        return typeof option === 'string' ? null : (
          <Box
            key={key}
            component="li"
            {...props}
            sx={{
              backgroundColor: palette.secondary.light,
              [`&.${autocompleteClasses.option}`]: {
                // Normal input styles
                padding: 1,
                backgroundColor: palette.primary.light,
                color: palette.primary.darkText,

                // Hover styles
                '&:hover': {
                  backgroundColor: palette.primary.main,
                  color: palette.primary.lightText,
                },
                '&.Mui-focused': {
                  backgroundColor: palette.primary.main,
                  color: palette.primary.lightText,
                },
              },
            }}
          >
            <SinglePokemonSelect pokemon={option} {...props} />
          </Box>
        )
      }}
      renderInput={(params) => {
        return (
          <Box
            sx={{
              position: 'relative',
              backgroundColor: palette.secondary.light,
              color: palette.secondary.lightText,
              borderRadius: '8px 8px 0 0',
            }}
          >
            <Typography
              sx={{
                position: 'absolute',
                left: 14,
                top: 16,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                width: 'calc(100% - 75px)',
              }}
            >
              {hint.current}
            </Typography>
            <TextField
              variant="filled"
              sx={{
                color: palette.secondary.lightText,
                '& label.Mui-focused': {
                  color: palette.primary.dark,
                },
                '& .MuiFilledInput-root': {
                  '&::before, &::after': {
                    borderBottom: `2px solid ${palette.primary.main}`,
                  },
                  '&:hover:not(.Mui-disabled, .Mui-error):before': {
                    borderBottom: `2px solid ${palette.primary.main}`,
                  },
                  '&.Mui-focused:after': {
                    borderBottom: `2px solid ${palette.primary.light}`,
                  },
                },
              }}
              {...params}
              onChange={(event) => {
                const newValue = event.target.value
                setInput(newValue)
                const matchingOption = allValidPokemon.find((option) =>
                  option.name.startsWith(newValue)
                )

                if (newValue && matchingOption) {
                  hint.current = matchingOption.name
                } else {
                  hint.current = ''
                }
              }}
              label="Pokémon"
            />
          </Box>
        )
      }}
    />
  )
}
