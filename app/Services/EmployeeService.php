<?php

namespace App\Services;

use App\Models\Employee;

// ฟังชันชื่อ EmployeeService ส่งข้อมูลที่ผ่านการตรวจสอบมาที่นี้
// แล้วทำการสร้างตารางข้อมูลไปเก็บใน data ผ่านการคุยกับ Employee:Models
class EmployeeService
{
    public function createEmployee(array $data, $profileImage = null, $documents = null): Employee
    {
         // ถ้ามีรูป → บันทึกไฟล์ก่อน แล้วเก็บ path
        if ($profileImage) {
            // บันทึกใน storage/app/public/employees/profiles/
            // ได้ path กลับมา เช่น "employees/profiles/abc123.jpg"
            $path = $profileImage->store('employees/profiles', 'public');
            
            // ใส่ path เข้าไปใน data ก่อน create
            $data['employee']['profile_image'] = $path;
        }
         
        // 1. สร้างข้อมูลตารางหลัก
        $employee = Employee::create($data['employee']);

        // 2. ข้อมูลบัตรประจำตัว
        if (!empty($data['identity'])) {
            $employee->identity()->create($data['identity'] ?? []);
        }

        // 3. ที่อยู่
        if (!empty($data['address'])) {
            $employee->addresses()->create($data['address']?? []);
        }

        // 4. ผู้ติดต่อฉุกเฉิน
        if (!empty($data['emergency'])) {
            $employee->emergencyContacts()->create($data['emergency']?? []);
        }

        
        // 5. จัดการเอกสาร (Documents)
        $docData = [];
        if ($documents) {
            foreach ($documents as $key => $file) {
                if ($file) {
                    // ตอนนี้มี $employee->id แล้ว ✅
                    $path = $file->store(
                        'employees/' . $employee->id . '/documents',
                        'public'
                    );
                    $docData[$key] = $path;
                }
            }
        }

        
        // 5. เอกสาร (สร้าง record ว่างไว้รอ upload)
       $employee->document()->create($docData);
        

        return $employee;
    }

    public function updateEmployee(Employee $employee, array $data): Employee
    {
        $employee->update($data['employee']);

        $employee->identity()->updateOrCreate(
            ['employee_id' => $employee->id],
            $data['identity'] ?? []
        );

        if (!empty($data['address'])) {
            $employee->addresses()->updateOrCreate(
                ['employee_id' => $employee->id],
                $data['address']
            );
        }

        if (!empty($data['emergency'])) {
            $employee->emergencyContacts()->updateOrCreate(
                ['employee_id' => $employee->id],
                $data['emergency']
            );
        }

        return $employee;
    }
}