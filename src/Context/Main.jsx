import React, { useEffect, useReducer, useRef, useState } from 'react'
import { createContext } from 'react'
const Context = createContext();
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { DataConnect } from 'firebase/data-connect';
import { useNavigate } from 'react-router-dom';


const firebaseConfig = {
    apiKey: "AIzaSyCwn9MlWUvfDOsmgO_rMxEJZtFQzuPrISQ",
    authDomain: "wsjp-37-3f535.firebaseapp.com",
    databaseURL: "https://wsjp-37-3f535-default-rtdb.firebaseio.com",
    projectId: "wsjp-37-3f535",
    storageBucket: "wsjp-37-3f535.firebasestorage.app",
    messagingSenderId: "663314950906",
    appId: "1:663314950906:web:ff358cf3846928c3df3743",
    measurementId: "G-RGPYHY1VC9"
};

const firebaseApp = initializeApp(firebaseConfig);


export default function Main(props) {
    const [quizzesdb, setQuizzes] = useState([]);
    const firstRender = useRef(true);
    const [user, setuser] = useState(null);
    const [quizzes, setQuiz] = useState([]);
    const [answers, setAnswer] = useState([]);
    // [ { index:0, user_sel:b}, {index:0, user_sel:c} ]
    const [current, setCurrent] = useState(0);

    useEffect(() => {
            
        const database = getDatabase();
            // Fetch quizzes data
            const quizRef = ref(database, 'quizz/');
            onValue(quizRef, (snapshot) => {
                const data = snapshot.val();
                const quizData = [];
                for (let k in data) {
                    quizData.push({ id: k, ...data[k] });
                }
                setQuizzes(quizData);
                // console.log(quizData);
            });
        }, []);

    const userAnswerHandler = (index, answer) => {
        // console.log(index, answer);
        const currentAnswers = [...answers];
        const found = currentAnswers.find(a => a.que_index == index);
        if (found) {
            if (found.user_sel == answer) {
                const filteredAnswer = currentAnswers.filter(a => a.que_index != index);
                setAnswer(filteredAnswer);
            } else {
                found.user_sel = answer;
                setAnswer(currentAnswers);
            }
        }
        else {
            setAnswer([...answers, { que_index: index, user_sel: answer }]);

        }
    }

    const prev = () => {
        setCurrent(current - 1);
    }
    const next = () => {
        setCurrent(current + 1);
    }

    useEffect(
        () => {

            const db = getDatabase();
            const starCountRef = ref(db, 'quizz/');
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                //converting object of object to array of object
                const dArr = [];
                for (let k in data) {
                    dArr.push({
                        ...data[k], id: k
                    });
                }
                console.log(dArr);
                setQuiz(dArr);
            });

        }, []
    )

    useEffect(
        () => {
            const lsUser = localStorage.getItem("user");
            if (lsUser != undefined) {
                setuser(JSON.parse(lsUser));
            }
        }, []
    )

    const loginUser = (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        setuser(data);
    }

    const logoutUser = () => {
        localStorage.removeItem("user");
        setuser(null);
    }

    useEffect(
        () => {
            if (firstRender.current == true) {
                firstRender.current = false;
                const lscurrent = localStorage.getItem(current);
                if (lscurrent != null || lscurrent != undefined) {
                    setCurrent(Number(lscurrent));
                }
                const lsAnswer = localStorage.getItem(answers);
                if (lsAnswer != null || lsAnswer != undefined) {
                    setCurrent(Number(answers));
                }
                return;
            }
            else {
                localStorage.setItem("current", current);
                if (answers.length != 0) {
                    localStorage.setItem("answer", JSON.stringify(answers));
                }
            }
        }, [current, answers]
    )

    return (
        <Context.Provider value={{quizzesdb, userAnswerHandler, answers, setAnswer, totalQuizz: quizzes.length, user, loginUser, logoutUser, currentData: quizzes[current], current, setCurrent, prev, next }}>
            {props.children}
        </Context.Provider>
    )
}

export { Context };