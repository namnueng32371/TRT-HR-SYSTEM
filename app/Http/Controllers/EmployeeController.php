<?php

//เป็นการประกาศว่าไฟล์นี้อยู่ไหน
namespace App\Http\Controllers;

use Illuminate\Http\Request; //การ import เครื่องมือเข้ามาใช้งานชื่อว่า Rquest
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

    // ส่งค่า จาก form แล้ว validation ไปเก็บใน database คล้ายๆ push
    // $request เปรียบเป็นกล่องที่ส่งมาจากหน้าบ้าน
    public function store(Request $request, EmployeeService $employeeService)
    {
        // validation ตรวจสอบความถูกต้องข้อมูล
        $request->validate([
            'employee.employee_code' => 'required|unique:employees,employee_code',
            'employee.prefix'        => 'required|string',
            'employee.first_name_th' => 'required|string|max:255',
            'employee.last_name_th'  => 'required|string|max:255',
            'employee.first_name_en' => 'required|string|max:255',
            'employee.last_name_en'  => 'required|string|max:255',
            'employee.nickname'      => 'nullable|string|max:100',
            'employee.position'      => 'required|string|max:255',
            'employee.phone'         => 'required|string|max:20',
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

            'address.house_no'     => 'required|string',
            'address.sub_district' => 'required|string',
            'address.district'     => 'required|string',
            'address.province'     => 'required|string',
            'address.zipcode'      => 'required|string|max:10',

            'emergency.name'         => 'required|string',
            'emergency.relationship' => 'required|string',
            'emergency.phone'        => 'required|string|max:20',
            'emergency.full_address' => 'required|string',
        ]);

        // พอตรวจสอบสำเร็จก็จะส่ง createEmployee ใน EmployeeService ทำงานแทน
        $employeeService->createEmployee($request->only([
            'employee', 'identity', 'address', 'emergency',
        ]));

        // ✅ แก้: route name ให้ตรง
        return redirect()->route('dashboard')
            ->with('success', 'บันทึกข้อมูลพนักงานสำเร็จ!');
    }
}