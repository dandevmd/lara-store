import React, { useEffect } from "react";
import { stateStorage } from "../state/ContextProvider";

const Toast = () => {
    const { toast, setToast } = stateStorage();

    useEffect(() => {
        let timer;
        if (toast.show) {
            timer = setTimeout(() => {
                setToast({ message: "", show: false });
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [toast]);

    return (
        toast.show && (
            <div className="w-[300px] p-2 text-white bg-emerald-500 fixed right-5 bottom-5 z-10 rounded fade-in-down">
                <div className=" flex justify-around">
                    <div class="flex ">
                        <div class="relative">
                            <div
                                class="w-6 h-6 rounded-full absolute
      border-8 border-solid border-gray-200"
                            ></div>

                            <div
                                class="w-6 h-6 rounded-full animate-spin absolute
      border-8 border-solid border-indigo-500 border-t-transparent"
                            ></div>
                        </div>
                    </div>{" "}
                    <div>{toast.message}</div>
                </div>
            </div>
        )
    );
};

export default Toast;
