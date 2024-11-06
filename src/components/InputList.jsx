import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, Suspense, lazy } from "react";
import Item from "./Item";

export default function InputList({type, data, visible, selected, multiple, selectedItems, template = null}){
    if(template !== null){
    }
    let Card = lazy(() => import(`${template}`));

    return(
        <div className={"input-list " + (visible === true ? "" : " d-none")}>
            {data !== undefined ?
                data.slice(0, 5).map((d, index) => (
                    template !== null ?
                    <Suspense key={index}>
                        <Card selected={selected} selectedItems={selectedItems} data={d}/>
                    </Suspense>
                    : 
                    <Item key={index} selected={selected} selectedItems={selectedItems} data={d}/>
                ))
            : ''}
        </div>
    )
}