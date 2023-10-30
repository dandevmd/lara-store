import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import QuestionEditorItem from "./QuestionEditorItem";

const SurveyQuestions = ({ survey, onSurveyUpdate }) => {
    const [model, setModel] = useState({ ...survey });

    const addQuestion = () => {
        setModel({
            ...model,
            questions: [
                ...model.questions,
                {
                    id: v4(),
                    type: "text",
                    question: "",
                    description: "",
                    data: {},
                },
            ],
        });
    };

    const questionChange = (question) => {
        if (!question) return;

        setModel({
            ...model,
            questions: model.questions.map((q) => {
                if (q.id === question.id) {
                    return { ...question };
                }
                return q;
            }),
        });
    };

    const deleteQuestion = (question) => {
        setModel({
            ...model,
            questions: model.questions.filter((q) => q.id !== question.id),
        });
    };

    useEffect(() => {
        onSurveyUpdate(model);
    }, [model]);

    return (
        <>
            <div className="flex justify-between">
                <h3 className="text-2xl font-bold">Questions</h3>

                <button
                    className="flex items-center py-1 px-4 text-white rounded-sm bg-gray-600 hover:bg-slate-700"
                    onClick={addQuestion}
                >
                    <PlusIcon className="w-4 mr-2" />
                </button>
            </div>

            {model.questions.length ? (
                model.questions.map((question, idx) => (
                    <QuestionEditorItem
                        index={idx}
                        question={question}
                        key={question.id}
                        questionChange={questionChange}
                        addQuestion={addQuestion}
                        deleteQuestion={(e) => deleteQuestion(e)}
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
