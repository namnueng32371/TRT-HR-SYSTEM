<?php

//เป็นการประกาศว่าไฟล์นี้อยู่ไหน
namespace App\Http\Controllers;

use Illuminate\Http\Request; //การ import เครื่องมือเข้ามาใช้งานชื่อว่า Rquest
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use App\Models\Employee; // เป็นการเรียกใช้งานไฟล์ Employee ของตัว models
use App\Services\EmployeeService; // 1. เรียกใช้งาน Service
use App\Http\Requests\EmployeeRequest;
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
            'profile_image'
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
    public function store(EmployeeRequest $request, EmployeeService $employeeService)
    {
        
        // พอตรวจสอบสำเร็จก็จะส่ง createEmployee ใน EmployeeService ทำงานแทน
        $employeeService->createEmployee(
            $request->only(['employee', 'identity', 'address', 'emergency',]),
            $request->file('employee.profile_image'),
            $request->file('documents')
            );

        return redirect()->route('dashboard')
            ->with('success', 'บันทึกข้อมูลพนักงานสำเร็จ!');
    }

    // ฟังก์ชันตัวนี้ทำหน้านี้แสดงผลข้อมูลในหน้า Edit 
    public function edit(Employee $employee)
    {
        // โหลดข้อมูลความสัมพันธ์ทั้งหมดออกมาให้ครบ
        $employee->load(['identity', 'addresses', 'emergencyContacts', 'document']);
        
        return Inertia::render('Employee/Edit', [
            'employee' => $employee
        ]);
    }

    // เมื่อกด Summit แล้วจะทำงานฟังก์ชันนี้
    public function update(EmployeeRequest $request, Employee $employee)
    {
        // 1. ตรวจสอบข้อมูล (Validation)
        // ระวัง: การเช็ค unique ต้องใส่ ->ignore() เพื่อให้มันรู้ว่า "ถ้าเป็นไอดีของฉันเอง ไม่ถือว่าซ้ำ"
       
        // 2. อัปเดตข้อมูลตารางหลัก (Employee)
        $employeeData = $request->input('employee');

        // 🛠️ แก้ไข: ยุบเงื่อนไขให้เหลือแค่ ตรวจสอบไฟล์ใหม่ กับ ข้ามการอัปเดต
        if ($request->hasFile('employee.profile_image')) {
            if ($employee->profile_image) {
                Storage::disk('public')->delete($employee->profile_image);
            }
            
            $file = $request->file('employee.profile_image');
            $extension = $file->getClientOriginalExtension() ?: 'png';
            $filename = uniqid() . '_' . time() . '.' . $extension;
            
            $path = $file->storeAs('profile_images', $filename, 'public');
            $employeeData['profile_image'] = $path;
            
        } else {
            // ➕ แก้ไข: ถ้าไม่มีไฟล์แนบมา ไม่ว่าหน้าบ้านจะส่ง null หรืออะไรมาก็ตาม ให้ตัดทิ้งไปเลย (รูปเก่าจะได้ไม่หาย)
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
        
        $existingDocument = $employee->document;
        // ➕ เพิ่ม: ดึง Array ถังขยะที่หน้าบ้านส่งมา
        $deletedDocs = $request->input('deleted_documents', []); 

        foreach ($documentFields as $field) {
            // 4.1 ถ้ามีการอัปโหลดไฟล์ใหม่มาทับ
            if ($request->hasFile("documents.{$field}")) {
                if ($existingDocument && $existingDocument->$field) {
                    Storage::disk('public')->delete($existingDocument->$field);
                }
                $documentData[$field] = $request->file("documents.{$field}")->store("documents/{$employee->id}", 'public');
            
            // 4.2 🛠️ แก้ไข: เช็คว่าชื่อไฟล์นี้ อยู่ในลิสต์ที่เรากดปุ่มลบจากหน้าบ้านมาหรือไม่
            } elseif (in_array($field, $deletedDocs)) {
                if ($existingDocument && $existingDocument->$field) {
                    Storage::disk('public')->delete($existingDocument->$field);
                    $documentData[$field] = null; // สั่งให้ฐานข้อมูลเป็น null
                }
            }
            // ถ้าไม่เข้า 4.1 และ 4.2 แปลว่าไฟล์อยู่นิ่งๆ ไม่ได้ถูกแตะต้อง ก็จะปลอดภัยครับ!
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