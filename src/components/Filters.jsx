import React, { useEffect, useState, useRef } from 'react';
import Icon from './Icon';
import {
    useSearchParams,
} from 'react-router-dom';
import { get } from '../store/usersThunks';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { listInfoUser } from '../global-data'
const debounce = require('lodash.debounce');

const Filters = (props) => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const search = new URLSearchParams(useLocation().search);
    const [gender, setGender] = useState('all');
    const [queryParams, setQueryParams] = useSearchParams();
    const filtersParams = useSelector((state) => state.filters.params);

    const onChangeHandler = (event) => {
        let gender = event.target.value;
        let newQueryParams = Object.assign({ ...filtersParams }, { gender });

        if ('page' in newQueryParams) {
             delete newQueryParams.page;
        }
        dispatch({type: 'filters/setParams', data: newQueryParams})
        if (gender === 'all') {
            let updateQueryParams = {...newQueryParams}
            delete updateQueryParams.gender;
            delete updateQueryParams.page;
            setQueryParams(updateQueryParams);
        } else {           
            setQueryParams(newQueryParams);
        }
        setGender(gender)
    }

    const onSearchHanlder = (event) => {
        
        const searchQuery = event.target.value;
        let newQueryParams;

    
        if (searchQuery.length > 2) {
            newQueryParams = Object.assign({ ...filtersParams }, { searchQuery });

            if ('page' in newQueryParams) {
                delete newQueryParams.page;
           }

            dispatch({type: 'filters/setParams', data: newQueryParams})
            setQueryParams(newQueryParams);
        }
    }

    const onSearchDeleteHanlder = (event) => {
        const searchQuery = event.target.value;
        
        if (event.keyCode === 8) {
            let newQueryParams = Object.assign({ ...filtersParams }, { searchQuery });
            if ('page' in newQueryParams) {
                delete newQueryParams.page;
            }

            if (searchQuery.length <= 2) {
                delete newQueryParams.searchQuery;
                setQueryParams(newQueryParams);
            }
        }
    }

    const resetFilterHandler = () => {
        setQueryParams({})
        dispatch({type: 'filters/setParams', data: {} })
        dispatch({type: 'filters/setListInfoUser', data: listInfoUser })
        dispatch({type: 'filters/setActiveColumnSortIndex', data: -1})
        setGender('all')
        inputRef.current.value = ''
        dispatch(get())
    }

    useEffect(() => {
        let hasQueryParams = filtersParams && Object.keys(filtersParams).length;
        if (hasQueryParams) {
            let params = {...filtersParams}
            if (params.gender && params.gender === 'all') {
                delete params.gender
            }

            if (params.searchQuery && (params.searchQuery === '' || params.searchQuery.length < 2)) {
                delete params.searchQuery
            }

            dispatch(get(params))
        }
    }, [filtersParams])

    useEffect(() => {
        const setDefaultValueOnFilters = ({key, value}) => {
            if  (key === 'gender') {
                setGender(value)
            }

            if (key === 'searchQuery') {
               inputRef.current.value = value
            }
        }

        const getQueryParamsFromUrl = () => {
            let urlParams = {}
            search.forEach((value, key) => {
                urlParams[key] = value;
                setDefaultValueOnFilters({key, value});
            })
            if (urlParams && Object.keys(urlParams).length) {
                dispatch({type: 'filters/setParams', data: urlParams})
            }
        }

        getQueryParamsFromUrl()
        
    }, [])

    return (
        <div className="group-filters">
            <div className="row row-cols-auto">
                <div className="col">
                    <form className="row g-3" onSubmit={(e) => e.preventDefault()}>
                        <div className="col-auto">
                            <label className="visually-hidden">Search</label>
                            <div className="input-group">
                                <input 
                                    ref={inputRef}
                                    type="text" 
                                    name="value_search"
                                    className="form-control" 
                                    placeholder="Search..." 
                                    onKeyPress={debounce(onSearchHanlder, 500)}
                                    onKeyDown={debounce(onSearchDeleteHanlder, 500)}
                                   
                                />
                                <div className="input-group-text">
                                    <Icon options={{
                                         className: 'bi bi-search'
                                    }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-auto">
                            <label className="visually-hidden">Gender</label>
                            <select 
                                value={gender}
                                className="form-select" 
                                onChange={onChangeHandler}
                            >
                                <option value="all">All</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="col-auto">
                            <button 
                                onClick={resetFilterHandler}
                                type="submit" 
                                className="btn btn-primary mb-3"
                            >
                                Reset Filter
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Filters