import {useReducer} from 'react';

interface Dataform {
    gender: string,
    eggGroup: string,
    type: string
}

const inputReducerData: Dataform = {
    gender: 'genderless',
    eggGroup: 'ditto',
    type: 'normal'
}

const reducer = (state:Dataform, action: { type: string; value: string; }) => {
    switch (action.type) {
        case 'gender': 
            return {
            gender: action.value,
            eggGroup: state.eggGroup,
            type: state.type
            };
        case 'egg-group': 
            return {
            gender: state.gender,
            eggGroup: action.value,
            type: state.type
            };
        case 'type':
            return {
            gender: state.gender,
            eggGroup: state.eggGroup,
            type: action.value
            };
        default: 
            throw new Error();
    }
}

    export function useInput() {
        return useReducer(reducer, inputReducerData);
    }
