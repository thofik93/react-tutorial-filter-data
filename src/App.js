import React, { useEffect, useState } from 'react';
import './App.css';
import Icon from './components/Icon';
import User from './components/User';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import { get } from './store/usersThunks';
import { useSelector, useDispatch } from 'react-redux';
import {
    useSearchParams,
} from 'react-router-dom';

function App() {
	const dispatch = useDispatch();
	const statusData = useSelector((state) => state.users.statusData);
	const filtersParams = useSelector((state) => state.filters.params);
	const users = useSelector((state) => state.users.data);
	const listInfoUser = useSelector((state) => state.filters.listInfoUser)
	const showListUsers = statusData === 'succeeded' && users && users.length
	const activeColumnSortIndex = useSelector((state) => state.filters.activeColumnSortIndex);
	const [queryParams, setQueryParams] = useSearchParams();
	const containerTableClassName = activeColumnSortIndex > -1 ? 'table-sort-index-' + activeColumnSortIndex : ''
	const sortByHandler = (item) => {
		updateTableUI(item);
	}
	
	const updateQueryParams = ({sortBy, sortOrder}) => {
        let newQueryParams = Object.assign({ ...filtersParams }, { sortOrder, sortBy });
        if ('page' in newQueryParams) {
            delete newQueryParams.page;
        }
        dispatch({type: 'filters/setParams', data: newQueryParams}) 
        setQueryParams(newQueryParams);
	}

	const updateTableUI = (item) => {
		let copyListData = JSON.parse(JSON.stringify(listInfoUser));

		for (let i =0; i < copyListData.length; i++) {
			if (copyListData[i].title === item.title) {
				if (Boolean(item.sortOrder) === false) {
					copyListData[i].sortOrder = 'ascend'
				} else if (item.sortOrder === 'ascend') {
					copyListData[i].sortOrder = 'descend'
				} else {
					copyListData[i].sortOrder = 'ascend'
				}
				updateQueryParams({sortOrder: copyListData[i].sortOrder, sortBy: copyListData[i].field})
				dispatch({type: 'filters/setActiveColumnSortIndex', data: i})
			} else {
				copyListData[i].sortOrder = null
			}
		}
		dispatch({type: 'filters/setListInfoUser', data: copyListData})
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
		
						<div className={`${containerTableClassName}`}>
							<table className="table">
								<thead>
									<tr>
										{listInfoUser.map((item, key) => (
											<th 
												key={key}
												scope="col"
												onClick={() => { sortByHandler(item) }}
											>
												{item.title}
												<Icon 
													options={{
														style: {
															fontSize: 16,
															color: item.sortOrder === 'ascend' ? 'green' : ''  
														},
														className: "bi bi-arrow-down-short",	
													}} 
												/>
												<Icon 
													options={{
														style: {
															fontSize: 16,
															color: item.sortOrder === 'descend' ? 'green' : ''  
														},
														className: "bi bi-arrow-up-short",	
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
