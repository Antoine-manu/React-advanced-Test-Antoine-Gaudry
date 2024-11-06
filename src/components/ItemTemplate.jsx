import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function ItemTemplate({data, selected, selectedItems}){
    const isSelected = selectedItems.some(item => item.id === data.id)

    const handleSelected = () => {
        selected(data)
    }

    return(
        <div className={"input-list-child  " + (isSelected === true ? "selected" : "")} key={data.type + data.id} onClick={() => handleSelected()}>
            <span>TEMPLATE</span>
            <FontAwesomeIcon icon={"fa-solid " + data.icon}/>
            <span style={{marginLeft: 8}}>{data.label}</span>
        </div>
    )
}