<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeEmergencyContact extends Model
{
    // เพิ่ม: อนุญาตให้บันทึกข้อมูลผู้ติดต่อฉุกเฉิน
    protected $fillable = [
        'employee_id', 'name', 'relationship', 'phone', 'full_address'
    ];

    // เพิ่ม: ชี้กลับไปหาตารางแม่ (Employee)
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}