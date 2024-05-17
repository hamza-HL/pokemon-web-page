export interface PokemonData {
    name: string
    url: string
  }
  

  export interface PokemonResultData {
    results: PokemonData[]
    count: number
  }
  
  export interface PokemonsList {
    data: PokemonResultData
    error: boolean
    isLoading: boolean
    isFetching: boolean
    results: PokemonData[]
  }
  
  export interface Type {
    type: {
      name: string
    }
  }
  
  export interface PokemonType {
    id: number
    name: string
    weight: number
    types: Type[]
    height: number
    sprites: {
      front_default: string
    }
  }
  
  export interface PokemonQuery {
    data: PokemonType | undefined
    isError: boolean
    isLoading: boolean
  }

  