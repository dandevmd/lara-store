import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import QuestionEditorItem from "./QuestionEditorItem";

const SurveyQuestions = ({ questions, onQuestionsUpdate }) => {
    const [myQuestions, setMyQuestions] = useState([...questions]);

    const addQuestion = (e, index) => {
        e.preventDefault();

        index = index !== undefined ? index : myQuestions.length;
        myQuestions.splice(index, 0, {
            id: uuidv4(),
            type: "text",
            question: "",
            description: "",
            data: {},
        });

        setMyQuestions([...myQuestions]);
        onQuestionsUpdate(myQuestions);
    };

    const questionChange = (question) => {
        if (!question) return;
        const newQuestions = myQuestions.map((q) => {
            if (q.id === question.id) {
                return question;
            }
            return q;
        });

        setMyQuestions(newQuestions);
        onQuestionsUpdate(newQuestions);
    };

    const deleteQuestion = (question) => {
        const newQuestions = myQuestions.filter((q) => q.id !== question.id);
        setMyQuestions(newQuestions);
        onQuestionsUpdate(newQuestions);
    };

    useEffect(() => {
        setMyQuestions(questions);
    }, [questions]);

    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-2xl font-bold">Questions</h3>

                <button
                    className="flex items-center py-1 px-4 text-white rounded-sm bg-gray-600 hover:bg-slate-700"
                    onClick={addQuestion}
                >
                    Add new Question <PlusIcon className="w-4 ml-3 mr-1" />
                </button>
            </div>

            {myQuestions && myQuestions.length ? (
                myQuestions.map((question, idx) => (
                    <QuestionEditorItem
                        key={question.id}
                        index={idx}
                        question={question}
                        questionChange={questionChange}
                        addQuestion={addQuestion}
                        deleteQuestion={deleteQuestion}
                    />
                ))
            ) : (
                <div className="text-gray-400 text-center py-4">
                    {" "}
                    No questions yet
                </div>
            )}
        </>
    );
};

export default SurveyQuestions;
