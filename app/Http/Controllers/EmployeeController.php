<?php

//เป็นการประกาศว่าไฟล์นี้อยู่ไหน
namespace App\Http\Controllers;

use Illuminate\Http\Request; //การ import เครื่องมือเข้ามาใช้งานชื่อว่า Rquest
use Illuminate\Validation\Rule;
use App\Models\Employee; // เป็นการเรียกใช้งานไฟล์ Employee ของตัว models
use App\Services\EmployeeService; // 1. เรียกใช้งาน Service
use Inertia\Inertia;

class EmployeeController extends Controller
{
    // เพิ่ม: ฟังก์ชันดึงข้อมูลพนักงานทั้งหมด (ส่งขอมูลไปให้ฝั่งหน้าบ้าน)
    public function index()
    {
     $employees = Employee::select([
            'id',
            'employee_code',
            'prefix',
            'first_name_th',
            'last_name_th',
            'nickname', // เอาไว้หาชื่อเล่น ใน search
            'first_name_en', //เอาไว้หาชื่ออังกฤษ search
            'position',
            'phone',
            'hired_date',
        ])
        //เรียกจาก id ใหม่ -> เก่า
        ->orderBy('id', 'desc') 
        ->get();
        
        return Inertia::render('Dashboard', [
            'employees' => $employees
        ]);
    }

    // ✅ มีการ ดึงข้อมูล มาจาก Models ชื่อว่า Employee สำหรับ ดึงข้อมูลจาก database
    public function show(Employee $employee)
    {
        $employee->load([
            'identity',
            'addresses',
            'emergencyContacts',
            'document',
        ]);
        
        return Inertia::render('Employee/Employeeprofile', [
            'employee' => $employee,
        ]);
    }

    // ✅ เพิ่มใหม่: render หน้า Create
    public function create()
    {
        // route ส่งมาที่ฟังก์ชันนี้ แล้วบอกให้เปิดหน้า Create 
        return Inertia::render('Employee/Create');
    }
    
     // ✅ เพิ่มใหม่: render หน้า Document
    public function document(Employee $employee)
    {
        // โหลด Relationship document ติดมาด้วย
        $employee->load('document'); 
        
        return Inertia::render('Employee/EmployeeDocument', [
            'employee' => $employee
        ]);
    }

