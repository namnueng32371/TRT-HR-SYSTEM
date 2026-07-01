import { Link, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import TRTLogo from "../../../../public/images/logo.png";
import close from "../../../../public/images/icon/close.png";
// import DatePicker, { registerLocale } from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { th } from "date-fns/locale"; // เอาไว้ทำปฏิทินภาษาไทย
// import { format } from "date-fns";

// registerLocale("th", th); // ลงทะเบียนภาษาไทยให้ปฏิทิน

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

//text แสดงเมื่อ
const ErrorText = ({ error }) => {
    if (!error) return null;
    return (
        <p className="text-red-500 text-xs absolute -bottom-4 sm:-bottom-5 right-0 sm:left-0 whitespace-nowrap">
            {error}
        </p>
    );
};

// ✅ 3. input ที่ให้ใส่ข้อมูลพนักงาน โดยปรับมาให้มี drop down และ ระบบ validation สำหรับกัน error
const Field = ({
    label,
    value,
    onChange,
    type = "text",
    options = null,
    error = null,
    isRequired = false,
    dataField,
}) => (
    <div className="flex items-center gap-2 w-full ">
        <span
            className="text-[14px] xl:text-[16px] text-gray-600 whitespace-nowrap text-right"
            style={{ minWidth: "120px" }}
        >
            {label}
            {isRequired && <span className="text-red-500">*</span>}
        </span>

        <div className="relative flex-1">
            {/* แก้ไข: ลบเงื่อนไข wide และ style ที่เป็น inline ทิ้ง */}
            {options ? (
                <select
                    data-field={dataField}
                    value={value}
                    onChange={onChange}
                    className={`w-full text-[14px] xl:text-[16px] border rounded px-2 py-1 text-gray-800 bg-white focus:outline-none focus:ring-1 transition-all ${
                        error
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-[#B3702A]"
                    }`}
                >
                    <option
                        data-field={dataField}
                        value=""
                        className={` w-full text-[14px] xl:text-[16px] border rounded px-2 py-1 text-gray-800 bg-white focus:outline-none focus:ring-1 transition-all ${
                            error
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-[#B3702A]"
                        }`}
                    >
                        - เลือก -
                    </option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    data-field={dataField}
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={`w-full border border-gray-300 rounded px-2 py-1 text-[14px] xl:text-[16px] text-gray-800 bg-white transition-all ${
                        error
                            ? "border-red-500 focus:ring-[#707070]"
                            : "focus:ring-[#707070]"
                    }`}
                />
            )}
            <ErrorText error={error} className={`text-red-500`} />
        </div>
    </div>
);

export default function Edit({ employee }) {
    const { auth } = usePage().props;
    const [localErrors, setLocalErrors] = useState({});
    const [showConfirm, setShowConfirm] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showBackConfirm, setShowBackConfirm] = useState(false);

    const { data, setData, post, processing, errors, isDirty } = useForm({
        employee: {
            employee_code: employee.employee_code || "",
            prefix: employee.prefix || "",
            first_name_th: employee.first_name_th || "",
            last_name_th: employee.last_name_th || "",
            first_name_en: employee.first_name_en || "",
            last_name_en: employee.last_name_en || "",
            nickname: employee.nickname || "",
            position: employee.position || "",
            phone: employee.phone || "",
            email: employee.email || "",
            birth_date: employee.birth_date || "",
            blood_group: employee.blood_group || "",
            medical_condition: employee.medical_condition || "",
            hired_date: employee.hired_date || "",
            profile_image: null, // ปล่อย null ไว้เพื่อรอรับไฟล์ใหม่เท่านั้น
        },
        identity: {
            id_card_number: employee.identity?.id_card_number || "",
            passport_number: employee.identity?.passport_number || "",
            pink_card_number: employee.identity?.pink_card_number || "",
            work_permit_number: employee.identity?.work_permit_number || "",
            ssn: employee.identity?.ssn || "",
            ssn_hospital: employee.identity?.ssn_hospital || "",
        },
        address: {
            house_no: employee.address?.house_no || "",
            moo: employee.address?.moo || "",
            village_name: employee.address?.village_name || "",
            soi: employee.address?.soi || "",
            road: employee.address?.road || "",
            sub_district: employee.address?.sub_district || "",
            district: employee.address?.district || "",
            province: employee.address?.province || "",
            zipcode: employee.address?.zipcode || "",
        },
        emergency: {
            name: employee.emergency?.name || "",
            relationship: employee.emergency?.relationship || "",
            phone: employee.emergency?.phone || "",
            full_address: employee.emergency?.full_address || "",
        },
        documents: {
            id_card_path: null,
            house_reg_path: null,
            contract_path: null,
            bank_book_path: null,
            transcript_path: null,
            application_form_path: null,
            other_docs_path: null,
        },
        deleted_documents: [],
    });

    const handleLogout = (e) => {
        e.preventDefault();
        post(route("logout"));
    };

    const [prefix, setPrefix] = useState(employee.prefix || "");
    const [docErrors, setDocErrors] = useState({});
    // const existingDocs = employee.document || {}; // [เพิ่ม] เก็บเอกสารเก่าไว้เช็ค

    const documentFields = [
        { label: "สำเนาบัตรประชาชน", key: "id_card_path" },
        { label: "สำเนาทะเบียนบ้าน", key: "house_reg_path" },
        { label: "สัญญาจ้างงาน", key: "contract_path" },
        { label: "หน้าบัญชี", key: "bank_book_path" },
        { label: "วุฒิการศึกษา", key: "transcript_path" },
        { label: "ชุดสมัคร", key: "application_form_path" },
        { label: "เอกสารอื่นๆ", key: "other_docs_path" },
    ];

    const requiredFields = [
        { category: "employee", field: "prefix", name: "คำนำหน้า" },
        { category: "employee", field: "first_name_th", name: "ชื่อภาษาไทย" },
        { category: "employee", field: "last_name_th", name: "นามสกุลภาษาไทย" },
        { category: "employee", field: "first_name_en", name: "First Name" },
        { category: "employee", field: "last_name_en", name: "Last Name" },
        { category: "employee", field: "birth_date", name: "วันเกิด" },
        { category: "employee", field: "employee_code", name: "รหัสพนักงาน" },
        { category: "employee", field: "position", name: "ตำแหน่ง" },
        { category: "employee", field: "hired_date", name: "วันเข้าทำงาน" },
        // { category: "employee", field: "phone", name: "เบอร์โทร" },
    ];

    const thaiRegex = /^[ก-๙\s]*$/; // ยอมรับเฉพาะ ก-ฮ และช่องว่าง
    const engRegex = /^[A-Za-z\s]*$/; // ยอมรับเฉพาะ A-Z, a-z และช่องว่าง
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // สูตรตรวจจับอีเมลที่มี @ และ .
    const numberRegex = /^[0-9]*$/; // ยอมรับเฉพาะตัวเลข 0-9

    const updateData = (category, field, value) => {
        let errorMsg = null;

        // ตรวจสอบเงื่อนไขตามช่องที่กำลังพิมพ์
        if (
            ["first_name_th", "last_name_th", "nickname"].includes(field) &&
            value !== "" // เช็คว่าค่าในช่อง field โดยใช้ method includes เช็คว่าเป็น T or F
        ) {
            if (!thaiRegex.test(value)) errorMsg = "กรุณากรอกภาษาไทยเท่านั้น";
        } else if (
            ["first_name_en", "last_name_en"].includes(field) &&
            value !== ""
        ) {
            if (!engRegex.test(value)) errorMsg = "กรุณากรอกภาษาอังกฤษเท่านั้น";
        } else if (field === "email" && value !== "") {
            if (!emailRegex.test(value)) errorMsg = "รูปแบบอีเมลไม่ถูกต้อง";
        } else if (field === "id_card_number" && value !== "") {
            if (!numberRegex.test(value)) errorMsg = "กรุณากรอกตัวเลขเท่านั้น";
            else if (value.length !== 13)
                errorMsg = "เลขบัตรประชาชนต้องมี 13 หลัก";
        }

        // Fuctional Update state เปลี่ยนค่าได้แบบทันที
        setLocalErrors((prev) => ({
            ...prev,
            [`${category}.${field}`]: errorMsg,
        }));

        // อัปเดตข้อมูลลง State (ถ้าช่องนั้นมี Error เราจะไม่ยอมให้พิมพ์ลงไป หรือจะยอมให้พิมพ์แต่ขึ้นแดงเตือนก็ได้ ในที่นี้ผมให้พิมพ์ได้แต่ขึ้นเตือนครับ)
        setData(category, { ...data[category], [field]: value });
    };

    // ✅ 3. ฟังก์ชันตรวจสอบว่ากรอกรึยัง ถ้าไม่ครบจะเด้งขึ้นให้ไปกรอก
    // ถ้ากรอกครบจะมี popup ให้กดยืนยัน
    const handleInitialSubmit = (e) => {
        e.preventDefault();

        const newErrors = { ...localErrors };

        requiredFields.forEach(({ category, field, name }) => {
            const value = data[category][field];
            if (!value || value.toString().trim() === "") {
                newErrors[`${category}.${field}`] = `กรุณากรอก${name}`;
            }
        });

        setLocalErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(Boolean);

        if (hasErrors) {
            setTimeout(() => {
                // หา element จริงๆ ทุกตัวที่มี error แล้วเรียงตาม position บนหน้า
                const errorElements = Object.keys(newErrors)
                    .filter((key) => newErrors[key])
                    .map((key) => {
                        const [category, field] = key.split(".");
                        // หา input/select ที่ตรงกับ field นั้นจริงๆ
                        return document.querySelector(
                            `[data-field="${category}.${field}"]`,
                        );
                    })
                    .filter(Boolean); // กัน null

                if (errorElements.length === 0) return;

                // เรียงตาม top position แล้วเอาอันบนสุด
                const topmost = errorElements.reduce((prev, curr) =>
                    prev.getBoundingClientRect().top <
                    curr.getBoundingClientRect().top
                        ? prev
                        : curr,
                );

                topmost.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 100);

            return;
        }
        setShowConfirm(true);
    };

    // ✅ 8. ส่งข้อมูลจริง (หลังจากกดยืนยันใน Popup)
    const confirmAndSubmit = () => {
        setShowConfirm(false);

        // [แก้ไข] ชี้ route ไปที่ update พร้อมแนบ ID พนักงาน
        post(route("employee.update", employee.id), {
            forceFormData: true,
            onError: (err) => {
                console.log("❌ ข้อผิดพลาดจาก Laravel:", err);
                alert("บันทึกไม่สำเร็จ!");
            },
            onSuccess: () => {
                window.location.href = route("dashboard");
            },
        });
    };

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

        if (start > now) return "0 ปี 0 เดือน";

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

        if (years < 0) years = 0;
        if (months < 0) months = 0;

        return `${years} ปี ${months} เดือน`;
    };

    // ฟังก์ชันป้องกันการกดย้อนกลับ
    const handleBackClick = () => {
        // ถ้าฟอร์มถูกพิมพ์แก้ไขไปแล้ว (isDirty เป็น true) ให้เปิด Popup เตือน
        if (isDirty) {
            setShowBackConfirm(true);
        } else {
            // ถ้ายังไม่ได้แตะอะไรเลย ให้ย้อนกลับได้ทันทีแบบไม่ต้องกวนใจ
            window.history.back();
        }
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
            <aside
                className={`
                    fixed xl:static inset-y-0 left-0 z-30
                    w-72 flex flex-col flex-shrink-0 bg-white border-r border-gray-200 shadow-sm
                    transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    xl:translate-x-0
                          `}
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
                        แก้ไขข้อมูล
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
                        แก้ไขข้อมูล
                    </h2>

                    {/* Avatar + ปุ่มอัปโหลด */}
                    <div className="flex justify-center mb-6">
                        <div className="relative w-28 h-28">
                            {/* รูป Avatar */}
                            <div className="w-28 h-28 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
                                {data.employee.profile_image ? (
                                    // มีการอัปโหลดไฟล์รูปใหม่
                                    <img
                                        src={URL.createObjectURL(
                                            data.employee.profile_image,
                                        )}
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : employee.profile_image ? (
                                    // [เพิ่ม] ไม่มีไฟล์ใหม่ แต่มีไฟล์เดิมใน Database
                                    <img
                                        src={`/storage/${employee.profile_image}`}
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : prefix === "นาย" ? (
                                    <AvatarMale />
                                ) : prefix === "นาง" || prefix === "นางสาว" ? (
                                    <AvatarFemale />
                                ) : (
                                    <AvatarDefault />
                                )}
                            </div>

                            {/* ปุ่มกล้อง — วางมุมขวาล่าง */}
                            <label className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-white border border-gray-300 shadow flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                                <svg
                                    className="w-4 h-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>

                                {/* input ซ่อนไว้ */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;

                                        // จำกัดขนาด 2MB
                                        const maxSize = 2 * 1024 * 1024; // 2MB เป็น bytes
                                        if (file.size > maxSize) {
                                            alert(
                                                "รูปภาพต้องมีขนาดไม่เกิน 2MB",
                                            );
                                            e.target.value = ""; // reset input
                                            return;
                                        }

                                        // ✅ ตรวจสอบประเภทไฟล์
                                        const allowedTypes = [
                                            "image/jpeg",
                                            "image/png",
                                            "image/webp",
                                        ];
                                        if (!allowedTypes.includes(file.type)) {
                                            alert(
                                                "รองรับเฉพาะไฟล์ .jpg .png .webp เท่านั้น",
                                            );
                                            e.target.value = "";
                                            return;
                                        }

                                        // ...data.employee กล่องเก็บข้อมูลพนังงาน
                                        // และ , บอกว่าเราจะเก็บไฟล์ file ไปใน profile_image นะ
                                        setData("employee", {
                                            ...data.employee,
                                            profile_image: file,
                                        });
                                    }}
                                />
                            </label>

                            {/* ปุ่มลบรูป — แสดงเมื่อมีรูป */}
                            {data.employee.profile_image && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setData("employee", {
                                            ...data.employee,
                                            profile_image: null,
                                        })
                                    }
                                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
                                >
                                    <svg
                                        className="w-3 h-3 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* ✅ คลุมข้อมูลทั้งหมดด้วย <form> */}
                    <form onSubmit={handleInitialSubmit} className="space-y-5">
                        {/* ข้อมูลทั่วไป */}
                        <div
                            id="section-general"
                            className="bg-white rounded-t-none sm:rounded-t-xl rounded-b-xl border border-gray-200 shadow-sm overflow-hidden"
                        >
                            <SectionHeader title="ข้อมูลทั่วไป" />
                            <div className="p-2 py-4 md:p-5 md:py-6">
                                {/* Grid 3 คอลัมน์ */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4 sm:gap-y-7">
                                    {/* แถว 1 */}
                                    <Field
                                        label="คำนำหน้า"
                                        dataField="employee.prefix"
                                        value={data.employee.prefix}
                                        options={["นาย", "นาง", "นางสาว"]}
                                        isRequired
                                        error={
                                            localErrors["employee.prefix"] ||
                                            errors["employee.prefix"]
                                        }
                                        onChange={(e) => {
                                            updateData(
                                                "employee",
                                                "prefix",
                                                e.target.value,
                                            );
                                            setPrefix(e.target.value);
                                        }}
                                    />
                                    <Field
                                        label="ชื่อภาษาไทย"
                                        dataField="employee.first_name_th"
                                        value={data.employee.first_name_th}
                                        isRequired
                                        error={
                                            localErrors[
                                                "employee.first_name_th"
                                            ] ||
                                            errors["employee.first_name_th"]
                                        }
                                        onChange={(e) =>
                                            updateData(
                                                "employee",
                                                "first_name_th",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <Field
                                        label="นามสกุลภาษาไทย"
                                        value={data.employee.last_name_th}
                                        dataField="employee.last_name_th"
                                        isRequired
                                        error={
                                            localErrors[
                                                "employee.last_name_th"
                                            ] || errors["employee.last_name_th"]
                                        }
                                        onChange={(e) =>
                                            updateData(
                                                "employee",
                                                "last_name_th",
                                                e.target.value,
                                            )
                                        }
                                    />

                                    {/* แถว 2 */}
                                    <Field
                                        label="ชื่อเล่น"
                                        value={data.employee.nickname}
                                        error={
                                            localErrors["employee.nickname"] ||
                                            errors["employee.nickname"]
                                        }
                                        onChange={(e) =>
                                            updateData(
                                                "employee",
                                                "nickname",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <Field
                                        label="First Name"
                                        value={data.employee.first_name_en}
                                        dataField="employee.first_name_en"
                                        isRequired
                                        error={
                                            localErrors[
                                                "employee.first_name_en"
                                            ] ||
                                            errors["employee.first_name_en"]
                                        }
                                        onChange={(e) =>
                                            updateData(
                                                "employee",
                                                "first_name_en",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <Field
                                        label="Last Name"
                                        isRequired
                                        value={data.employee.last_name_en}
                                        dataField="employee.last_name_en"
                                        error={
                                            localErrors[
                                                "employee.last_name_en"
                                            ] || errors["employee.last_name_en"]
                                        }
                                        onChange={(e) =>
                                            updateData(
                                                "employee",
                                                "last_name_en",
                                                e.target.value,
                                            )
                                        }
                                    />

                                    {/* แถว 3 */}
                                    <Field
                                        label="วันเกิด"
                                        type="date"
                                        isRequired
                                        value={data.employee.birth_date}
                                        dataField="employee.birth_date"
                                        error={
                                            localErrors[
                                                "employee.birth_date"
                                            ] || errors["employee.birth_date"]
                                        }
                                        onChange={(e) =>
                                            updateData(
                                                "employee",
                                                "birth_date",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {/* อายุ — read only */}
                                    <div className="flex items-center gap-2 w-full gap-2">
                                        <span
                                            className=" text-[14px] xl:text-[16px] text-gray-600 whitespace-nowrap text-right"
                                            style={{ minWidth: "120px" }}
                                        >
                                            อายุ
                                        </span>
                                        <input
                                            type="text"
                                            value={calculateAge(
                                                data.employee.birth_date,
                                            )}
                                            readOnly
                                            placeholder="-"
                                            className="w-full bg-white  border border-gray-300 rounded px-2 py-1 text-[16px] text-gray-800 bg-gray-50 focus:outline-none cursor-default"
                                        />
                                    </div>
                                    <Field
                                        label="กรุ๊ปเลือด"
                                        value={data.employee.blood_group}
                                        options={["A", "B", "AB", "O"]}
                                        onChange={(e) =>
                                            updateData(
                                                "employee",
                                                "blood_group",
                                                e.target.value,
                                            )
                                        }
                                    />

                                    {/* แถว 4 */}
                                    <Field
                                        label="เลขบัตรประชาชน"
                                        value={data.identity.id_card_number}
                                        error={
                                            localErrors[
                                                "identity.id_card_number"
                                            ] ||
                                            errors["identity.id_card_number"]
                                        }
                                        onChange={(e) =>
                                            updateData(
                                                "identity",
                                                "id_card_number",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <Field
                                        label="เลข Passport"
                                        value={data.identity.passport_number}
                                        onChange={(e) =>
                                            updateData(
                                                "identity",
                                                "passport_number",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <Field
                                        label="เลขบัตรชมพู"
                                        value={data.identity.pink_card_number}
                                        onChange={(e) =>
                                            updateData(
                                                "identity",
                                                "pink_card_number",
                                                e.target.value,
                                            )
                                        }
                                    />

                                    {/* แถว 5 */}
                                    <Field
                                        label="เลขใบอนุญาติทำงาน"
                                        value={data.identity.work_permit_number}
                                        onChange={(e) =>
                                            updateData(
                                                "identity",
                                                "work_permit_number",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <Field
                                        label="เบอร์โทร"
                                        dataField="employee.phone"
                                        value={data.employee.phone}
                                        onChange={(e) =>
                                            updateData(
                                                "employee",
                                                "phone",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <Field
                                        label="อีเมล"
                                        type="email"
                                        value={data.employee.email}
                                        error={
                                            localErrors["employee.email"] ||
                                            errors["employee.email"]
                                        }
                                        onChange={(e) =>
                                            updateData(
                                                "employee",
                                                "email",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                                {/* โรคประจำตัว — full width */}
                                <div className="flex items-center gap-2 mt-5 sm:mt-7 w-full">
                                    <span
                                        className="text-[14px] xl:text-[16px] text-gray-600 whitespace-nowrap text-right"
                                        style={{ minWidth: "120px" }}
                                    >
                                        โรคประจำตัว
                                    </span>
                                    <input
                                        type="text"
                                        value={data.employee.medical_condition}
                                        onChange={(e) =>
                                            updateData(
                                                "employee",
                                                "medical_condition",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full border border-gray-300 rounded px-2 py-1 text-[16px] text-gray-800 bg-white focus:outline-none focus:ring-1"
                                        style={{ "--tw-ring-color": "#B3702A" }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ข้อมูลพนักงาน */}
                        <div
                            id="section-employee"
                            className="bg-white rounded-t-none sm:rounded-t-xl rounded-xl border border-gray-200 shadow-sm overflow-hidden "
                        >
                            <SectionHeader title="ข้อมูลพนักงาน" />
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 w-full justofy-center gap-y-4 sm:gap-y-7 p-2 py-4 md:p-5 md:py-6">
                                <Field
                                    label="รหัสพนักงาน"
                                    value={data.employee.employee_code}
                                    dataField="employee.employee_code"
                                    isRequired
                                    error={
                                        localErrors["employee.employee_code"] ||
                                        errors["employee.employee_code"]
                                    }
                                    onChange={(e) =>
                                        updateData(
                                            "employee",
                                            "employee_code",
                                            e.target.value,
                                        )
                                    }
                                />
                                <Field
                                    label="ตำแหน่ง"
                                    value={data.employee.position}
                                    dataField="employee.position"
                                    isRequired
                                    error={
                                        localErrors["employee.position"] ||
                                        errors["employee.position"]
                                    }
                                    onChange={(e) =>
                                        updateData(
                                            "employee",
                                            "position",
                                            e.target.value,
                                        )
                                    }
                                />
                                <Field
                                    label="วันเข้าทำงาน"
                                    type="date"
                                    value={data.employee.hired_date}
                                    dataField="employee.hired_date"
                                    isRequired
                                    error={
                                        localErrors["employee.hired_date"] ||
                                        errors["employee.hired_date"]
                                    }
                                    onChange={(e) =>
                                        updateData(
                                            "employee",
                                            "hired_date",
                                            e.target.value,
                                        )
                                    }
                                />

                                <div className="flex items-center gap-2 w-full">
                                    <label
                                        className="text-right text-[14px] xl:text-[16px] text-gray-600 whitespace-nowrap"
                                        style={{ minWidth: "120px" }}
                                    >
                                        อายุการทำงาน
                                    </label>
                                    <input
                                        type="text"
                                        disabled
                                        value={calculateTenure(
                                            data.employee.hired_date,
                                        )}
                                        className="w-60 sm:w-full block w-full border border-gray-300 rounded-lg p-2 bg-white text-gray-600 h-[34px]"
                                    />
                                </div>
                                <Field
                                    label="เลขประกันสังคม"
                                    value={data.identity.ssn}
                                    onChange={(e) =>
                                        updateData(
                                            "identity",
                                            "ssn",
                                            e.target.value,
                                        )
                                    }
                                />
                                <Field
                                    label="โรงพยาบาลประกันสังคม"
                                    value={data.identity.ssn_hospital}
                                    onChange={(e) =>
                                        updateData(
                                            "identity",
                                            "ssn_hospital",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        </div>

                        {/* ที่อยู่อาศัย */}
                        <div
                            id="section-address"
                            className="bg-white rounded-t-none sm:rounded-t-xl rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                        >
                            <SectionHeader title="ที่อยู่อาศัย" />
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 w-full justofy-center gap-y-4 sm:gap-y-7 p-2 py-4 md:p-5 md:py-6">
                                {" "}
                                <Field
                                    label="บ้านเลขที่"
                                    value={data.address.house_no}
                                    onChange={(e) =>
                                        updateData(
                                            "address",
                                            "house_no",
                                            e.target.value,
                                        )
                                    }
                                />
                                <Field
                                    label="หมู่"
                                    value={data.address.moo}
                                    onChange={(e) =>
                                        updateData(
                                            "address",
                                            "moo",
                                            e.target.value,
                                        )
                                    }
                                />
                                <Field
                                    label="หมู่บ้าน"
                                    value={data.address.village_name}
                                    onChange={(e) =>
                                        updateData(
                                            "address",
                                            "village_name",
                                            e.target.value,
                                        )
                                    }
                                />
                                <Field
                                    label="ซอย"
                                    value={data.address.soi}
                                    onChange={(e) =>
                                        updateData(
                                            "address",
                                            "soi",
                                            e.target.value,
                                        )
                                    }
                                />
                                <Field
                                    label="ถนน"
                                    value={data.address.road}
                                    onChange={(e) =>
                                        updateData(
                                            "address",
                                            "road",
                                            e.target.value,
                                        )
                                    }
                                />
                                <Field
                                    label="แขวง/ตำบล"
                                    value={data.address.sub_district}
                                    onChange={(e) =>
                                        updateData(
                                            "address",
                                            "sub_district",
                                            e.target.value,
                                        )
                                    }
                                />
                                <Field
                                    label="เขต/อำเภอ"
                                    value={data.address.district}
                                    onChange={(e) =>
                                        updateData(
                                            "address",
                                            "district",
                                            e.target.value,
                                        )
                                    }
                                />
                                <Field
                                    label="จังหวัด"
                                    value={data.address.province}
                                    onChange={(e) =>
                                        updateData(
                                            "address",
                                            "province",
                                            e.target.value,
                                        )
                                    }
                                />
                                <Field
                                    label="รหัสไปรษณีย์"
                                    value={data.address.zipcode}
                                    onChange={(e) =>
                                        updateData(
                                            "address",
                                            "zipcode",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        </div>

                        {/* ข้อมูลติดต่อฉุกเฉิน */}
                        <div
                            id="section-emergency"
                            className="bg-white rounded-t-none sm:rounded-t-xl rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                        >
                            <SectionHeader title="ข้อมูลติดต่อฉุกเฉิน" />
                            <div className="p-2 py-4 md:p-5 md:py-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-4 sm:gap-y-7 gap-y-4 sm:gap-y-7">
                                    <Field
                                        label="ชื่อ-นามสกุล"
                                        value={data.emergency.name}
                                        onChange={(e) =>
                                            updateData(
                                                "emergency",
                                                "name",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <Field
                                        label="ความสัมพันธ์"
                                        value={data.emergency.relationship}
                                        onChange={(e) =>
                                            updateData(
                                                "emergency",
                                                "relationship",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <Field
                                        label="เบอร์ติดต่อ"
                                        value={data.emergency.phone}
                                        onChange={(e) =>
                                            updateData(
                                                "emergency",
                                                "phone",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex gap-2 items-center mt-4 sm:mt-7 w-full">
                                    <span
                                        className="text-right text-[14px] xl:text-[16px] text-gray-600 whitespace-nowrap"
                                        style={{ minWidth: "120px" }}
                                    >
                                        ที่อยู่
                                    </span>
                                    <input
                                        type="text"
                                        value={data.emergency.full_address}
                                        onChange={(e) =>
                                            updateData(
                                                "emergency",
                                                "full_address",
                                                e.target.value,
                                            )
                                        }
                                        className="w-full border border-gray-300 rounded px-2 py-1 text-[14px] xl:text-[16px] text-gray-800 bg-white focus:outline-none focus:ring-1"
                                        style={{ "--tw-ring-color": "#B3702A" }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* เอกสารที่เกี่ยวข้อง */}
                        <div className="bg-white rounded-t-none sm:rounded-t-xl rounded-xl border border-gray-200 shadow-sm overflow-hidden ">
                            <SectionHeader title="เอกสารที่เกี่ยวข้อง" />

                            {/* ฟอร์มให้แนบ pdf */}
                            <div className="px-2 py-4 md:px-5 md:py-6 space-y-4">
                                {documentFields.map((field) => {
                                    // ➕ เพิ่ม: ตรรกะเช็คสถานะไฟล์สำหรับหน้า Edit (รองรับทั้งก้อนไฟล์ใหม่ และพาธไฟล์เดิมจาก DB)
                                    const hasNewFile =
                                        data.documents[field.key] instanceof
                                        File;
                                    const hasExistingFile =
                                        !!employee.document?.[field.key];
                                    const hasFile =
                                        hasNewFile || hasExistingFile;

                                    return (
                                        <div
                                            key={field.key}
                                            className="flex flex-col items-left sm:items-center sm:flex-row gap-1 sm:gap-4 "
                                        >
                                            <span className="min-w-[160px] whitespace-nowrap text-[14px] md:text-[16px] text-gray-600 w-32 text-left sm:text-right ">
                                                {field.label}
                                            </span>

                                            {/* ตัวครอบช่อง Input และปุ่ม */}
                                            <div className="flex w-full border border-gray-300 rounded-lg shadow-sm bg-white overflow-hidden">
                                                {/* ฝั่งซ้าย: แสดงชื่อไฟล์ */}
                                                <div className="w-full flex items-center px-4 py-2 gap-3 h-[42px]">
                                                    {/* 🛠️ แก้ไข: ปรับเงื่อนไขสีไอคอน SVG เช็คจากตัวแปร hasFile (ฟ้าเมื่อมีไฟล์เก่าหรือใหม่, เทาเมื่อว่างเปล่า) */}
                                                    <svg
                                                        className={`flex-shrink-0 w-5 h-5 ${hasFile ? "text-blue-500" : "text-gray-300"}`}
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

                                                    {/* ชื่อไฟล์ หรือ คำว่า "ไม่มีเอกสาร" */}
                                                    {/* 🛠️ แก้ไข: ปรับสีข้อความตามสถานะตัวแปร hasFile */}
                                                    <span
                                                        className={`text-[14px] md:text-[16px] truncate max-w-[160px] sm:max-w-[240px] md:max-w-[300px] xl:max-w-[350px] ${
                                                            hasFile
                                                                ? "text-gray-800"
                                                                : "text-gray-400 italic"
                                                        }`}
                                                    >
                                                        {/* 🛠️ แก้ไข: ลำดับการแสดงชื่อไฟล์ (ไฟล์อัปโหลดใหม่ > ดึงชื่อท้ายพาธไฟล์เดิมใน DB > แสดงไม่มีเอกสาร) */}
                                                        {hasNewFile
                                                            ? data.documents[
                                                                  field.key
                                                              ].name
                                                            : hasExistingFile
                                                              ? employee.document[
                                                                    field.key
                                                                ]
                                                                    .split("/")
                                                                    .pop()
                                                              : "ไม่มีเอกสาร"}
                                                    </span>
                                                </div>

                                                {hasFile && (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setData(
                                                                (prevData) => ({
                                                                    ...prevData,
                                                                    documents: {
                                                                        ...prevData.documents,
                                                                        [field.key]:
                                                                            null,
                                                                    },
                                                                    // เอาชื่อไฟล์ที่ลบ ใส่เข้าไปใน Array ถังขยะ
                                                                    deleted_documents:
                                                                        [
                                                                            ...prevData.deleted_documents,
                                                                            field.key,
                                                                        ],
                                                                }),
                                                            );
                                                            if (
                                                                employee.document
                                                            ) {
                                                                employee.document[
                                                                    field.key
                                                                ] = null;
                                                            }
                                                            setDocErrors(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [field.key]:
                                                                        null,
                                                                }),
                                                            );
                                                        }}
                                                        className="pl-1 flex items-center justify-center transition-opacity hover:opacity-70"
                                                        title="ลบไฟล์"
                                                    >
                                                        <img
                                                            src={close}
                                                            alt="remove"
                                                            className="w-3 h-3 mr-3"
                                                        />
                                                    </button>
                                                )}

                                                {/* ฝั่งขวา: ปุ่มอัปโหลด */}
                                                <label className="text-[0.875rem] whitespace-nowrap cursor-pointer px-2 sm:px-4 bg-gray-100 text-gray-700 text-xs font-medium border-l rounded-lg border-gray-300 hover:bg-gray-200 transition-colors flex items-center">
                                                    อัปโหลด
                                                    <input
                                                        type="file"
                                                        accept=".pdf"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file =
                                                                e.target
                                                                    .files[0];
                                                            if (!file) return;

                                                            // ตรวจสอบประเภทไฟล์
                                                            if (
                                                                file.type !==
                                                                "application/pdf"
                                                            ) {
                                                                setDocErrors(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        [field.key]:
                                                                            "รองรับเฉพาะไฟล์ PDF เท่านั้น",
                                                                    }),
                                                                );
                                                                e.target.value =
                                                                    "";
                                                                return;
                                                            }

                                                            // ตรวจสอบขนาด 5MB
                                                            const maxSize =
                                                                5 * 1024 * 1024;
                                                            if (
                                                                file.size >
                                                                maxSize
                                                            ) {
                                                                setDocErrors(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        [field.key]:
                                                                            "ขนาดไฟล์ต้องไม่เกิน 5MB",
                                                                    }),
                                                                );
                                                                e.target.value =
                                                                    "";
                                                                return;
                                                            }

                                                            // ผ่านทุกเงื่อนไข -> ล้าง error และเซ็ตไฟล์ใหม่ลงสเตต
                                                            setDocErrors(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [field.key]:
                                                                        null,
                                                                }),
                                                            );
                                                            setData(
                                                                "documents",
                                                                {
                                                                    ...data.documents,
                                                                    [field.key]:
                                                                        file,
                                                                },
                                                            );
                                                        }}
                                                    />
                                                </label>
                                            </div>

                                            {/* ข้อความ error ใต้ field */}
                                            {docErrors[field.key] && (
                                                <p className="text-red-500 text-xs ml-1">
                                                    {docErrors[field.key]}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ✅ ปุ่มกด (ย้อนกลับ & บันทึก) */}
                        <div className="flex justify-end gap-3 mt-6 pb-10 pr-2 sm:pr-0">
                            <button
                                type="button"
                                onClick={handleBackClick}
                                className="px-6 py-2.5 rounded-lg text-[14px] sm:text-[16px] font-medium text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 active:scale-95 transition-all duration-200"
                            >
                                ย้อนกลับ
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 rounded-lg text-[14px] sm:text-[16px] font-medium text-white shadow-sm active:scale-95 transition-all duration-200 disabled:opacity-50"
                                style={{ backgroundColor: "#B3702A" }}
                            >
                                {processing ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
                            </button>
                            {/* ➕ เพิ่ม: โค้ด Popup สำหรับยืนยันการย้อนกลับ */}
                            {showBackConfirm && (
                                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
                                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4 transform transition-all">
                                        <div className="text-center">
                                            {/* ไอคอนแจ้งเตือนสีแดง */}
                                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                                <svg
                                                    className="h-6 w-6 text-red-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                    />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                ละทิ้งการเปลี่ยนแปลง?
                                            </h3>
                                            <p className="text-[16px] text-gray-500 mb-6">
                                                คุณมีการแก้ไขข้อมูลที่ยังไม่ได้บันทึก
                                                หากย้อนกลับตอนนี้
                                                ข้อมูลที่พิมพ์ไว้จะหายไปทั้งหมด
                                                ยืนยันหรือไม่?
                                            </p>
                                            <div className="flex justify-center gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowBackConfirm(
                                                            false,
                                                        )
                                                    }
                                                    className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    แก้ไขต่อ
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        window.history.back()
                                                    }
                                                    className="px-4 py-2 text-white rounded-lg transition-colors bg-red-600 hover:bg-red-700"
                                                >
                                                    ยืนยันการย้อนกลับ
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                </main>
            </div>
            {/* ✅ Popup ยืนยันส่งฟอร์ม */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4 transform transition-all">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 mb-4">
                                <svg
                                    className="h-6 w-6 text-amber-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                ยืนยันการบันทึกข้อมูล
                            </h3>
                            <p className="text-[16px] text-gray-500 mb-6">
                                ข้อมูลบางส่วนอาจยังกรอกไม่ครบถ้วน
                                คุณยืนยันที่จะบันทึกข้อมูลใช่หรือไม่?
                            </p>
                            <div className="flex justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(false)}
                                    className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    กลับไปแก้ไข
                                </button>
                                <button
                                    type="button"
                                    onClick={confirmAndSubmit}
                                    className="px-4 py-2 text-white rounded-lg transition-colors"
                                    style={{ backgroundColor: "#B3702A" }}
                                >
                                    ยืนยันการบันทึก
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* ✅ Popup เช็คการกดย้อนกลับ  */}{" "}
            {showBackConfirm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4 transform transition-all">
                        <div className="text-center">
                            {/* ไอคอนแจ้งเตือนสีแดง */}
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                <svg
                                    className="h-6 w-6 text-red-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                ละทิ้งการเปลี่ยนแปลง?
                            </h3>
                            <p className="text-[16px] text-gray-500 mb-6">
                                คุณมีการแก้ไขข้อมูลที่ยังไม่ได้บันทึก
                                หากย้อนกลับตอนนี้
                                ข้อมูลที่พิมพ์ไว้จะหายไปทั้งหมด ยืนยันหรือไม่?
                            </p>
                            <div className="flex justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowBackConfirm(false)}
                                    className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    แก้ไขต่อ
                                </button>
                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="px-4 py-2 text-white rounded-lg transition-colors bg-red-600 hover:bg-red-700"
                                >
                                    ยืนยันการย้อนกลับ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
