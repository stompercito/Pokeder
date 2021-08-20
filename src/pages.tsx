import * as React from 'react';
import { useState } from 'react';
import { useInput } from './useInput'
import { useFetch } from './useFetch'
import { useMatch } from './useMatch';
import { usePokemon, Pokemon } from './usePokemon';
import { AlignItemsList } from './List';

export function Home() {
    if ((localStorage.getItem('user'))) {
        window.location.href = "http://localhost:3000/list";
    }

    const [enteredName, setEnteredName] = useState('');
    const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
    const [enteredNameIsTouch, setEnteredNameIsTouch] = useState(false);

    const nameInputChangeHandler = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setEnteredName(event.target.value);
    };

    const formSubmitHandler = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        setEnteredNameIsTouch(true);

        if (enteredName.trim() === '') {
            setEnteredNameIsValid(false);
            return;
        }

        setEnteredNameIsValid(true);

        console.log('The name ' + enteredName + ' was added to the local storage');
        localStorage.setItem('user', JSON.stringify({ name: enteredName }));
        window.location.href = "http://localhost:3000/form";
    };

    const nameInputIsInvalid: boolean = !enteredNameIsValid && enteredNameIsTouch;

    const nameInputClasses: string = nameInputIsInvalid ? 'form-control invalid' : 'form-control';

    return (
        <div className="card">
            <form onSubmit={formSubmitHandler}>
                <h1>Pokeder</h1>
                <div className={nameInputClasses}>
                    <label htmlFor='name'>Your Name</label>
                    <input type='text' id='name' onChange={nameInputChangeHandler} />
                </div>
                {nameInputIsInvalid && <p className="error-text">Name must not be empty.</p>}
                <div className="form-actions">
                    <button>Submit</button>
                </div>
            </form>
        </div>
    );
}

export function Form() {
    const [formData, setformData] = useInput();

    const [formDataFlag, setformDataFlag] = useState(false);
    const [matchDataFlag, setMatchDataFlag] = useState(false);

    const [pokemonMatch, setPokemonMatch] = useState({});

    const generalGender: any = useFetch('general-gender', '');
    const generalEggGroup: any = useFetch('general-eggGroup', '');
    const generalType: any = useFetch('general-type', '');

    let optionsGender = <option value='Loading...'>Loading...</option>
    let optionsEggGroup = <option value='Loading...'>Loading...</option>
    let optionsType = <option value='Loading...'>Loading...</option>

    const useMatchData = useMatch(formData, formDataFlag, setformDataFlag, setMatchDataFlag);
    const pokemonDetailsData = usePokemon(pokemonMatch, matchDataFlag, setMatchDataFlag);

    if (useMatchData !== 'There´s no input' && useMatchData.pokemonName !== 'We can´t find you a match') {
        setPokemonMatch(useMatchData);
    } else if (useMatchData !== 'There´s no input') {
        localStorage.setItem('match', JSON.stringify({ msg: useMatchData.pokemonName }));
        window.location.href = "http://localhost:3000/match";
    }

    if (pokemonDetailsData) {
        localStorage.setItem('match', JSON.stringify(pokemonDetailsData));
        window.location.href = "http://localhost:3000/match";
    }

    if (generalGender.results && generalEggGroup.results && generalType.results) {
        optionsGender = generalGender!.results.map((valueM: any) => {
            return <option key={valueM.name} value={valueM.name}>{valueM.name}</option>
        })
        optionsEggGroup = generalEggGroup!.results.map((valueM: any) => {
            return <option key={valueM.name} value={valueM.name}>{valueM.name}</option>
        })
        optionsType = generalType!.results.map((valueM: any) => {
            return <option key={valueM.name} value={valueM.name}>{valueM.name}</option>
        })
    }

    const InputChangeHandler = (event: { target: any }) => {
        setformData({ type: event.target?.id, value: event.target?.value });
    };

    const formSubmitHandler = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setformDataFlag(true);
    };

    if (!(localStorage.getItem('user'))) {
        window.location.href = "http://localhost:3000/";
    } else {
        return (
            <div className="card">
                <form onSubmit={formSubmitHandler}>
                    <h1>Find your Pokemon match</h1>
                    <div className='control-group'>
                        <div className='form-control'>
                            <label htmlFor='name'>Choose the Pokemon gender</label>
                            <select value={formData.gender} id={'gender'} onChange={InputChangeHandler}>
                                {
                                    optionsGender
                                }
                            </select>
                        </div>
                        <div className='form-control'>
                            <label htmlFor='name'>Choose the Pokemon egg group</label>
                            <select value={formData.eggGroup} id={'egg-group'} onChange={InputChangeHandler}>
                                {
                                    optionsEggGroup
                                }
                            </select>
                        </div>
                        <div className='form-control'>
                            <label htmlFor='name'>Choose the Pokemon type</label>
                            <select value={formData.type} id={'type'} onChange={InputChangeHandler}>
                                {
                                    optionsType
                                }
                            </select>
                        </div>
                    </div>
                    <div className='form-actions'>
                        <button>Find a Match</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div></div>
    );

}

