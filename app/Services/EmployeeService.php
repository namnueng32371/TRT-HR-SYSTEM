<?php

namespace App\Services;

use App\Models\Employee;

class EmployeeService
{
    // ฟังก์ชันสำหรับสร้างพนักงานใหม่
    public function createEmployee(array $data)
    {
        // 1. สร้างข้อมูลลงตารางแม่
        $employee = Employee::create($data);

        // 2. ถ้ามีข้อมูลบัตรประจำตัวส่งมาด้วย ให้บันทึกลงตารางลูก
        if (isset($data['identity'])) {
            $employee->identity()->create($data['identity']);
        }

        // 💡 ในอนาคต โค้ดอัปโหลดไฟล์ขึ้น Cloud หรือเช็คเงื่อนไขซับซ้อน จะมาเขียนรวมในห้องนี้ครับ

        return $employee;
    }
}