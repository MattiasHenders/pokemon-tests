import { Species } from '@pkmn/dex'

export abstract class GuessPokemonQuestion {
  question: string
  pokemonToGuess: Species

  constructor(pokemon: Species) {
    this.pokemonToGuess = pokemon
    this.question = ''
  }

  getQuestion(): string {
    return this.question
  }

  abstract guessChecker(pokemon: Species): boolean
}
