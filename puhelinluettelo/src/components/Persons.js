import React from 'react'
import Person from './Person'

const Persons = (props) => {
    const filteredPersons = () => props.persons.filter(person =>
        person.name.toLowerCase().includes(props.filter.toLowerCase()));
    
    const rows = () => filteredPersons().map(person =>
        <Person
            key={person.id}
            name={person.name}
            number={person.number}
            handleDeletePerson={() => {props.handleDeletePerson(person.id)}}  
        />
    )

    return (
        rows()
    )
}

export default Persons