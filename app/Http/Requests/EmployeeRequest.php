<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule; // ✅ นำเข้าคลาส Rule เพื่อแก้ Error Class not found

class EmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        // 🛠️ ลอจิกหา ID ที่ชัวร์ 100% ทั้ง Create และ Edit
        // ถ้ายิงมาจากหน้า Edit URL จะมีพารามิเตอร์ employee ส่งมาด้วย
        // ถ้ายิงมาจากหน้า Create ค่านี้จะเป็น null
        $employee = $this->route('employee');
        $employeeId = $employee ? (is_object($employee) ? $employee->id : $employee) : null;

        return [
            // --- หมวดไฟล์เอกสาร (ตัดการเช็ค mimes/image ออก เหลือแค่เช็คขนาดไฟล์) ---
            'documents.id_card_path'          => 'nullable|file|max:5120', // 5MB
            'documents.house_reg_path'        => 'nullable|file|max:5120',
            'documents.contract_path'         => 'nullable|file|max:5120',
            'documents.bank_book_path'        => 'nullable|file|max:5120',
            'documents.transcript_path'       => 'nullable|file|max:5120',
            'documents.application_form_path' => 'nullable|file|max:5120',
            'documents.other_docs_path'       => 'nullable|file|max:5120',
            'employee.profile_image'          => 'nullable|file|max:2048', // 2MB
            
            // --- หมวดข้อมูลพนักงาน ---
            'employee.employee_code' => [
                'required',
                // ✅ ถ้าระบบเจอ $employeeId มันจะละเว้นการเช็คซ้ำให้ ID นั้นโดยอัตโนมัติ
                Rule::unique('employees', 'employee_code')->ignore($employeeId)
            ],
            'employee.prefix'        => 'required|string',
            'employee.first_name_th' => 'required|string|max:255',
            'employee.last_name_th'  => 'required|string|max:255',
            'employee.first_name_en' => 'required|string|max:255',
            'employee.last_name_en'  => 'required|string|max:255',
            'employee.nickname'      => 'nullable|string|max:100',
            'employee.position'      => 'required|string|max:255',
            'employee.phone'         => 'nullable|string|max:20',
            'employee.email'         => [
                'nullable',
                'email',
                // ✅ ละเว้นการเช็คซ้ำให้กับอีเมลตัวเอง
                Rule::unique('employees', 'email')->ignore($employeeId)
            ],
            'employee.birth_date'        => 'required|date',
            'employee.blood_group'       => 'nullable|string|max:5',
            'employee.medical_condition' => 'nullable|string',
            'employee.hired_date'        => 'required|date',

            // --- หมวดบัตรระบุตัวตน ---
            'identity.id_card_number'     => 'nullable|string|max:20',
            'identity.passport_number'    => 'nullable|string|max:20',
            'identity.work_permit_number' => 'nullable|string|max:20',
            'identity.ssn'                => 'nullable|string|max:20',
            'identity.ssn_hospital'       => 'nullable|string|max:255',

            // --- หมวดที่อยู่ ---
            'address.house_no'     => 'nullable|string',
            'address.sub_district' => 'nullable|string',
            'address.district'     => 'nullable|string',
            'address.province'     => 'nullable|string',
            'address.zipcode'      => 'nullable|string|max:10',

            // --- หมวดติดต่อฉุกเฉิน ---
            'emergency.name'         => 'nullable|string',
            'emergency.relationship' => 'nullable|string',
            'emergency.phone'        => 'nullable|string|max:20',
            'emergency.full_address' => 'nullable|string',

            'deleted_documents'   => 'nullable|array',
            'deleted_documents.*' => 'string',
        ];
    }
}