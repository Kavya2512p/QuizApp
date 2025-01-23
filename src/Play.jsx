import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Context } from "./Context/Main";
import { buttonGroupClasses } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Play = () => {
    const { prev, next, current, totalQuizz, answers } = useContext(Context);
    const [showConf, setshowConf] = useState(false);

    const navigator = useNavigate();

    const savebtn = () => {
        setshowConf(true);
    }
    const save = () => {
        setshowConf(false);
        navigator('/result');

    }
    const cancel = () => {
        setshowConf(false);
    }


    return (
        <div>
            <Header />
            <div className="bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/24.png')" }}>
                <div className="max-w-sm mx-auto flex justify-center flex-col items-center h-screen">
                    <h4 className="my-4 text-right w-full">Total {answers.length} Questions answered out of {totalQuizz}</h4>
                    <QuizCard />

                    <div className=" mx-auto mt-4 max-w-sm  flex justify-between m-2 w-full">
                        <button disabled={current == 0 ? true : false} onClick={prev} className="disabled:bg-gray-200 border p-2 rounded-lg bg-slate-400 text-white">Prev</button>
                        {
                            current == totalQuizz - 1
                                ? <button onClick={savebtn} className="disabled:bg-gray-200 border p-2 rounded-lg bg-purple-800 text-white"> Save</button>
                                : <button disabled={current == totalQuizz - 1 ? true : false} onClick={next} className="disabled:bg-gray-200 border p-2 rounded-lg bg-purple-800 text-white">Next</button>
                        }
                    </div>

                </div>
        
                {showConf && (
                    <div className="w-full h-full justify-center items-center flex fixed top-0 bg-opacity-60 bg-black">
                        <div className="shadow p-6 w-[400px] bg-white rounded-lg">
                            <div className="text-2xl text-center">
                                Do you want to save?
                            </div>
                            <div className="my-3 flex gap-3 justify-center">
                                <button onClick={save} className="bg-green-600 px-4 py-2 text-white rounded">Yes</button>
                                <button onClick={cancel} className="bg-red-500 px-4 py-2 text-white rounded">No</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Play;

const QuizCard = () => {
    const { currentData, current, userAnswerHandler, answers } = useContext(Context);
    // console.log(currentData);
    const [selected, setSelected] = useState(null);
    const options = ['a', 'b', 'c', 'd'];
    useEffect(
        () => {
            const found = answers.find(a => a.que_index == current);
            if (found) {
                // console.log(found.user_sel);
                setSelected(options.indexOf(found.user_sel));
            }
            else {
                setSelected(null);
            }
        }, [current]
    )
    return (
        <>

            <div className="w-full mx-auto  max-w-sm bg-white shadow-md rounded-lg p-6">
                <h2 className="text-lg font-bold text-gray-800 text-center mb-4">
                    {current + 1}) {currentData?.question}
                </h2>

                <div className="space-y-4">
                    {
                        [currentData?.option_a, currentData?.option_b, currentData?.option_c, currentData?.option_d]
                            .map(
                                (opt, index) => {
                                    return (
                                        <button
                                            onClick={
                                                () => {
                                                    if (selected == index) {
                                                        setSelected(null);
                                                    }
                                                    else {
                                                        setSelected(index);
                                                    }
                                                    userAnswerHandler(current, options[index]);
                                                    // userAnswerHandler(2, options[index]);
                                                    // userAnswerHandler(2, options[1]);
                                                    // userAnswerHandler(2, b);
                                                    // options[0]= a
                                                    // options[2]=c
                                                }}
                                            key={index}
                                            className={`${selected == index ? 'bg-orange-400 animate-pulse-once text-white' : ''} 
                                        w-full border border-orange-500  font-bold py-2 px-4 rounded`}>
                                            {opt}
                                        </button>
                                    )
                                }
                            )
                    }

                </div>

            </div>
        </>
    );
};