    // ส่งค่า จาก form แล้ว validation หน้าบ้านมา
    // แล้วมาโดย controller ตรงนี้ก่อนเพื่อเช็ค validation หลังบ้าน
    // $request เปรียบเป็นกล่องที่ส่งมาจากหน้าบ้าน คล้าย rest.json
    // โดยก่อนจะคุยกับ model มันททำงานร่วมกับ EmployeeService หรือ Services ก่อน
    // ไปเปิดดูที่ EmployeeService
    public function store(Request $request, EmployeeService $employeeService)
    {
        // validation ตรวจสอบความถูกต้องข้อมูล
        $request->validate([
            'documents.id_card_path'       => 'nullable|file|mimes:pdf,jpg,png|max:5120', // 5MB
            'documents.house_reg_path'     => 'nullable|file|mimes:pdf,jpg,png|max:5120',
            'documents.contract_path'      => 'nullable|file|mimes:pdf|max:5120',
            'documents.bank_book_path'     => 'nullable|file|mimes:pdf,jpg,png|max:5120',
            'documents.transcript_path'    => 'nullable|file|mimes:pdf|max:5120',
            'documents.application_form_path' => 'nullable|file|mimes:pdf|max:5120',
            'documents.other_docs_path'    => 'nullable|file|max:5120',
            'employee.profile_image' => 'nullable|image|max:2048',
            
            'employee.employee_code' => 'required|unique:employees,employee_code',
            'employee.prefix'        => 'required|string',
            'employee.first_name_th' => 'required|string|max:255',
            'employee.last_name_th'  => 'required|string|max:255',
            'employee.first_name_en' => 'required|string|max:255',
            'employee.last_name_en'  => 'required|string|max:255',
            'employee.nickname'      => 'nullable|string|max:100',
            'employee.position'      => 'required|string|max:255',
            'employee.phone'         => 'nullable|string|max:20',
            'employee.email'         => 'nullable|email|unique:employees,email',
            'employee.birth_date'    => 'required|date',
            'employee.blood_group'   => 'nullable|string|max:5',
            'employee.medical_condition' => 'nullable|string',
            'employee.hired_date'    => 'required|date',

            'identity.id_card_number'     => 'nullable|string|max:20',
            'identity.passport_number'    => 'nullable|string|max:20',
            'identity.work_permit_number' => 'nullable|string|max:20',
            'identity.ssn'                => 'nullable|string|max:20',
            'identity.ssn_hospital'       => 'nullable|string|max:255',

            'address.house_no'     => 'nullable|string',
            'address.sub_district' => 'nullable|string',
            'address.district'     => 'nullable|string',
            'address.province'     => 'nullable|string',
            'address.zipcode'      => 'nullable|string|max:10',

            'emergency.name'         => 'nullable|string',
            'emergency.relationship' => 'nullable|string',
            'emergency.phone'        => 'nullable|string|max:20',
            'emergency.full_address' => 'nullable|string',
        ]);

        // พอตรวจสอบสำเร็จก็จะส่ง createEmployee ใน EmployeeService ทำงานแทน
        $employeeService->createEmployee(
            $request->only(['employee', 'identity', 'address', 'emergency',]),
            $request->file('employee.profile_image'),
            $request->file('documents')
            );

        return redirect()->route('dashboard')
            ->with('success', 'บันทึกข้อมูลพนักงานสำเร็จ!');
    }

    public function edit(Employee $employee)
    {
        // โหลดข้อมูลความสัมพันธ์ทั้งหมดออกมาให้ครบ
        $employee->load(['identity', 'addresses', 'emergencyContacts', 'document']);
        
        return Inertia::render('Employee/Edit', [
            'employee' => $employee
        ]);
    }

