/* POKEMON RESULTS INTERFACES */

export interface PokemonListResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  Result[];
}

export interface Result {
    name: string;
    url:  string;
    id:   number;
    img:  string;
}

export interface SmallPokemon {
    name: string;
    url:  string;
}
