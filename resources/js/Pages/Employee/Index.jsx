import React from "react";
import { Head } from "@inertiajs/react";

// ตัวแปร employees รับข้อมูลมาจาก EmployeeController โดยตรง!
export default function Index({ employees }) {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <Head title="ระบบจัดการพนักงาน" />

            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    📋 รายชื่อพนักงานทั้งหมด
                </h1>

                {/* ลองวนลูปแสดงชื่อพนักงานดูครับ */}
                <ul className="space-y-3">
                    {employees.length > 0 ? (
                        employees.map((emp) => (
                            <li
                                key={emp.id}
                                className="p-4 border rounded-md bg-gray-50"
                            >
                                รหัส: {emp.employee_code} | ชื่อ:{" "}
                                {emp.first_name_th} {emp.last_name_th}
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center py-4">
                            ยังไม่มีข้อมูลพนักงานในระบบ
                        </p>
                    )}
                </ul>
            </div>
        </div>
    );
}
