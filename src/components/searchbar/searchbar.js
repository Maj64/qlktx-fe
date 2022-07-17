import React, { useState } from "react";
import "./searchbar.css";

const SearchBar = ({ data, showItem }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [isShowRes, setIsShowRes] = useState(false);

    const handleFilter = (event) => {
        setIsShowRes(true);
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.roomCode.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setIsShowRes(false);
        setFilteredData([]);
        setWordEntered("");
    };
    return (
        <div className="search">
            <div className="searchInputs">
                <input
                    type="text"
                    placeholder="Tìm kiếm phòng..."
                    value={wordEntered}
                    onChange={handleFilter}
                />
                <div className="searchIcon">
                    {wordEntered.length === 0 ? (
                        <i className="fas fa-search"></i>
                    ) : (
                        <i className="fas fa-times" onClick={clearInput}></i>
                    )}
                </div>
            </div>
            {filteredData.length !== 0 && isShowRes && (
                <div className="dataResult">
                    {filteredData.slice(0, 15).map((value, key) => {
                        return (
                            <div className="dataItem" onClick={() => {
                                showItem(value);
                                setIsShowRes(false);
                                setWordEntered(value.roomCode)
                            }}
                                target="_blank">
                                <p>{value.roomCode} </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchBar