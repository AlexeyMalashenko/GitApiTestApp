import React, {useEffect, useState} from 'react';
import './card.less'
import {useParams} from "react-router-dom"
import {getContributors, getCurrentRepo} from "../actions/repos";


const Card = (props) => {
    const {username, reponame} = useParams()
    const [repo, setRepo] = useState({owner: {}})
    const [contributors, setContributors] = useState([])

    useEffect(() => {
        getCurrentRepo(username, reponame, setRepo)
        getContributors(username, reponame, setContributors)
    }, [])

    return (
        <div>
            <button onClick={() => props.history.goBack()} className="back-btn">BACK</button>
            <div className="card">
                <img src={repo.owner.avatar_url} alt=""/>
                <div className="name">{repo.name}</div>
                <div className="start">{repo.stargazers_count}</div>
            </div>

            {
                contributors.map((contributor, index) =>
                    <div key={index}>{index + 1}. {contributor.login}</div>)
            }

        </div>
    );
};

export default Card;