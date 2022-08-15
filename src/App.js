import React, { useEffect, useState } from 'react';
import './App.css';
import Icon from './components/Icon';
import User from './components/User';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import { get } from './store/usersThunks';
import { useSelector, useDispatch } from 'react-redux';
const listInfoData = [
	{
		title: 'Username',
		sortType: null,
	},
	{
		title: 'Name',
		sortType: null,
	},
	{
		title: 'Email',
		sortType: null,
	},
	{
		title: 'Gender',
		sortType: null,
	},
	{
		title: 'Registered Date',
		sortType: null,
	}

]
function App() {
	const dispatch = useDispatch();
	const statusData = useSelector((state) => state.users.statusData);
	const users = useSelector((state) => state.users.data);
	const showListUsers = statusData === 'succeeded' && users && users.length
	const [listData, setListData] = useState(listInfoData)
	const sortByHandler = (item) => {
		console.log(item)
	}

	useEffect(() => {
		if (statusData === 'idle') {
			const params = {
				results: 10
			}
			dispatch(get(params))
		}
	}, [])

	return (
		<div className="App">
			<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-sky">
				<div className="container-fluid">
					<a className="navbar-brand" href="#">React Tutorial Filter Data</a>
				</div>
			</nav>

			<main className="container-fluid content">
			
				<Filters />

				<div className="row row-cols-auto">
					<div className="col">
		
						<div>
							<table className="table">
								<thead>
									<tr>
										{listData.map((item, key) => (
											<th 
												key={key}
												scope="col"
												onClick={() => { sortByHandler(item) }}
											>
												{item.title}
												<Icon 
													options={{
														style: {
															fontSize: 12,
														},
														className: "bi bi-arrow-down",	
													}} 
												/>
												<Icon 
													options={{
														style: {
															fontSize: 12,
														},
														className: "bi bi-arrow-up",	
													}} 
												/>
											</th>
										))}
									
									</tr>
								</thead>

								{showListUsers ?
									<tbody>
									
										{users.map((user, key) => (
											<User user={user} key={key} />
										))}
										
									</tbody>
									:
									<tbody>
										<tr>
											<td colSpan={5}>
												<div className="placeholder"></div>
											</td>
										</tr>
									</tbody>
									
								}
							</table>
							
						</div>


						<Pagination
							totalData={100}
							itemsPerPage={10}
						/>
					</div>
					
				</div>

			</main>
		</div>
	);
}

export default App;
