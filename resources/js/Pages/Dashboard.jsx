import { useState, useRef, useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";

import TRTLogo from "../../../public/images/logo.png";
// import { Head } from "@inertiajs/react";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const AvatarMale = () => (
    <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
    >
        <circle cx="40" cy="40" r="40" fill="#5B8FA8" />
        <circle cx="40" cy="30" r="13" fill="#D4A574" />
        <ellipse cx="40" cy="65" rx="22" ry="16" fill="#2C3E50" />
        <rect x="28" y="42" width="24" height="20" rx="4" fill="#34495E" />
        <rect x="30" y="38" width="20" height="8" rx="3" fill="#D4A574" />
    </svg>
);

const AvatarFemale = () => (
    <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
    >
        <circle cx="40" cy="40" r="40" fill="#7B9EA6" />
        <circle cx="40" cy="30" r="13" fill="#D4A574" />
        <ellipse cx="40" cy="65" rx="22" ry="16" fill="#8E5572" />
        <rect x="28" y="42" width="24" height="20" rx="4" fill="#9B6B8A" />
        <rect x="30" y="38" width="20" height="8" rx="3" fill="#D4A574" />
        <path
            d="M27 22 Q40 10 53 22"
            stroke="#4A3728"
            strokeWidth="3"
            fill="none"
        />
    </svg>
);

