import React from 'react'
import Person from './Person'

const Numbers = ({persons}) => {
    const list = persons.map(p =>
             <Person key={p.name} person={p} />
        )
    return(
        
        <div>
            <h2>Numbers</h2>
            {list}
        </div>  
    )
}

export default Numbers