export function Match() {
    if (!(localStorage.getItem('user'))) {
        window.location.href = "http://localhost:3000/";
    } else if (!(localStorage.getItem('match'))) {
        window.location.href = "http://localhost:3000/form";
    } else {
        const matchObj = JSON.parse(localStorage.getItem('match')!);

        if (matchObj.msg) {
            const clicHandler = () => {
                window.location.href = "http://localhost:3000/form";
            }
            return (
                <div className="card">
                    <h1>{matchObj.msg} try again</h1>
                    <button onClick={clicHandler}> Search Again</button>
                </div>
            );
        }

        const clicHandlerMatch = () => {
            if (!(localStorage.getItem('list'))) {
                const listArr: Array<Pokemon> = [];
                listArr.push(matchObj);
                localStorage.setItem('list', JSON.stringify(listArr));
            } else {
                const listArr: any = JSON.parse(localStorage.getItem('list')!);
                listArr.push(matchObj);
                localStorage.setItem('list', JSON.stringify(listArr));
            }
            localStorage.removeItem('match');
            window.location.href = "http://localhost:3000/list";
        }

        return (
            <div className="card">
                <h1>Your Match is {matchObj.name}</h1>
                <img src={matchObj.img} alt={matchObj.name}></img>
                <p>Gender: {matchObj.gender}</p>
                <p>Egg-Group: {matchObj.eggGroup}</p>
                <p>Type: {matchObj.type}</p>
                { matchObj.habitat && <p>Habitat: {matchObj.habitat}</p>}
                { matchObj.evolves_from && <p>Evolves from: {matchObj.evolves_from}</p>}
                <button onClick={clicHandlerMatch}> Go to your match list</button>
            </div>
        );
    }

    return (
        <div></div>
    );
}

export function List() {
    if (!(localStorage.getItem('user'))) {
        window.location.href = "http://localhost:3000/";
    } else if (!(localStorage.getItem('list'))) {
        window.location.href = "http://localhost:3000/form";
    } else {
        const { name } = JSON.parse(localStorage.getItem('user')!);

        const deleteHandler = () => {
            localStorage.clear();
            window.location.href = "http://localhost:3000/";
        }

        const formHandler = () => {
            window.location.href = "http://localhost:3000/form";
        }

        return (
            <div className="list">
                <h1>This is your list {name}</h1>
                <AlignItemsList/>
                <br></br>
                <button style = {{marginRight: '20px'}} onClick={formHandler}> Find a new match</button>
                <button style = {{marginLeft: '20px'}} onClick={deleteHandler}> Delete User</button>
            </div>
        );
    }

    return (
        <div></div>
    );
}

export function NotFoud404() {
    return (
        <div style={{ margin: "auto", textAlign: "center" }}>
            <h1>404</h1>
            <h2>This page wasn't found</h2>
            <img src="https://c.tenor.com/cF2pK-0zQugAAAAC/pulpfiction-john-travolta.gif" alt="John Travolta"></img>
        </div>
    );
}