    // [เพิ่ม] ฟังก์ชัน update 
    public function update(Request $request, Employee $employee)
    {
        // 1. ตรวจสอบข้อมูล (Validation)
        // ระวัง: การเช็ค unique ต้องใส่ ->ignore() เพื่อให้มันรู้ว่า "ถ้าเป็นไอดีของฉันเอง ไม่ถือว่าซ้ำ"
        $request->validate([
            'employee.employee_code' => [
                'required', 
                Rule::unique('employees', 'employee_code')->ignore($employee->id)
            ],
            'employee.first_name_th' => 'required|string',
            // ... (ใส่ validate ช่องอื่นๆ ตามต้องการ) ...
            
            // ตรวจสอบไฟล์ (อนุญาตให้เป็น null ได้เผื่อไม่ได้อัปโหลด)
            'employee.profile_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'documents.*'            => 'nullable|mimes:pdf|max:5120',
        ]);

        // 2. อัปเดตข้อมูลตารางหลัก (Employee)
        $employeeData = $request->input('employee');

        // ตรวจสอบรูปโปรไฟล์
        if ($request->hasFile('employee.profile_image')) {
            // 2.1 ถ้ามีไฟล์ใหม่มา -> ลบไฟล์เก่าใน Storage ทิ้งก่อน
            if ($employee->profile_image) {
                Storage::disk('public')->delete($employee->profile_image);
            }
            // 2.2 บันทึกไฟล์ใหม่
            $path = $request->file('employee.profile_image')->store('profile_images', 'public');
            $employeeData['profile_image'] = $path;
        } elseif (array_key_exists('profile_image', $employeeData) && is_null($employeeData['profile_image'])) {
            // 2.3 กรณีหน้าบ้านกด "ลบรูป" (ค่าส่งมาเป็น null)
            if ($employee->profile_image) {
                Storage::disk('public')->delete($employee->profile_image);
            }
            $employeeData['profile_image'] = null;
        } else {
            // 2.4 ถ้าไม่ได้ส่งรูปใหม่และไม่ได้ลบของเก่า -> ตัด array ทิ้งเพื่อกันเอาค่า null ไปทับของเดิม
            unset($employeeData['profile_image']);
        }

        // เซฟลง Database
        $employee->update($employeeData);


        // 3. อัปเดตข้อมูลตารางความสัมพันธ์ (Relationships)
        // ใช้ updateOrCreate คือ "ถ้ามีข้อมูลเก่าให้แก้ ถ้าเป็นคนใหม่ยังไม่มีให้สร้าง"
        if ($request->has('identity')) {
            $employee->identity()->updateOrCreate(
                ['employee_id' => $employee->id],
                $request->input('identity')
            );
        }

        if ($request->has('address')) {
            // ใช้คำว่า addresses ตามฟังก์ชัน edit ของเจ๋ง แต่รับ input ชื่อ address จากฝั่ง React
            $employee->addresses()->updateOrCreate(
                ['employee_id' => $employee->id],
                $request->input('address')
            );
        }

        if ($request->has('emergency')) {
            $employee->emergencyContacts()->updateOrCreate(
                ['employee_id' => $employee->id],
                $request->input('emergency')
            );
        }


        // 4. จัดการไฟล์ตาราง Documents
        $documentData = [];
        $documentFields = [
            'id_card_path', 'house_reg_path', 'contract_path', 
            'bank_book_path', 'transcript_path', 'application_form_path', 'other_docs_path'
        ];
        
        $existingDocument = $employee->document; // ดึงออบเจกต์เอกสารเก่ามาอ้างอิง

        foreach ($documentFields as $field) {
            // 4.1 ถ้าหน้าบ้านส่งไฟล์แนบตัวใหม่เข้ามา
            if ($request->hasFile("documents.{$field}")) {
                
                // ลบไฟล์เก่าทิ้ง
                if ($existingDocument && $existingDocument->$field) {
                    Storage::disk('public')->delete($existingDocument->$field);
                }
                
                // เซฟไฟล์ใหม่เข้าโฟลเดอร์แยกตาม ID พนักงานให้เป็นระเบียบ
                $documentData[$field] = $request->file("documents.{$field}")->store("documents/{$employee->id}", 'public');
            
            // 4.2 ถ้าหน้าบ้านกด "ปุ่มลบไฟล์ (ถังขยะ)" ทำให้ค่ากลายเป็น null
            } elseif (array_key_exists($field, $request->input('documents', [])) && is_null($request->input("documents.{$field}"))) {
                
                if ($existingDocument && $existingDocument->$field) {
                    Storage::disk('public')->delete($existingDocument->$field);
                    $documentData[$field] = null; // สั่งให้ฐานข้อมูลเป็น null ด้วย
                }
            }
            // ถ้าไม่เข้าเงื่อนไขเลยแปลว่าไม่ได้อัปโหลดใหม่และไม่ได้ลบ จะใช้ค่าเดิมใน DB ไม่ต้องทำอะไร
        }

        // ถ้ามีการเปลี่ยนแปลงข้อมูลไฟล์ (อัปโหลดใหม่ หรือ กดลบ) ค่อยสั่งเซฟ
        if (!empty($documentData)) {
            $employee->document()->updateOrCreate(
                ['employee_id' => $employee->id],
                $documentData
            );
        }

        // 5. ส่งกลับไปหน้า Dashboard หรือกลับไปหน้า Edit ก็ได้
        // with('success', ...) เอาไว้ไปทำ Alert แจ้งเตือนฝั่งหน้าบ้าน
        return redirect()->route('dashboard')->with('success', 'อัปเดตข้อมูลพนักงานเรียบร้อยแล้ว');
    }
}