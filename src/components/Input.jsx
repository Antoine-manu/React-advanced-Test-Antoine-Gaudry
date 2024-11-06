
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputList from "./InputList";
import { useState, useRef, useEffect } from "react";

export default function InputCustom({data, multiple = false, template = null}){
    const [datas, setDatas] = useState(data)
    const [visible, setVisible] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])
    const [selectedOptions, setSelectedOptions] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const listRef = useRef(null);
    
    const selected = (item) => {
        if(multiple === true){
            const isInside = selectedItems.some(itemInside => itemInside.id === item.id);
            if(isInside){
                handleRemoveSelected(item)
            } else {
                setSelectedItems([...selectedItems, item])
            }
            
        } else {
            setSelectedItems([item])
            setVisible(false)
            setInputValue(item.label)
            handleOnChange(item.label)
        }
    }

    const handleClickOutside = (event) => {
        if (listRef.current && !listRef.current.contains(event.target)) {
          setVisible(false)
        }
      };

    const handleOnChange = (value) => {
        setInputValue(value)
        const filteredDatas = data.filter(item => item.label.toLowerCase().includes(value.toLowerCase()))
        setDatas(filteredDatas)
    }

    const handleRemoveSelected = (itemToRemove) => {
        const filteredItems = selectedItems.filter(item => item.id !== itemToRemove.id);
        setSelectedItems(filteredItems); 
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setDatas(data)
    }, [data]);
    
    return(
        <div className="input-container" ref={listRef}>
            <div className="input">
                <input type="text" value={inputValue} onChange={(e) => handleOnChange(e.target.value)} onClick={() => setVisible(true)}/>
                <FontAwesomeIcon icon={faSearch}/>
            </div>
            {multiple === true ? 
                <div className="tag-container">
                    {selectedItems.map((item, index) => (
                        <div className="tag" key={index}>
                            <span>{item.label}</span>
                            <span className="tag-close" onClick={() => handleRemoveSelected(item)}><FontAwesomeIcon icon={faXmark} color="white" size="lg"/></span>
                        </div>
                    ))}
                </div> 
            :''}
            <InputList template={template} data={datas} visible={visible} selected={selected} multiple={multiple} selectedItems={selectedItems}/>
        </div>
    )
}