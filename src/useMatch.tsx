import { useFetch } from './useFetch';

interface DataInput {
    gender: string,
    eggGroup: string,
    type: string
}

function arrayIntersection(array1: string[], array2: string[]): string[] {
    return array1.filter((item) => array2.includes(item));
}

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

function matchAlgorithm(gender: any, eggGroup: any, type: any) {

    const genderArray: string[] = gender.map((item: { pokemon_species: { name: string, url: string }; }) => item.pokemon_species.name);
    const eggGroupArray: string[] = eggGroup.map((item: { name: string, url: string }) => item.name);
    const typeArray: string[] = type.map((item: { pokemon: { name: string, url: string } }) => item.pokemon.name);

    const interGenderAndEggGroup = arrayIntersection(genderArray, eggGroupArray);

    if (interGenderAndEggGroup.length > 0) {
        const interGenderAndEggGroupAndType = arrayIntersection(interGenderAndEggGroup, typeArray);
        if (interGenderAndEggGroupAndType.length > 0) {
            return interGenderAndEggGroupAndType[getRandomInt(0, interGenderAndEggGroupAndType.length)];
        } else {
            return 'We can´t find you a match';
        }
    } else {
        return 'We can´t find you a match';
    }
}

export function useMatch(formData: DataInput, flag: boolean, setformDataFlag: any, setMatchDataFlag: any) {
    const inputGender: any = useFetch('input-gender', formData.gender);
    const inputEggGroup: any = useFetch('input-eggGroup', formData.eggGroup);
    const inputType: any = useFetch('input-type', formData.type);

    if (flag && inputGender.pokemon_species_details && inputEggGroup.pokemon_species && inputType.pokemon) {
        const pokemonName = matchAlgorithm(inputGender.pokemon_species_details, inputEggGroup.pokemon_species, inputType.pokemon);
        setformDataFlag(false);
        if(pokemonName !== 'We can´t find you a match') setMatchDataFlag(true);
        return {pokemonName, formData};
    }

    return 'There´s no input';
}