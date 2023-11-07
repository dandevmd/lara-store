import React from "react";

const DashboardCard = ({ title, children, className = "", styles = {} }) => {
    return (
        <div
            className="bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down"
            style={styles}
        >
            {title && <h3 className="text-2xl font-semibold mb-2">{title}</h3>}
            {children}
        </div>
    );
};

export default DashboardCard;
