import React from 'react';

const SelectComponent = (props) => {
    let countyOptions = props.options.map((county) => {
        return <option key={county.objectid}>{county.name}</option>
    });
    return (
        <div className="ui horizontal segments">
            <div className="ui segment">
                <p></p>
            </div>
            <div className="ui segment">
                <select style={{display: 'block'}}>
                        {countyOptions}
                </select>
            </div>
        </div>
    );
}

export default SelectComponent;