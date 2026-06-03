<?php

namespace App\Services;

use App\Models\Employee;

class EmployeeService
{
    public function createEmployee(array $data): Employee
    {
        // 1. สร้างข้อมูลตารางหลัก
        $employee = Employee::create($data['employee']);

        // 2. ข้อมูลบัตรประจำตัว
        if (!empty($data['identity'])) {
            $employee->identity()->create($data['identity']);
        }

        // 3. ที่อยู่
        if (!empty($data['address'])) {
            $employee->addresses()->create($data['address']);
        }

        // 4. ผู้ติดต่อฉุกเฉิน
        if (!empty($data['emergency'])) {
            $employee->emergencyContacts()->create($data['emergency']);
        }

        // 5. เอกสาร (สร้าง record ว่างไว้รอ upload)
        $employee->document()->create([]);

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