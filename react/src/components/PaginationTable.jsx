import { NavLink } from "react-router-dom";

export default function PaginationTable({ meta, onPageClick }) {
    const pageManage = (e, link) => {
        e.preventDefault();
        if (!link.url) return;

        onPageClick(link);
    };

    const disableButton = (e, link, index) => {
        if (!link.url) return;
        //check if im on first page i need to disable previous button
        if (index === 0) {
            if (meta.links[0].url === null) {
                return true;
            }
        }
        //check if im on last page i need to disable next button
        if (index === meta.links.length - 1) {
            if (meta.links[meta.links.length - 1].url === null) {
                return true;
            }
        }
    };

    return (
        <div className="flex items-center shadow-lg mt-4 justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <NavLink
                    onClick={(e) => pageManage(e, meta.links[0])}
                    className={
                        "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" +
                        (meta.links[0].url === null
                            ? " cursor-not-allowed opacity-50"
                            : "")
                    }
                >
                    Previous
                </NavLink>{" "}
                <NavLink
                    onClick={(e) =>
                        pageManage(e, meta.links[meta.links.length - 1])
                    }
                    className={
                        "relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" +
                        (meta.links[meta.links.length - 1].url === null
                            ? " cursor-not-allowed opacity-50"
                            : "")
                    }
                >
                    Next
                </NavLink>
            </div>
            <div className=" hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{meta.from}</span>{" "}
                        to <span className="font-medium">{meta.to}</span> of{" "}
                        <span className="font-medium">{meta.total}</span>{" "}
                        results
                    </p>
                </div>
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm "
                        aria-label="Pagination"
                    >
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        {meta.links.map((link, index) => (
                            <NavLink
                                className={
                                    "relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold hover:bg-gray-50 " +
                                    (index === 0 ? " rounded-l-md" : "") +
                                    (index === meta.links.length - 1
                                        ? " rounded-r-md"
                                        : "") +
                                    (link.active
                                        ? "border-indigo-600 text-indigo-600 bg-indigo-50 focus-visible:outline-indigo-600"
                                        : "border-gray-300 text-gray-500") +
                                    ((index === 0 &&
                                        meta.links[0].url === null &&
                                        true) ||
                                    (index === meta.links.length - 1 &&
                                        meta.links[meta.links.length - 1]
                                            .url === null &&
                                        true)
                                        ? " text-red-300"
                                        : "")
                                }
                                onClick={(e) => pageManage(e, link)}
                                disabled={(e) => disableButton(e, link, index)}
                                key={index}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
