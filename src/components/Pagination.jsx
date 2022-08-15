import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import {
    useSearchParams,
} from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Pagination = (props) => {
    const {itemsPerPage, totalData} = props;
    const dispatch = useDispatch();
    const search = new URLSearchParams(useLocation().search);
    const [page, setPage] = useState(1);
    const [queryParams, setQueryParams] = useSearchParams();
    const statusData = useSelector((state) => state.users.statusData);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const filtersParams = useSelector((state) => state.filters.params);
    useEffect(() => {
        let page = (Number(itemOffset) / Number(itemsPerPage))  + 1;
        setPage(page);
        setPageNumber(page - 1)
        setPageCount(Math.ceil(totalData / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    useEffect(() => {
        if (statusData === 'succeeded') {
            let newQueryParams = Object.assign({ ...filtersParams }, { page });
            dispatch({type: 'filters/setParams', data: newQueryParams})
            setQueryParams(newQueryParams);
        }
    }, [page])
    
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % totalData;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        if (statusData !== 'idle') {
            if (!filtersParams.page) {
                setPageNumber(0)
            }
        }
    }, [filtersParams.page])

    useEffect(() => {
        const setDefaultValueOnFilters = ({key, value}) => {
            if  (key === 'page') {
                setPageNumber(Number(value) - 1)
            }
        }

        const getQueryParamsFromUrl = () => {
            search.forEach((value, key) => {
                setDefaultValueOnFilters({key, value});
            })
        }

        getQueryParamsFromUrl()
        
    }, [])
    

    return (

        <ReactPaginate
            breakLabel="..."
            nextLabel="next"
            forcePage={pageNumber}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="previous"
            containerClassName="pagination"
            pageClassName="page-item"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageLinkClassName="page-link"
            activeClassName="active"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
        />

    )
}

export default Pagination
