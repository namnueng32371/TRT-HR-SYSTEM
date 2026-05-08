<?php

namespace App\Models; //บอกที่อยู่ของไฟล์นี้ว่าอยู่ไหน

//ประกาศการใช้งาน
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // 1. เพิ่มบรรทัดนี้ด้านบน

//ประกาศสร้าง class โดยให้ลูกสืบทอดพลังทั้งหมดจากแม่
class Employee extends Model
{
    // เพิ่ม: กำหนดคอลัมน์ที่อนุญาตให้บันทึกข้อมูลได้ โดยพวกนี้เป็นชื่อคอลัมน์
    protected $fillable = [
        'employee_code', 'prefix', 'first_name_th', 'last_name_th',
        'first_name_en', 'last_name_en', 'nickname', 'position',
        'phone', 'email', 'birth_date', 'blood_group',
        'hired_date', 'ssn', 'ssn_hospital', 'profile_image'
    ];

    //เป็นการบอกว่า
    public function identity()
    {
        return $this->hasOne(EmployeeIdentity::class);
    }

    // เพิ่ม: ความสัมพันธ์ 1 พนักงาน มีได้หลายที่อยู่ (One-to-Many)
    public function addresses()
    {
        return $this->hasMany(EmployeeAddress::class);
    }

    // เพิ่ม: ความสัมพันธ์ 1 พนักงาน มีได้หลายผู้ติดต่อฉุกเฉิน (One-to-Many)
    public function emergencyContacts()
    {
        return $this->hasMany(EmployeeEmergencyContact::class);
    }

    // เพิ่ม: ความสัมพันธ์ 1 พนักงาน มี 1 แฟ้มเอกสาร (One-to-One)
    public function document()
    {
        return $this->hasOne(EmployeeDocument::class);
    }
}