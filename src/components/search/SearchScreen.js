import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import { useForm } from '../../hooks/useForm/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({history}) => {
    
    const location = useLocation();
    const {q = ''} = queryString.parse(location.search);

    
    const [formValues, handleInputChange] = useForm({
        searchString: q
    });
    const {searchString} = formValues;
    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);



    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${searchString}`);
    }

    return (
        <div className="animate__animated animate__fadeIn">
            <h1>Search Screen</h1>
            <hr />
            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr/>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Find your hero"
                            className="form-control"
                            name="searchString"
                            autoComplete="off"
                            value={searchString}
                            onChange= {handleInputChange}
                        />
                        <button
                            type="submit"
                            className="btn mt-3 btn-block btn-outline-primary "
                        >
                            Search
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results </h4>
                    <hr />
                    {
                        (q === '')
                            &&
                            <div className="alert alert-info">
                                Search a hero
                            </div>
                    }
                    {
                        (q !== '' && heroesFiltered.length === 0)
                            &&
                            <div className="alert alert-warning">
                                There is no hero with name: "{q}"
                            </div>
                    }
                    {
                        heroesFiltered.map(hero => (
                            <HeroCard 
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
