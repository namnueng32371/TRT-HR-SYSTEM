<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeAddress extends Model
{
    // เพิ่ม: อนุญาตให้บันทึกข้อมูลที่อยู่
    protected $fillable = [
        'employee_id',
        'house_no',
        'moo',
        'village_name', // ← เพิ่ม
        'soi',
        'road',
        'sub_district',
        'district',
        'province',
        'zipcode',
    ];

    // เพิ่ม: ชี้กลับไปหาตารางแม่ (Employee)
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}