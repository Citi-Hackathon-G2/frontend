import React, { Component } from "react";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from 'react-icons/io';
import '../index.css'



export const Bottomstuffs = [

    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome size={50}/>,
        cName: 'nav-text',
        actor: 'staff'
    },
    
    {
        title: 'Scan',
        path: '/scanqr',
        icon: <BiIcons.BiScan size={50}/>,
        cName: 'nav-text',
        actor: 'staff'
    },



]


export default Bottomstuffs;