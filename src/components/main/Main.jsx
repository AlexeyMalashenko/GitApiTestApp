import React, {useEffect, useState} from 'react'
import './main.less'
import {useDispatch, useSelector} from "react-redux"
import {getRepos} from "../actions/repos"
import Repo from "./repo/Repo"
import {setCurrentPage} from "../../reducers/repos-reducer";
import {createPages} from "../../utils/pagesCreator";
import {Redirect} from "react-router-dom";

const Main = () => {
    const dispatch = useDispatch()
    const repos = useSelector(state => state.repos.items)
    const isFetching = useSelector(state => state.repos.isFetching)
    const currentPage = useSelector(state => state.repos.currentPage)
    const perPage = useSelector(state => state.repos.perPage)
    const totalCount = useSelector(state => state.repos.totalCount)
    const [searchValue, setSearchValue] = useState("")
    const pagesCount = Math.ceil(totalCount / perPage)
    const pages = []
    const isFetchError = useSelector(state => state.repos.isFetchError)

    createPages(pages, pagesCount, currentPage)

    useEffect(() => {
        dispatch(getRepos(searchValue, currentPage, perPage))
    }, [currentPage])

    function searchHandler() {
        dispatch(setCurrentPage(1))
        dispatch(getRepos(searchValue))
    }

    function pageChangeHandler(page) {
        dispatch(setCurrentPage(page))
    }

    /*   if (isFetchError) {
           return <Redirect to="/error"/>
       }*/

    return (
        <div>
            {isFetchError &&
            <div className="alert alert-danger" role="alert">
                Ошибка
            </div>
            }
            <div className="search">
                <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text"
                       placeholder="Input rapo name" className="search-input"/>
                <button onClick={() => searchHandler()} className="search-btn">Search</button>
            </div>
            {
                isFetching === false
                    ?
                    repos.map((repo, index) =>
                        <Repo key={index} repo={repo}/>)
                    :
                    <div className="fetching">

                    </div>
            }
            <div className="pages">
                {pages.map((page, index) => <span
                    key={index}
                    className={currentPage == page ? "current-page" : "page"}
                    onClick={() => pageChangeHandler(page)}>{page}</span>)
                }
            </div>
        </div>
    );
};

export default Main;