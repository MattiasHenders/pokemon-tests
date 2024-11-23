import { Species } from '@pkmn/dex'
import { GuessPokemonQuestion } from '../../models/questions'

class PokemonLegendaryTierQuestion extends GuessPokemonQuestion {
  question: string

  constructor(pokemon: Species) {
    super(pokemon)
    this.question = `that is ${this.getLegendaryTier(pokemon)}`
  }

  getLegendaryTier = ({ tags }: Species) => {
    if (tags.some((tag) => tag.includes('Legendary'))) {
      return 'Legendary'
    } else if (tags.some((tag) => tag === 'Mythical')) {
      return 'Mythical'
    } else {
      return 'Non-Legendary and Non-Mythical'
    }
  }

  guessChecker = (pokemon: Species): boolean =>
    this.getLegendaryTier(pokemon) ===
    this.getLegendaryTier(this.pokemonToGuess)
}

class PokemonIsMonoTypeQuestion extends GuessPokemonQuestion {
  question: string

  constructor(pokemon: Species) {
    super(pokemon)
    this.question = `that is ${pokemon.types.length === 1 ? 'Mono' : 'Dual'}-Typed`
  }

  guessChecker = ({ types }: Species): boolean =>
    this.pokemonToGuess.types.length === types.length
}

class PokemonEvolutionLineQuestion extends GuessPokemonQuestion {
  question: string

  constructor(pokemon: Species) {
    super(pokemon)
    this.question = `that ${pokemon.nfe || pokemon.prevo ? `has` : `doesn't have`} an evolution line`
  }

  guessChecker = ({ nfe, prevo }: Species): boolean => {
    if (this.pokemonToGuess.nfe || this.pokemonToGuess.prevo) {
      return nfe || !!prevo
    } else {
      return !nfe && !prevo
    }
  }
}

class PokeonIsTypeQuestion extends GuessPokemonQuestion {
  question: string

  constructor(pokemon: Species, generationNum: number = 9) {
    super(pokemon)
    this.question = `that is a${!this.isVowel(pokemon.types[0].charAt(0)) ? '' : 'n'} ${pokemon.types[0]} type`
  }

  isVowel = (char: string) => {
    const vowels = ['a', 'e', 'i', 'o', 'u']
    return vowels.includes(char.toLowerCase())
  }

  guessChecker = ({ types: guessTypes }: Species): boolean =>
    guessTypes.includes(this.pokemonToGuess.types[0])
}

class PokemonIsFromGenerationQuestion extends GuessPokemonQuestion {
  question: string

  constructor(pokemon: Species, generationNum: number = 9) {
    super(pokemon)
    this.question = `that is from the ${pokemon.gen + this.getSuffix(pokemon.gen)} generation`
  }

  getSuffix = (num: number): string => {
    switch (num) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  guessChecker = ({ gen }: Species): boolean => gen === this.pokemonToGuess.gen
}

export default [
  PokemonIsFromGenerationQuestion,
  PokeonIsTypeQuestion,
  PokemonEvolutionLineQuestion,
  PokemonIsMonoTypeQuestion,
  PokemonLegendaryTierQuestion,
]
