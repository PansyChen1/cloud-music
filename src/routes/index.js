import React from 'react';
import { Redirect } from "react-router-dom";
import Home from '../module/Home/index';
import Recommend from '../module/Recommend/index';
import Singers from '../module/Singers/index';
import Rank from '../module/Rank/index';

export default [
    {
        path: "/",
        component: Home,
        routes: [
            {
                path: "/",
                exact: true,
                render: () => (
                    <Redirect to={"/recommend"}/>
                )
            },
            {
                path: "/recommend",
                component: Recommend
            },
            {
                path: "/singers",
                component: Singers
            },
            {
                path: "/rank",
                component: Rank
            }
        ]
    }
]