import { useFetch } from './useFetch';
import { v4 as uuidv4 } from 'uuid';

export class Pokemon {
    id: string;
    name: string;
    gender: string;
    eggGroup: string;
    type: string;
    habitat: string | null;
    evolves_from: string | null;
    img: string;

    constructor(id: string, name: string, gender: string, eggGroup: string, type: string, habitat: string, evolves_from: string, img: string) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.eggGroup = eggGroup;
        this.type = type;
        this.habitat = habitat;
        this.evolves_from = evolves_from;
        this.img = img;
    }
}

interface Dataform {
    gender: string,
    eggGroup: string,
    type: string
}

export function usePokemon(pokemonData: {pokemonName: string, formData: Dataform} | any, matchDataFlag: boolean, setMatchDataFlag: any) {
    let data = '';
    if (pokemonData.pokemonName) data = pokemonData.pokemonName;

    const pokemonEspecieDetail: any = useFetch('pokemon-species', data);
    const pokemonDetail: any = useFetch('pokemon', data);

    if (matchDataFlag && pokemonEspecieDetail.name && pokemonDetail.name && data === pokemonDetail.name)  {
        setMatchDataFlag(false);
        let habitat = null;
        let evolves = null;
        if (pokemonEspecieDetail.habitat) habitat = pokemonEspecieDetail.habitat.name;
        if (pokemonEspecieDetail.evolves_from_species) evolves = pokemonEspecieDetail.evolves_from_species.name;
        return new Pokemon(uuidv4(), pokemonDetail.name, pokemonData.formData.gender, pokemonData.formData.eggGroup, pokemonData.formData.type, habitat, evolves, pokemonDetail.sprites.front_default);
    }

    return false;
}