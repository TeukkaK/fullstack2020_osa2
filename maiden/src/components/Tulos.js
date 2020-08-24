import React from 'react'

const Filter = props => {
    const { filterName, handleNewFiltername } = props
    return (
        <div>
            find countries
        <input value={filterName} onChange={handleNewFiltername} />
        </div>
    )
}

export default Tulos;