<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;

// หน้าแรกของเว็บไซต์
Route::get('/', function () {
    // นี่คือคำสั่งที่บอกให้ไปเปิดหน้า React ที่ชื่อว่า 'Welcome'
   return redirect()->route('login');
});

// ✅ รวมทุก route ไว้ใน group เดียว ไม่ซ้ำ
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [EmployeeController::class, 'index'])->name('dashboard');

    // ⚠️ /employee/create ต้องอยู่เหนือ /employee/{employee}
    // เพราะถ้า {employee} อยู่บน Laravel จะคิดว่า "create" คือ id
    Route::get('/employee/create', [EmployeeController::class, 'create'])->name('employee.create');
    // หน้าเมื่อกด summit จากหน้า create
    Route::post('/employee', [EmployeeController::class, 'store'])->name('employee.store');
    // กดไปหน้าดูข้อมูลพนักงานแต่ละคน
    Route::get('/employee/{employee}', [EmployeeController::class, 'show'])->name('employee.show');
    
    Route::get('/employee/{employee}/document', [EmployeeController::class, 'document'])->name('employee.document');

    Route::get('/employee/{employee}/edit', [EmployeeController::class, 'edit'])->name('employee.edit');

    Route::post('/employee/{employee}', [EmployeeController::class, 'update'])->name('employee.update');});

require __DIR__.'/auth.php';