import { Link, useForm, usePage } from "@inertiajs/react";
import TRTLogo from "../../../../public/images/logo.png";
import { useState } from "react";

const AvatarDefault = () => (
    <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
    >
        <circle cx="40" cy="40" r="40" fill="#D1D5DB" />
        <circle cx="40" cy="30" r="13" fill="#9CA3AF" />
        <ellipse cx="40" cy="65" rx="22" ry="16" fill="#9CA3AF" />
        <rect x="28" y="42" width="24" height="20" rx="4" fill="#9CA3AF" />
        <rect x="30" y="38" width="20" height="8" rx="3" fill="#9CA3AF" />
    </svg>
);

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

const SectionHeader = ({ title }) => (
    <div
        className="px-5 py-3 rounded-t-none sm:rounded-t-xl"
        style={{ backgroundColor: "#75523B" }}
    >
        <h3 className="text-white font-medium text-[16px]">{title}</h3>
    </div>
);

// รายการประเภทเอกสารที่ต้องการให้แสดงผล
const documentFields = [
    { label: "สำเนาบัตรประชาชน", key: "id_card_path" },
    { label: "สำเนาทะเบียนบ้าน", key: "house_reg_path" },
    { label: "สัญญาจ้างงาน", key: "contract_path" },
    { label: "หน้าบัญชี", key: "bank_book_path" },
    { label: "วุฒิการศึกษา", key: "transcript_path" },
    { label: "ชุดสมัคร", key: "application_form_path" },
    { label: "เอกสารอื่นๆ", key: "other_docs_path" },
];

export default function EmployeeDocument({ employee }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { post } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post(route("logout"));
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Overlay สำหรับจอเล็ก */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 xl:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed xl:static inset-y-0 left-0 z-30 w-52 flex flex-col flex-shrink-0 bg-white border-r border-gray-200 shadow-sm transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } xl:translate-x-0`}
            >
                <div className="flex items-center justify-center py-6 px-4 border-b border-gray-100">
                    <img src={TRTLogo} alt="TRT Logo" className="w-32" />
                </div>
                <nav className="flex-1 py-4 px-3">
                    <Link
                        href={route("dashboard")}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg mb-1 font-medium text-gray-600 hover:bg-amber-50 transition-all duration-200"
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
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        หน้าหลัก
                    </Link>
                    <div
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
                        เอกสารพนักงาน
                    </div>
                </nav>
                <div className="border-t border-gray-100 px-4 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                        <AvatarMale />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-800 truncate">
                            {auth?.user?.name || "Super Admin"}
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

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <div
                    className={`static xl:hidden px-5 bg-gray-50 h-20 flex items-center gap-2 transition-transform duration-300 ease-in-out`}
                >
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="text-gray-800 p-2 rounded-lg hover:bg-white transition-colors"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
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
                    <img src={TRTLogo} alt="TRT Logo" className="w-20" />
                </div>

                <header
                    className="hidden xl:flex h-16 flex-shrink-0 items-center px-4"
                    style={{ backgroundColor: "#75523B" }}
                ></header>

                <main className="flex-1 overflow-auto p-0 sm:p-6">
                    <h2 className="text-xl md:text-2xl px-4 pt-4 sm:px-0 sm:pt-0 font-bold text-gray-800 mb-5">
                        คลังเอกสารพนักงาน
                    </h2>

                    {/* แสดงข้อมูลพนักงานเบื้องต้น (ย่อ) เพื่อให้รู้ว่ากำลังดูของใคร */}
                    <div className="bg-white rounded-t-none sm:rounded-t-xl rounded-xl border border-gray-200 shadow-sm p-4 flex items-center gap-4 mb-4 ">
                        <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200">
                            {employee.profile_image ? (
                                <img
                                    src={`/storage/${employee.profile_image}`}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : employee.prefix === "นาย" ? (
                                <AvatarMale />
                            ) : employee.prefix === "นาง" ||
                              employee.prefix === "นางสาว" ? (
                                <AvatarFemale />
                            ) : (
                                <AvatarDefault />
                            )}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800">
                                {employee.prefix}
                                {employee.first_name_th} {employee.last_name_th}
                            </h3>
                            <p className="text-sm text-gray-500">
                                รหัส: {employee.employee_code} | ตำแหน่ง:{" "}
                                {employee.position}
                            </p>
                        </div>
                    </div>

                    {/* ส่วนเอกสารที่เกี่ยวข้อง */}
                    <div className="bg-white rounded-t-none sm:rounded-t-xl rounded-xl border border-gray-200 shadow-sm overflow-hidden ">
                        <SectionHeader title="เอกสารที่เกี่ยวข้อง" />

                        <div className="px-2 py-4 md:px-5 md:py-6 space-y-4 md:p-6 space-y-4">
                            {documentFields.map((field) => {
                                // ตรวจสอบว่ามีข้อมูลเอกสารในฟิลด์นั้นๆ หรือไม่
                                const hasFile =
                                    employee.document &&
                                    employee.document[field.key];

                                return (
                                    <div
                                        key={field.key}
                                        className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 "
                                    >
                                        <span className="min-w-[160px] whitespace-nowrap text-[14px] xl:text-[16px] text-gray-600 text-left sm:text-right ">
                                            {field.label}
                                        </span>

                                        <div className="flex-1 flex items-center justify-between border border-gray-300 rounded-lg shadow-sm px-4 py-2">
                                            <div className="flex items-center gap-3">
                                                <svg
                                                    className={`w-6 h-6 ${hasFile ? "text-blue-500" : "text-gray-300"}`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                    />
                                                </svg>

                                                <span
                                                    className={`text-[14px] md:text-[16px] truncate max-w-[150px] sm:max-w-xs ${hasFile ? "text-gray-800" : "text-gray-400 italic"}`}
                                                >
                                                    {hasFile
                                                        ? employee.document[
                                                              field.key
                                                          ]
                                                              .split("/")
                                                              .pop()
                                                        : "ไม่มีเอกสาร"}
                                                </span>
                                            </div>

                                            {hasFile && (
                                                <a
                                                    href={`/storage/${employee.document[field.key]}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-1.5 text-sm font-medium text-white rounded-md transition-colors shadow-sm hover:opacity-90"
                                                    style={{
                                                        backgroundColor:
                                                            "#B3702A",
                                                    }}
                                                >
                                                    เปิดดู
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ปุ่มย้อนกลับ */}
                    <div className="flex justify-end mt-6 pb-8 px-4 sm:px-0">
                        <button
                            onClick={() => window.history.back()}
                            className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 active:scale-95 transition-all duration-200"
                        >
                            ย้อนกลับ
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
