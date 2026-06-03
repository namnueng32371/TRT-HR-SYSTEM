<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeIdentity extends Model
{
    // เพิ่ม: อนุญาตให้บันทึกข้อมูลเอกสาร
    protected $fillable = [
        'employee_id',
        'id_card_number',
        'passport_number', 
        'pink_card_number',
        'work_permit_number',
        'ssn',          // ← เพิ่ม
        'ssn_hospital', // ← เพิ่ม
    ];

    // เพิ่ม: ชี้กลับไปหาตารางแม่ (Employee)
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}