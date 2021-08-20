import {useEffect, useState} from 'react';

function generateUri (type: string, dataInput: string) {
    let uri: string;
    switch (type) {
        case 'general-gender': {
            uri = 'https://pokeapi.co/api/v2/gender';
            break;
        }
        case 'general-eggGroup': {
            uri = 'https://pokeapi.co/api/v2/egg-group';
            break;
        }
        case 'general-type': {
            uri = 'https://pokeapi.co/api/v2/type';
            break;
        }
        case 'input-gender': {
            uri = 'https://pokeapi.co/api/v2/gender/' + dataInput;
            break;
        }
        case 'input-eggGroup': {
            uri = 'https://pokeapi.co/api/v2/egg-group/' + dataInput;
            break;
        }
        case 'input-type': {
            uri = 'https://pokeapi.co/api/v2/type/' + dataInput;
            break;
        }
        case 'pokemon-species': {
            uri = 'https://pokeapi.co/api/v2/pokemon-species/' + dataInput;
            break;
        }
        case 'pokemon': {
            uri = 'https://pokeapi.co/api/v2/pokemon/' + dataInput;
            break;
        }
        default: 
            throw new Error('The type of fetch is wrong');
    }

    return uri;
}

export function useFetch (type: string, dataInput: string) {
    const [data, setData] = useState({});

    let uri: string = generateUri(type, dataInput);

    useEffect(() => {
        async function fetchPokemon() {
            let response = await fetch(uri)
            response = await response.json()
            setData(response)
          }
      
          fetchPokemon();
        }
    , [uri]);

    return data;
}