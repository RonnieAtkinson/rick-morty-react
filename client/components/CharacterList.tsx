// ==========================================================================
// COMPONENTS / #CHARACTER LIST
// ==========================================================================

/**
 * Imports
 * 1. Import react
 * 2. Import react router
 * 3. Import types
 *
 */
import React from 'react'; // [1]
import { Link } from 'react-router-dom'; // [2]
import { RM } from '../types'; // [3]

/**
 * Component for displaying a list of character links.
 *
 * @param {object} props
 * @param {RM.character[]} props.characters
 * @returns {React.ReactElement} React element
 * @example <CharacterList characters={RM.character[]} />
 *
 */
export const CharacterList = ({ characters }: { characters: RM.character[] }): React.ReactElement => {
    return (
        <ul className='character-list'>
            {characters.map(character => (
                <li key={character.id}>
                    <Link to={`/characters/${character.id}`}>{character.name}</Link>
                </li>
            ))}
        </ul>
    );
};
