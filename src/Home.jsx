import React from 'react';
import { initializeApp } from "firebase/app";
import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, Typography } from "@mui/material";
import { getDatabase, ref, set, onValue } from "firebase/database";
import generateUniqueId from "generate-unique-id";
import { useEffect, useState } from "react";
import Header from "./Header";

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

export default function Home() {
    const [users, setUser] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const database = getDatabase();

        const userRef = ref(database, 'users/');
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            const userData = [];
            for (let k in data) {
                userData.push({ id: k, ...data[k] });
            }
            setUser(userData);
        });

        const quizRef = ref(database, 'quizz/');
        onValue(quizRef, (snapshot) => {
            const data = snapshot.val();
            const quizData = [];
            for (let k in data) {
                quizData.push({ id: k, ...data[k] });
            }
            setQuizzes(quizData);
        });
    }, []);

    const submitUserHandler = (e) => {
        e.preventDefault();
        const database = getDatabase();
        const user_id = generateUniqueId();

        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            contact: e.target.contact.value,
        };

        set(ref(database, "users/" + user_id), data);

        e.target.reset();
    };

    const submitQuizHandler = (e) => {
        e.preventDefault();
        const database = getDatabase();
        const quiz_id = generateUniqueId();

        const quizData = {
            question: e.target.question.value,

            option_a: e.target.option1.value,
            option_b: e.target.option2.value,
            option_c: e.target.option3.value,
            option_d: e.target.option4.value,

            correctAnswer: e.target.correctAnswer.value,
        };

        set(ref(database, "quizz/" + quiz_id), quizData);
        e.target.reset();
    };

    return (
        <div className="bg-[url('/images/28.png')] bg-cover bg-center min-h-screen "  >
            <Header />

            <div className='absolute inset-0 bg-black opacity-50  -z-10 '>
            </div>
            <div className=''>
                <h1 className="text-center text-4xl sm:text-6xl md:text-8xl lg:text-9xl mt-12 sm:mt-20 md:mt-56 lg:mt-28">
                    Welcome
                </h1>
                <h1 className="text-center text-4xl sm:text-6xl md:text-8xl lg:text-9xl mt-2 sm:mt-4">
                    to
                </h1>
                <h1 className="text-center text-4xl sm:text-6xl md:text-8xl lg:text-9xl mt-2 sm:mt-4">
                    Quizzer
                </h1>
            </div>

        </div>
    );
}

