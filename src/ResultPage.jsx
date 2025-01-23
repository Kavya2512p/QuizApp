import React, { useContext } from 'react';
import { Context } from "./Context/Main";
import { useNavigate } from 'react-router-dom';

export default function ResultPage() {
    const { answers, quizzesdb } = useContext(Context); // Access answers and quizzes from Context
    const options = ['a', 'b', 'c', 'd'];
    const navigator = useNavigate();

    // Calculate total marks
    let totalMarks = 0;
    // console.log("Answers: ", answers[0].user_sel);
    // console.log("Quiz Database: ", quizzesdb[0].correctAnswer);

    answers.forEach(answer => {
        const question = quizzesdb[answer.que_index]; 
        // console.log("answer ka ques index", answer.que_index);
        // console.log("question", question);
        if (question) {
            // console.log(`Matching Question Found: ID ${question.id}`);
            // console.log(`User Selected: ${answer.user_sel}, Correct Answer: ${question.correctAnswer}`);
            if (question.correctAnswer === answer.user_sel) {
                totalMarks += 1; 
            }
        } else {
            console.error(`Question with index ${answer.que_index} not found in the quiz database.`);
        }
    });

    console.log(`Total Marks: ${totalMarks} / ${quizzesdb.length}`);


    const back = () => {
        navigator('/');
    }

    return (
        <div className="bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/22.png')" }}>
            <div className="w-full h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold mb-6">Your Quiz Results</h1>
                <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Summary</h2>
                    <p className="mb-4">You answered {answers.length} out of {quizzesdb.length} questions.</p>
                    <p className="mb-4 text-xl font-bold">Total Marks: {totalMarks} / {quizzesdb.length}</p>
                </div>

                <button
                    onClick={back}
                    className="mt-6 bg-orange-800 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-500"
                >
                    Retake Quiz
                </button>
            </div>
        </div>
    );
}
