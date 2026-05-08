<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmployeeDocument extends Model
{
    // เพิ่ม: อนุญาตให้บันทึก Path ไฟล์เอกสาร
    protected $fillable = [
        'employee_id', 'id_card_path', 'house_reg_path', 'contract_path', 
        'bank_book_path', 'transcript_path', 'application_form_path', 'other_docs_path'
    ];

    // เพิ่ม: ชี้กลับไปหาตารางแม่ (Employee)
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}