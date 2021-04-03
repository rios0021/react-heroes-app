import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router'
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = ({history}) => {

    const {heroId} = useParams();
    
    const hero = useMemo(() => getHeroById(heroId), [heroId]);
    // const hero = getHeroById(heroId);

    if(!hero){
        return <Redirect to="/"/>;
    }

    const handleReturn = () => {
        (heroId.indexOf('dc-') > -1)
            ? history.push('/dc')
            : history.push('/');
    }

    const {
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img
                    src={`../assets/${heroId}.jpg`}
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                    alt={superhero}
                >
                </img>
            </div>
            <div className="col-8 animate__animated animate__fadeInRight">
                <h3>{superhero}</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Ater ego: </b>{alter_ego}</li>
                    <li className="list-group-item"><b>Publisher: </b>{publisher}</li>
                    <li className="list-group-item"><b>First appearance: </b>{first_appearance}</li>
                </ul>
                <h5>Characters</h5>
                <p>{characters}</p>
                <button 
                    className="btn btn-outline-success"
                    onClick={handleReturn}
                >
                    Return
                </button>
            </div>
        </div>
    )
}
