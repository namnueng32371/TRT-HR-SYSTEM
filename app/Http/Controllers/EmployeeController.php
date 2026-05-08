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
        //ส่งข้อมูลไปหน้าบ้าน
        $employees = Employee::with(['identity', 'addresses', 'emergencyContacts', 'document'])->get();
      
        return Inertia::render('Employee/Index', [
            'employees' => $employees
        ]);
    }

    // ส่งค่า จาก form แล้ว validation ไปเก็บใน database คล้ายๆ push
    public function store(Request $request, EmployeeService $employeeService)
    {
        // เพิ่ม: ระบบ Validation (ด่านตรวจข้อมูลก่อนเข้าเมือง)
        // ถ้าข้อมูลไม่ตรงตามกฎ Laravel จะส่ง Error กลับไปที่หน้า React ให้เองอัตโนมัติครับ
        $validated = $request->validate([
            'employee_code' => 'required|unique:employees,employee_code', // ต้องกรอก และห้ามซ้ำในตาราง employees
            'first_name_th' => 'required|string|max:255',
            'last_name_th'  => 'required|string|max:255',
            'email'         => 'nullable|email|unique:employees,email',
            // ... เพิ่มกฎข้ออื่นๆ ตามโครงสร้างฐานข้อมูลของเรา ...
        ]);

        // แก้ไข: เปลี่ยนจาก $request->all() เป็น $validated เพื่อความปลอดภัย (เอาเฉพาะข้อมูลที่ผ่านการตรวจแล้ว)
        $employeeService->createEmployee($validated);
    
        return redirect()->route('employees.index')->with('success', 'บันทึกข้อมูลพนักงานสำเร็จ!');
    }
    
}