import React, { useState } from 'react';
import '../home-car.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { All_COLORS, ALL_MANUFACTURERS } from '../../constants';

const DropdownCustom = compProps => (
	<Dropdown>
	  <Dropdown.Toggle className="dropdown-white" id="dropdown-basic">
	    {compProps.selected}
	  </Dropdown.Toggle>
	  <Dropdown.Menu>
	  	{
				compProps && compProps.items && compProps.items.map(elem => <Dropdown.Item
																			key={elem}
																			href="#/action-1"
																			onSelect={() => compProps.setSelect(elem, compProps.type)}
																		>
																			{elem}
																		</Dropdown.Item>)
	  	}
	  </Dropdown.Menu>
	</Dropdown>
);

const Filter = props => {
	const { colors, manufacturers, handleFilter } = props;
	const [state, setState] = useState({ selectedColor: All_COLORS, selectedManufacturer: ALL_MANUFACTURERS });
	const setSelect = (elem, type) => {
		setState({...state, [type]: elem})
	}
	let availableCars = colors;
	let names = manufacturers && manufacturers.map(({name}) => name);
	names && names.unshift("All manufacturers");
	availableCars  && availableCars.unshift("All car colors");

	return (	<section className="filter" data-testid="filter-comp">
				<section className="filter-box">
					<p>Color</p>
					<DropdownCustom
						key="color"
						items={colors} 
						selected={state.selectedColor} 
						type={"selectedColor"} 
						setSelect={setSelect} 
					/>
					<p>Manufacturer</p>
					<DropdownCustom
						key="manufacturer"
						items={names}
						selected={state.selectedManufacturer}
						type={"selectedManufacturer"}
						setSelect={setSelect}
					/>
					<Button className="filter-button" data-testid="filter" onClick={() => handleFilter(state)}>Filter</Button>
				</section>
			</section>)
};


export default Filter;