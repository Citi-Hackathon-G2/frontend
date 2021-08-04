import React, { Component } from 'react'
import {
    HeartOutlined,
  } from '@ant-design/icons';
//input: liked:boolean
//output: onClick


const Like = (props) => {
    let classes = "Heart";
    if (!props.liked) classes += "Outlined"
    if (props.liked) classes += "Filled"
    return (
        <i onClick={props.onClick} style={{cursor: "pointer"}} className={classes} aria-hidden="true"></i>
    );
}
 
export default Like;