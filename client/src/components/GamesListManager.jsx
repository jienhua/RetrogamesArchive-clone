import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import Game from './Game';

export default class GamesListManager extends PureComponent {
	render () {
		const { games, searchBar, setSearchBar, toggleModal, deleteGame } = this.props;
		return (
			<div className='container scrollable'>
				<div className='row text-left'>
					<Link to='/games/add' className='btn btn-danger'>Add a new Game!</Link>
				</div>
				<input type="text" className="form-control" placeholder="Search by name" onChange={(event) => this.props.setSearchBar(event)} />
				<div className='row'>
					{
						// A Game is only shown if its name contains the string from the search Bar
						games.filter(game=>{
							return game.name.toLowerCase().includes(searchBar);
						}).map((game, i)=>{
							return (
								<Game {...game}
									key={game._id}
									i={i}
									toggleModal={toggleModal}
									deleteGame={deleteGame}
								/>
							);
						})
					}
				</div>
				<hr />>
			</div>
		);
	}
}