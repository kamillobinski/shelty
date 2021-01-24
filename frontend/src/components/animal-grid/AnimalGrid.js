import React from 'react';
import { Link } from 'react-router-dom';
import { ANIMAL_AVATAR_ROUTE } from '../../api/Api';
import './animalgrid.css';

const AnimalGrid = (props) => {

    function renderGrid(list) {
        if (list.length > 0) {
            return list.map((animal) => (
                <Link to={"/animal/" + animal.id}>
                    <div className="animalGrid-item" style={{ backgroundImage: "url(" + ANIMAL_AVATAR_ROUTE + animal.avatar + ")" }}>
                        <img src={ANIMAL_AVATAR_ROUTE + animal.avatar} />
                        <div className="animalGrid-item-name">
                            <span className="name">{animal.name}</span>
                            <span className="breed">{animal.breed.breedName}</span>
                        </div>
                    </div>
                </Link>
            ))
        } else {
            return (
                <div className="animalGrid-empty">
                    <span>No available animals at the moment</span>
                </div>
            )
        }
    }

    return (
        <div className="animalGrid">
            {renderGrid(props.animalList)}
        </div>
    )
}

export default AnimalGrid;