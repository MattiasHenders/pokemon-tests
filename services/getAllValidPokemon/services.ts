import { Dex, Species } from '@pkmn/dex'
import { ILLEGAL_FORMS, ILLEGAL_SPECIES_FORMS } from './data'

/**
 * Returns an array of all valid Pokémon species, including all
 * non-legendary species with a valid num and forme that are not
 * on the custom illegal forme list or the illegal species forme list.
 *
 * @returns {Species[]} An array of all valid Pokémon species.
 */
const getAllValidPokemon = (): Species[] => {
  let allLegalPokemon = Dex.species.all().filter((s) => s.num > 0)

  // Remove all Illegal Species forms
  allLegalPokemon = allLegalPokemon.filter(
    (s) => !ILLEGAL_SPECIES_FORMS.includes(s.baseSpecies) || !s.forme
  )

  // Remove all other custom Illegal forms
  allLegalPokemon = allLegalPokemon.filter(
    (s) => !ILLEGAL_FORMS.includes(s.forme)
  )

  return allLegalPokemon
}

export default getAllValidPokemon
