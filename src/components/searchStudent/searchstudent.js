import React, { useState } from "react";
import "./searchstudent.css"

const SearchStudent = ({ data, showItem }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [isShowRes, setIsShowRes] = useState(false);

    const handleFilter = (event) => {
        setIsShowRes(true);
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.studentCode.toLowerCase().includes(searchWord.toLowerCase());
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
        <div className="searchstudent">
            <div className="searchstudentInputs">
                <input
                    type="text"
                    placeholder="Tìm kiếm sinh viên..."
                    value={wordEntered}
                    onChange={handleFilter}
                />
                <div className="searchstudentIcon">
                    {wordEntered.length === 0 ? (
                        <i className="fas fa-search"></i>
                    ) : (
                        <i className="fas fa-times" onClick={clearInput}></i>
                    )}
                </div>
            </div>
            {filteredData.length !== 0 && isShowRes && (
                <div className="datastudentResult">
                    {filteredData.slice(0, 15).map((value, key) => {
                        return (
                            <div className="datastudentItem" onClick={() => {
                                showItem(value);
                                setIsShowRes(false);
                                setWordEntered(value.studentCode)
                            }}
                                target="_blank">
                                <p>{value.studentCode} </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchStudent