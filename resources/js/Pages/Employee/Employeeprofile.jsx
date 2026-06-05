import { Link } from "@inertiajs/react";
import TRTLogo from "../../../../public/images/logo.png";
import { useState } from "react";

const AvatarDefault = () => (
    <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
    >
        {/* พื้นหลังวงกลม สีเทา */}
        <circle cx="40" cy="40" r="40" fill="#D1D5DB" />

        {/* หัว โล้น ไม่มีผม */}
        <circle cx="40" cy="30" r="13" fill="#9CA3AF" />

        {/* ลำตัว */}
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
//หัวตารางของแต่ละ ตารางเช่น ข้อมูลทั่วไป
const SectionHeader = ({ title }) => (
    <div
        className="px-5 py-3 rounded-t-none sm:rounded-t-xl"
        style={{ backgroundColor: "#75523B" }}
    >
        <h3 className="text-white font-medium text-[16px]">{title}</h3>
    </div>
);

// Field row: label + input (read-only display)
const Field = ({ label, value }) => (
    <div className="flex items-center gap-2 w-full">
        <span
            className="text-[14px] xl:text-[16px] text-gray-600 whitespace-nowrap text-right"
            style={{ minWidth: "120px" }}
        >
            {label}
        </span>
        <div className="relative flex-1">
            <input
                type="text"
                defaultValue={value}
                readOnly
                className="w-full border border-gray-300 rounded px-2 py-1 text-[14px] xl:text-[16px] text-gray-800 bg-white focus:outline-none"
            />
        </div>
    </div>
);

export default function EmployeeProfile({ employee }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const calculateAge = (birthDate) => {
        if (!birthDate) return "";
        const today = new Date();
        const birth = new Date(birthDate);

        if (birth > today) return "0 ปี 0 เดือน";

        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();

        if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
            years--;
            months += 12;
        }

        // กันค่าติดลบในกรณีคำนวณผิดพลาดทางตรรกะ
        if (years < 0) years = 0;
        if (months < 0) months = 0;

        return `${years} ปี ${months} เดือน`;
    };

    const calculateTenure = (hiredDate) => {
        if (!hiredDate) return "-";

        const start = new Date(hiredDate);
        const now = new Date();

        let years = now.getFullYear() - start.getFullYear();
        let months = now.getMonth() - start.getMonth();
        let days = now.getDate() - start.getDate();

        if (days < 0) {
            months--;
            days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        return `${years} ปี ${months} เดือน`;
    };
    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-20 xl:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            {/* Sidebar */}
            <aside
                className={`
                    fixed xl:static inset-y-0 left-0 z-30
                    w-52 flex flex-col flex-shrink-0 bg-white border-r border-gray-200 shadow-sm
                    transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    xl:translate-x-0
                          `}
            >
                {" "}
                <div className="flex items-center justify-center py-6 px-4 border-b border-gray-100">
                    <img src={TRTLogo} alt="TRT Logo" className="w-32" />
                </div>
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
                        href="#"
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
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                        สร้างข้อมูล
                    </a>
                </nav>
                <div className="border-t border-gray-100 px-4 py-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <AvatarMale />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-gray-800 truncate">
                            Super Admin
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-red-500 transition-colors p-1">
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
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <div
                    className={`static xl:fixed -top-full  
                                px-5 bg-gray-50 h-20 flex items-center gap-2 
                                transition-transform duration-300 ease-in-out
                                
                        `}
                >
                    {" "}
                    {/* ปุ่ม hamburger — แสดงเฉพาะ < 1280px */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="static xl:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
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
                    className="h-10 xl:h-16 flex-shrink-0 flex items-center px-4"
                    style={{ backgroundColor: "#75523B" }}
                ></header>

                <main className="flex-1 overflow-auto p-0 sm:p-6">
                    <h2 className="text-xl md:text-2xl px-4 pt-4 sm:px-0 sm:pt-0 font-bold text-gray-800 mb-5">
                        ข้อมูลส่วนตัว
                    </h2>

                    {/* Avatar */}
                    <div className="flex justify-center mb-6">
                        <div className="w-28 h-28 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
                            {employee.prefix === "นาย" ? (
                                <AvatarMale />
                            ) : (
                                <AvatarFemale />
                            )}
                        </div>
                    </div>

                    <div className="space-y-5">
                        {/* ข้อมูลทั่วไป */}
                        <div className="bg-white rounded-t-none sm:rounded-t-xl rounded-b-xl border border-gray-200 shadow-sm overflow-hidden">
                            <SectionHeader title="ข้อมูลทั่วไป" />
                            <div className="p-2 py-4 md:p-5 md:py-6">
                                {" "}
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4 sm:gap-y-7">
                                    <Field
                                        label="คำนำหน้า"
                                        value={employee.prefix}
                                    />
                                    <Field
                                        label="ชื่อภาษาไทย"
                                        value={employee.first_name_th}
                                    />
                                    <Field
                                        label="นามสกุลภาษาไทย"
                                        value={employee.last_name_th}
                                    />
                                    <Field
                                        label="ชื่อเล่น"
                                        value={employee.nickname}
                                    />
                                    <Field
                                        label="First Name"
                                        value={employee.first_name_en}
                                    />
                                    <Field
                                        label="Last Name"
                                        value={employee.last_name_en}
                                    />
                                    <Field
                                        label="วันเกิด"
                                        value={employee.birth_date}
                                    />
                                    <Field
                                        label="อายุ"
                                        value={calculateAge(
                                            employee.birth_date,
                                        )}
                                    />
                                    <Field
                                        label="กรุ๊ปเลือด"
                                        value={employee.blood_group}
                                    />
                                    <Field
                                        label="เลขบัตรประชาชน"
                                        value={
                                            employee.identity?.id_card_number
                                        }
                                    />
                                    <Field
                                        label="เลข Passport"
                                        value={
                                            employee.identity?.passport_number
                                        }
                                    />
                                    <Field
                                        label="เลขบัตรชมพู"
                                        value={
                                            employee.identity?.pink_card_number
                                        }
                                    />
                                    <Field
                                        label="เลขใบอนุญาติทำงาน"
                                        value={
                                            employee.identity
                                                ?.work_permit_number
                                        }
                                    />
                                    <Field
                                        label="เบอร์โทร"
                                        value={employee.phone}
                                    />
                                    <Field
                                        label="อีเมล"
                                        value={employee.email}
                                    />
                                </div>
                                {/* โรคประจำตัว full width */}
                                <div className="flex items-center gap-2 mt-5 sm:mt-7 w-full">
                                    <span
                                        className="text-[14px] xl:text-[16px] text-gray-600 whitespace-nowrap text-right"
                                        style={{ minWidth: "120px" }}
                                    >
                                        โรคประจำตัว
                                    </span>
                                    <input
                                        type="text"
                                        defaultValue={
                                            employee.medical_condition
                                        }
                                        readOnly
                                        className="w-full border border-gray-300 rounded px-2 py-1 text-[14px] xl:text-[16px] text-gray-800 bg-white focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ข้อมูลพนักงาน */}
                        <div className="bg-white rounded-t-none sm:rounded-t-xl rounded-b-xl border border-gray-200 shadow-sm overflow-hidden">
                            <SectionHeader title="ข้อมูลพนักงาน" />
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 w-full justofy-center gap-y-4 sm:gap-y-7 p-2 py-4 md:p-5 md:py-6 ">
                                <Field
                                    label="รหัสพนักงาน"
                                    value={employee.employee_code}
                                />
                                <Field
                                    label="ตำแหน่ง"
                                    value={employee.position}
                                />
                                <Field
                                    label="วันเข้าทำงาน"
                                    value={employee.hired_date}
                                />
                                <Field
                                    label="อายุงาน"
                                    value={calculateTenure(employee.hired_date)}
                                />
                                <Field
                                    label="เลขประกันสังคม"
                                    value={employee.identity?.ssn}
                                />
                                <Field
                                    label="โรงพยาบาลประกันสังคม"
                                    value={employee.identity?.ssn_hospital}
                                />
                            </div>
                        </div>

                        {/* ที่อยู่อาศัย */}
                        <div className="bg-white rounded-t-none sm:rounded-t-xl rounded-b-xl border border-gray-200 shadow-sm overflow-hidden">
                            <SectionHeader title="ที่อยู่อาศัย" />
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4 sm:gap-y-7 p-2 py-4 md:p-5 md:py-6 ">
                                <Field
                                    label="บ้านเลขที่"
                                    value={employee.addresses?.[0]?.house_no}
                                />
                                <Field
                                    label="หมู่"
                                    value={employee.addresses?.[0]?.moo}
                                />
                                <Field
                                    label="หมู่บ้าน"
                                    value={
                                        employee.addresses?.[0]?.village_name
                                    }
                                />
                                <Field
                                    label="ซอย"
                                    value={employee.addresses?.[0]?.soi}
                                />
                                <Field
                                    label="ถนน"
                                    value={employee.addresses?.[0]?.road}
                                />
                                <Field
                                    label="แขวง/ตำบล"
                                    value={
                                        employee.addresses?.[0]?.sub_district
                                    }
                                />
                                <Field
                                    label="เขต/อำเภอ"
                                    value={employee.addresses?.[0]?.district}
                                />
                                <Field
                                    label="จังหวัด"
                                    value={employee.addresses?.[0]?.province}
                                />
                                <Field
                                    label="รหัสไปรษณีย์"
                                    value={employee.addresses?.[0]?.zipcode}
                                />
                            </div>
                        </div>

                        {/* ข้อมูลติดต่อฉุกเฉิน */}
                        <div className="bg-white rounded-t-none sm:rounded-t-xl rounded-b-xl border border-gray-200 shadow-sm overflow-hidden">
                            <SectionHeader title="ข้อมูลติดต่อฉุกเฉิน" />
                            <div className="p-2 py-4 md:p-5 md:py-6 space-y-4 sm:space-y-7">
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4 sm:gap-y-7">
                                    <Field
                                        label="ชื่อ-นามสกุล"
                                        value={
                                            employee.emergency_contacts?.[0]
                                                ?.name
                                        }
                                    />
                                    <Field
                                        label="ความสัมพันธ์"
                                        value={
                                            employee.emergency_contacts?.[0]
                                                ?.relationship
                                        }
                                    />
                                    <Field
                                        label="เบอร์ติดต่อ"
                                        value={
                                            employee.emergency_contacts?.[0]
                                                ?.phone
                                        }
                                    />
                                </div>

                                {/* ที่อยู่ full width */}
                                <div className="flex items-center gap-2">
                                    <span
                                        className="text-right text-[14px] xl:text-[16px] text-gray-600 whitespace-nowrap"
                                        style={{ minWidth: "120px" }}
                                    >
                                        ที่อยู่
                                    </span>
                                    <input
                                        type="text"
                                        defaultValue={
                                            employee.emergency_contacts?.[0]
                                                ?.full_address
                                        }
                                        readOnly
                                        className="flex-1 border border-gray-300 rounded px-2 py-1 text-[14px] xl:text-[16px] text-gray-800 bg-white focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ปุ่มย้อนกลับ */}
                    <div className="flex justify-end mt-6 pb-10 pr-2 sm:pr-0">
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