const ActionDropdown = ({ empId, openId, setOpenId }) => {
    const isOpen = openId === empId;
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpenId(null);
        };
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const menuItems = [
        {
            label: "ข้อมูลส่วนตัว",
            href: route("employee.show", empId),
            icon: (
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
            ),
        },
        {
            label: "เอกสารพนักงาน",
            icon: (
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
            ),
        },
        {
            label: "แก้ไข",
            icon: (
                <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                </svg>
            ),
        },
    ];

    return (
        <div className="relative" ref={ref}>
            <style>{`
                @keyframes dropdownOpen {
                    from { opacity: 0; transform: translateY(-6px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0)   scale(1);    }
                }
            `}</style>

            {/* ปุ่มเพิ่มเติม */}
            <button
                onClick={() => setOpenId(isOpen ? null : empId)}
                className="px-2 md:px-4 py-1 md:py-2  rounded-lg text-sm font-medium text-white flex items-center gap-1.5 transition-all duration-200 hover:opacity-90 active:scale-95 text-nowrap"
                style={{ backgroundColor: "#B3702A" }}
            >
                เพิ่มเติม
                <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="absolute lift-0 mt-1.5 w-44 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50"
                    style={{
                        animation: "dropdownOpen 0.18s ease-out forwards",
                    }}
                >
                    {menuItems.map((item, idx) => (
                        <Link
                            key={idx}
                            href={item.href}
                            onClick={() => setOpenId(null)}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition-colors duration-150"
                            style={{
                                borderBottom:
                                    idx < menuItems.length - 1
                                        ? "1px solid #F3F4F6"
                                        : "none",
                            }}
                        >
                            <span className="text-gray-400">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function Dashboard({ employees }) {
    const { post } = useForm();
    const [searchCode, setSearchCode] = useState("");
    const [searchName, setSearchName] = useState("");
    const [searchNickname, setSearchNickname] = useState("");
    const [filtered, setFiltered] = useState(employees);
    const [currentPage, setCurrentPage] = useState(1);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const perPage = 5;

    const handleSearch = () => {
        const result = employees.filter((e) => {
            const code = (e.employee_code || "").toLowerCase();
            const fNameTh = (e.first_name_th || "").toLowerCase();
            const lNameTh = (e.last_name_th || "").toLowerCase();
            const fNameEn = (e.first_name_en || "").toLowerCase();
            const nName = (e.nickname || "").toLowerCase();

            const matchCode = code.includes(searchCode.toLowerCase());
            const matchName =
                fNameTh.includes(searchName.toLowerCase()) ||
                lNameTh.includes(searchName.toLowerCase()) ||
                fNameEn.includes(searchName.toLowerCase());
            const matchNickname = nName.includes(searchNickname.toLowerCase());

            return matchCode && matchName && matchNickname;
        });

        setFiltered(result);
        setCurrentPage(1);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleClear = () => {
        setSearchCode("");
        setSearchName("");
        setSearchNickname("");
        setFiltered(employees);
        setCurrentPage(1);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        post(route("logout"));
    };

    // ceil method ที่มีเศษจะปัดชึ้นหมด
    const totalPages = Math.ceil(filtered.length / perPage); // หาหน้าทั้งหมดว่ามีกี่หน้า เช่น 14 คน หาร 10 ได้ 1.4 จะปัดเป็นจำนวนเต็ม คือ 2 หน้า
    //ใช้สำหรับ แสดงลำดับพนักงานว่ามีกี่คน โดยจัดให้หน้าหนึ่ง แสดง 10 คนในหน้าจอคอมพิวเตอร์ โดยถ้าอยู่หน้า 3
    // ก็จะใช้คณิต คิด ให้เริ่มต้น 20-29 (ทั้งหมด 10คน)

    //slice จะเอาข้อมูลที่ต้องการเท่านั้น โดยไม่แก้ไขข้อมูลเดิม
    const paginated = filtered.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage,
        //ผมลัพธ์ จะเป็น filtered.slice(20,30) คือเอาตัวมันเอง ไปถึง ก่อนตัวสุดท้าย ได้แก่ 20-29 นั้นเอง
    );

    const getPaginationItems = (current, total) => {
        // ถ้ามีน้อยกว่าหรือเท่ากับ 5 หน้า ให้แสดงครบทุกหน้า
        if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

        // ถ้าอยู่หน้าแรกๆ (เช่น 1, 2, 3) ให้แสดง 4 หน้าแรก แล้วตามด้วย ... และหน้าสุดท้าย
        if (current <= 3) return [1, 2, 3, "...", total];

        // ถ้าอยู่หน้าท้ายๆ ให้แสดงหน้าแรก ตามด้วย ... และ 4 หน้าสุดท้าย
        if (current >= total - 2)
            return [1, "...", total - 2, total - 1, total];

        // ถ้าอยู่ตรงกลาง ให้แสดงหน้าแรก ... หน้าก่อนหน้า, หน้าปัจจุบัน, หน้าถัดไป ... หน้าสุดท้าย
        return [1, "...", current - 1, current, current + 1, "...", total];
    };

    const inputClass =
        "w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200";

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 xl:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <aside
                className={`
                    fixed xl:static inset-y-0 left-0 z-30
                    w-72 flex flex-col flex-shrink-0 bg-white border-r border-gray-200 shadow-sm
                    transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    xl:translate-x-0
                          `}
            >
                {/* Logo area */}
                <div className="flex items-center justify-center py-8 px-6 border-b border-gray-100">
                    <img src={TRTLogo} alt="TRT Logo" className="w-40" />
                </div>

                {/* Nav */}
                <nav className="flex-1 py-4 px-3">
                    <a
                        href="#"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg mb-1 font-medium text-white transition-all duration-200"
                        style={{ backgroundColor: "#B3702A" }}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        หน้าหลัก
                    </a>
                    <a
                        href={route("employee.create")}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg mb-1 font-medium text-gray-600 hover:bg-amber-50 transition-all duration-200"
                        style={{ "--hover-color": "#B3702A" }}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                        สร้างข้อมูล
                    </a>
                </nav>

                {/* User */}
                <div className="border-t border-gray-100 px-4 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                        <AvatarMale />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-800 truncate">
                            Super Admin
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                        title="ออกจากระบบ"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <div className="bg-gray-50 h-16 flex items-center gap-2">
                    {" "}
                    {/* ปุ่ม hamburger — แสดงเฉพาะ < 1280px */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="xl:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="black"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                    <img
                        src={TRTLogo}
                        alt="TRT Logo"
                        className="
        self-center origin-center
        transition-all duration-500 ease-in-out
        
        /* สถานะตอนจอเล็ก (แสดงผลปกติ) */
        w-20 opacity-100 scale-100
        
        /* สถานะตอนจอใหญ่ xl (ค่อยๆ จางและหดหายไป) */
        xl:opacity-0 xl:scale-50 xl:w-0 xl:m-0 xl:pointer-events-none
    "
                    />
                </div>
                <header
                    className="h-16 flex-shrink-0 flex items-center px-4"
                    style={{ backgroundColor: "#75523B" }}
                ></header>

                {/* Content */}
                <main className="flex-1 overflow-auto p-6">
                    {/* Search Card */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-5">
                        <h2 className="text-md xl:text-lg font-bold text-gray-800 mb-4">
                            ค้นหา
                        </h2>
                        <div className="flex gap-3 items-center flex-wrap">
                            <input
                                type="text"
                                placeholder="รหัสพนักงาน"
                                value={searchCode}
                                onChange={(e) => setSearchCode(e.target.value)}
                                className={inputClass}
                                onKeyDown={handleKeyDown}
                                style={{
                                    maxWidth: 200,
                                    "--tw-ring-color": "#B3702A",
                                }}
                            />
                            <input
                                type="text"
                                placeholder="ชื่อ - นามสกุล"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                className={inputClass}
                                onKeyDown={handleKeyDown}
                                style={{
                                    maxWidth: 240,
                                    "--tw-ring-color": "#B3702A",
                                }}
                            />
                            <input
                                type="text"
                                placeholder="ชื่อเล่น"
                                value={searchNickname}
                                onChange={(e) =>
                                    setSearchNickname(e.target.value)
                                }
                                className={inputClass}
                                onKeyDown={handleKeyDown}
                                style={{
                                    maxWidth: 180,
                                    "--tw-ring-color": "#B3702A",
                                }}
                            />
                            <button
                                onClick={handleSearch}
                                className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-300 bg-white transition-all duration-200 hover:bg-gray-50 active:scale-95"
                            >
                                ค้นหา
                            </button>
                            <button
                                onClick={handleClear}
                                className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-300 bg-white transition-all duration-200 hover:bg-gray-50 active:scale-95"
                            >
                                ล้างค่า
                            </button>
                        </div>
                    </div>

                    {/* Table Card */}

                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto w-full">
                            <table className="w-full min-w-[800px]">
                                <thead>
                                    <tr style={{ backgroundColor: "#75523B" }}>
                                        {[
                                            "รูปพนักงาน",
                                            "รหัสพนักงาน",
                                            "ชื่อ – นามสกุล",
                                            "ตำแหน่ง",
                                            "วันเข้าทำงาน",
                                            "เบอร์โทรศัพท์",
                                            "รายละเอียด",
                                        ].map((h) => (
                                            <th
                                                key={h}
                                                className="px-4 py-3.5 text-sm font-semibold text-white text-left whitespace-nowrap"
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {paginated.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="text-center py-16 text-gray-400 text-sm"
                                            >
                                                ไม่พบข้อมูลพนักงาน
                                            </td>
                                        </tr>
                                    ) : (
                                        paginated.map((emp, i) => (
                                            <tr
                                                key={emp.id}
                                                className={`transition-colors duration-150 hover:bg-amber-50 ${i % 2 === 1 ? "bg-gray-50/50" : "bg-white"}`}
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100">
                                                        {emp.prefix === "นาย" ||
                                                        emp.prefix === "Mr." ? (
                                                            <AvatarMale />
                                                        ) : (
                                                            <AvatarFemale />
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm font-medium text-gray-700">
                                                    {emp.employee_code}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-800">
                                                    {emp.first_name_th}{" "}
                                                    {emp.last_name_th}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600">
                                                    {emp.position}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600">
                                                    {emp.hired_date}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-600">
                                                    {emp.phone}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <ActionDropdown
                                                        empId={emp.id}
                                                        openId={openDropdownId}
                                                        setOpenId={
                                                            setOpenDropdownId
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination แบ่งหน้า */}
                        <div className="flex items-center justify-center lg:justify-between px-5 py-3.5 border-t border-gray-100 bg-white z-10">
                            <span className="hidden text-sm text-gray-500 lg:block">
                                Showing{" "}
                                {filtered.length === 0
                                    ? 0
                                    : (currentPage - 1) * perPage + 1}{" "}
                                {/* ตรงนี้เป็นค่าแรกที่ของหน้านั้นๆ */}
                                to{" "}
                                {Math.min(
                                    currentPage * perPage,
                                    filtered.length,
                                )}{" "}
                                of {filtered.length} entries
                            </span>
                            <div className="flex items-center gap-1 w-full justify-center lg:w-auto lg:justify-end">
                                {" "}
                                <button
                                    onClick={() =>
                                        setCurrentPage((p) =>
                                            Math.max(1, p - 1),
                                        )
                                    }
                                    disabled={currentPage === 1}
                                    className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                >
                                    {/* ซ่อนคำว่า Previous ในจอเล็ก และแสดงลูกศร <- แทน */}
                                    <span className="hidden lg:inline">
                                        Previous
                                    </span>
                                    <span className="lg:hidden">&larr;</span>
                                </button>
                                {/* สร้าง Arrayตัวใหม่ขึ้นมา */}
                                {getPaginationItems(
                                    currentPage,
                                    totalPages,
                                ).map((p, index) =>
                                    p === "..." ? (
                                        // เช็คเงื่อนไขถ้าค่าเป็น '...' ให้แสดงเป็นข้อความธรรมดา
                                        <span
                                            key={`dots-${index}`}
                                            className="px-2 text-gray-400"
                                        >
                                            ...
                                        </span>
                                    ) : (
                                        <button
                                            key={p}
                                            onClick={() => setCurrentPage(p)}
                                            className="w-8 h-8 text-sm rounded-lg border transition-all duration-150 font-medium"
                                            style={
                                                //ใช้ tanary oparator เปลี่ยน style ตามเงื่อนไข
                                                currentPage === p
                                                    ? {
                                                          backgroundColor:
                                                              "#B3702A",
                                                          color: "white",
                                                          borderColor:
                                                              "#B3702A",
                                                      }
                                                    : {
                                                          backgroundColor:
                                                              "white",
                                                          color: "#374151",
                                                          borderColor:
                                                              "#E5E7EB",
                                                      }
                                            }
                                        >
                                            {p}
                                        </button>
                                    ),
                                )}
                                <button
                                    onClick={() =>
                                        setCurrentPage((p) =>
                                            Math.min(totalPages, p + 1),
                                        )
                                    }
                                    disabled={
                                        currentPage === totalPages ||
                                        totalPages === 0
                                    }
                                    className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                >
                                    <span className="hidden lg:inline">
                                        Next
                                    </span>
                                    <span className="lg:hidden">&rarr;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
