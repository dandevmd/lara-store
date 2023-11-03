import React, { useState } from "react";
import axiosClient from "../request/axiosclient";
import { stateStorage } from "../state/ContextProvider";
import Toast from "./Toast";
const PublicQuestionItem = ({ surveyId, question, index, onSubmit }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const { showToast } = stateStorage();
    const [answer, setAnswer] = useState({
        question_id: question.id,
        answer: "",
    });

    let timer;
    const onChange = (e) => {
        e.preventDefault();
        clearTimeout(timer);

        timer = setTimeout(() => {
            setAnswer({
                question_id: question.id,
                answer: e.target.value,
            });
        }, 300);
    };

    function onSubmit(ev) {
        ev.preventDefault();
        axiosClient
            .post(`/survey/${surveyId}/answer`, { answers: answer })
            .then((response) => {
                response &&
                    response.status === 201 &&
                    setAnswer({
                        question_id: question.id,
                        answer: "",
                    });
                showToast("Answer submitted successfully");
                setShowAnswer(!showAnswer);
            });
    }

    return (
        <>
            <fieldset className="mb-4">
                <div>
                    <legend>
                        {index + 1} {". "} {question.question}
                    </legend>
                    <p className="text-gray-500 text-sm">
                        {question.description}
                    </p>
                </div>
                <button
                    className=" mt-1 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded"
                    onClick={() => setShowAnswer(!showAnswer)}
                    type="button"
                >
                    Answer
                </button>

                {showAnswer && (
                    <>
                        <div className="flex flex-col">
                            <label htmlFor="answer">
                                Put your thoughts below
                            </label>
                            <textarea
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                name="answer"
                                id="answer"
                                onChange={(e) => onChange(e)}
                            >
                                {answer.answer}
                            </textarea>
                        </div>
                        <button
                            className=" mt-1 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
                            onClick={(e) => onSubmit(e)}
                            type="submit"
                        >
                            Submit
                        </button>
                    </>
                )}
            </fieldset>
            <Toast />
        </>
    );
};

export default PublicQuestionItem;
