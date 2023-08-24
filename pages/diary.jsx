import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaPencil } from "react-icons/fa6"

export default function Diary() {
    const [diaryEntry, setDiaryEntry] = useState("");
    const [diaryList, setDiaryList] = useState([]);
    const [myDiaryEntry, setMyDiaryEntry] = useState("");

    // Fetch the diary data with the useEffect hook, so that the GET request is only made when first loading/rendering the page
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/diary")
            .then((response) => setDiaryList(response.data.diaryEntries))
            .catch((error) => console.log("There was an error:", error));
    })

    // Enter text into the input field and click the button to add a new diary entry.
    const handleChange = (e) => {
        setDiaryEntry(e.target.value);
    }

    const addDiaryEntry = (e) => {
        e.preventDefault();
        const newDiaryEntry = { "diaryText": diaryEntry, "textHidden": false, "inputHidden": true};
        axios.post("http://127.0.0.1:5000/api/diary", newDiaryEntry)
            .then(response => setDiaryList([...diaryList, newDiaryEntry]))
            .catch(error => {
                console.error('There was an error', error)
            })
        setDiaryEntry("");
    }


    // Double click a diary entry to edit it.
    const handleDoubleClick = (e) => {
        const diaryID = e.target.getAttribute("data-diaryentryid");
        const doubleClickedDiaryEntry = `http://127.0.0.1:5000/api/diary/${diaryID}`;
        axios.get(`http://127.0.0.1:5000/api/diary/`)
            .then((response) => {
                let filteredDiaryEntries = response.data.diaryEntries.filter(item => item.inputHidden === false);
                response.data.diaryEntries.map((item) => {
                    if ((diaryID === item._id) && (filteredDiaryEntries.length === 0)) {
                        axios.put(doubleClickedDiaryEntry,
                            {
                                textHidden: true,
                                inputHidden: false
                            }
                        );
                    } else {
                        // Do nothing.
                    }
                });
            })
    }

    const handleEditChange = (e) => {
        setMyDiaryEntry(e.target.value);
    }

    const editDiaryEntry = (e) => {
        const inputId = e.target.getAttribute("data-inputid");
        const editedDiaryEntry = `http://127.0.0.1:5000/api/diary/${inputId}`;
        e.preventDefault();
        setMyDiaryEntry(myDiaryEntry);
        axios.get(`http://127.0.0.1:5000/api/diary/`)
            .then((response) => {
                response.data.diaryEntries.map((item) => {
                    if (e.target.getAttribute("data-inputid") === item._id) {
                        if (myDiaryEntry != "") {
                            axios.put(editedDiaryEntry,
                                {
                                    diaryText: myDiaryEntry,
                                    textHidden: false,
                                    inputHidden: true
                                }
                            );
                            setMyDiaryEntry("");
                        } else if (myDiaryEntry === "") {
                            axios.put(editedDiaryEntry,
                                {
                                    taskText: e.target.value,
                                    textHidden: false,
                                    inputHidden: true
                                }
                            );
                            setMyDiaryEntry("");
                        }
                    } else {
                        // Do nothing
                    }
                });
            })
    }
    
    const deleteDiaryEntry = (diaryEntryId) => {
        axios.delete(`http://127.0.0.1:5000/api/diary/${diaryEntryId}`)
            .then(console.log(`Item ${diaryEntryId} deleted successfully`))
            .catch(error => {
                console.log("An error occured:", error);
            })
    }

    return(
        <>
            <title>Productivity Toolbox - Progress Diary</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-400 to-purple-500">
                <h1 className="text-3xl p-8 font-bold text-white text-center">
                    My Progress Diary
                </h1>
                <form onSubmit={addDiaryEntry} className="container flex mx-auto sd:w-full xl:w-1/2">
                    <input
                        className="mb-10 ml-3 pl-2 h-10 w-full text-black text-2xl"
                        type="text"
                        name="newDiaryEntry"
                        placeholder="Add a new diary entry here."
                        value={diaryEntry}
                        onChange={handleChange}
                    />
                    <button type="submit"
                        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
                        focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-500
                        font-medium rounded-lg text-2xl px-5 py-1 text-center ml-5 mr-2 mb-2 h-10">
                        Submit
                    </button>
                </form>
                <p className={`container mx-auto box-border rounded-xl min-h-14 sd:w-full xl:w-1/2 p-4 px-10 shadow-2xl
                    bg-gray-700 bg-opacity-20 text-left text-2xl text-white mb-8
                    ${(diaryList.length === 0 ? "" : "hidden")}`}>
                    Enter a diary entry and your progress diary will appear here.
                </p>
                {diaryList.map((row, index) => (
                    <div className={`group grid grid-cols-10 gap-y-4 container mx-auto box-border rounded-xl min-h-14 sd:w-full xl:w-1/2 p-4 px-10 shadow-2xl
                        bg-gray-700 bg-opacity-20 text-left text-2xl text-white mb-8`} key={index} data-rowid={index}>
                        
                        <div className="date col-span-9 h-10">Date: {row.createdAt}</div>
                        <button
                            onClick={() => deleteDiaryEntry(row._id)}
                            type="button"
                            className="col-span-1 w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
                            focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-500
                            font-medium rounded-lg text-2xl px-12 py-1 w-24 text-center ml-5 hidden group-hover:block">
                            <FaTrash />
                        </button>
                        <div className="separator col-span-10 border border-t-0 border-gray-700 shadow-lg"></div>
                        <div onDoubleClick={handleDoubleClick}
                            className={`col-span-9 h-10 ${(row.textHidden ? "hidden" : "")}`}
                            data-diaryentryid={row._id}>
                            {row.diaryText}
                        </div>
                        <form
                            data-inputid={row._id}
                            className={`col-span-12 grid grid-cols-10 ${(row.inputHidden ? "hidden" : "")}`}
                            onSubmit={editDiaryEntry}>
                            <input
                                    className="col-span-9 pl-2 h-10 text-black text-2xl"
                                    type="text"
                                    name="newdiaryentry"
                                    placeholder={row.diaryText}
                                    value={myDiaryEntry}
                                    onChange={handleEditChange}
                            />
                            <button
                                type="submit"
                                className="col-span-1 w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl
                                focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-500
                                font-medium rounded-lg text-2xl px-12 py-1 w-24 text-center ml-5">
                                <FaPencil />
                            </button>
                        </form>
                    </div>
                )).reverse()}
            </div>
        </>
    )
}