<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. ตารางหลัก: ข้อมูลพนักงาน
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('employee_code')->unique(); // รหัสพนักงาน (ต้องไม่ซ้ำ)
            $table->string('prefix'); // นาย/นาง/นางสาว
            $table->string('first_name_th');
            $table->string('last_name_th');
            $table->string('first_name_en');
            $table->string('last_name_en');
            $table->string('nickname')->nullable();
            $table->string('position'); // ตำแหน่ง
            $table->string('phone');
            $table->string('email')->nullable();
            $table->date('birth_date'); // เก็บวันเกิดเพื่อคำนวณอายุ
            $table->string('blood_group')->nullable();
            $table->date('hired_date'); // เก็บวันที่เริ่มงานเพื่อคำนวณอายุงาน
            $table->string('ssn')->nullable(); // เลขประกันสังคม
            $table->string('ssn_hospital')->nullable(); // โรงพยาบาลประกันสังคม
            $table->string('profile_image')->nullable(); // เก็บ Path รูปถ่าย
            $table->timestamps();
            $table->softDeletes(); // เพิ่ม: คำสั่งนี้จะสร้างคอลัมน์ deleted_at ให้อัตโนมัติ
        });
        
        // 2. ตารางข้อมูลเอกสารประจำตัว
        Schema::create('employee_identities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade'); // เชื่อมกับพนักงานหลัก
            $table->string('id_card_number')->nullable(); // บัตรประชาชน (คนไทย)
            $table->string('passport_number')->nullable();
            $table->string('pink_card_number')->nullable(); // บัตรชมพู (แรงงานต่างด้าว)
            $table->string('work_permit_number')->nullable(); // ใบอนุญาตทำงาน
            $table->timestamps();
        });
        // 3. ตารางที่อยู่
         Schema::create('employee_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('house_no');
            $table->string('moo')->nullable();
            $table->string('soi')->nullable();
            $table->string('road')->nullable();
            $table->string('sub_district');
            $table->string('district');
            $table->string('province');
            $table->string('zipcode');
            $table->timestamps();
        });

        // 4. ตารางติดต่อฉุกเฉิน
        Schema::create('employee_emergency_contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('relationship');
            $table->string('phone');
            $table->text('full_address');
            $table->timestamps();
        });

        // 5. ตารางเก็บไฟล์เอกสาร (PDF)
        Schema::create('employee_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('id_card_path')->nullable(); // เก็บ Path ไฟล์ PDF
            $table->string('house_reg_path')->nullable();
            $table->string('contract_path')->nullable();
            $table->string('bank_book_path')->nullable();
            $table->string('transcript_path')->nullable();
            $table->string('application_form_path')->nullable();
            $table->text('other_docs_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // แก้ไข: สั่งลบตารางลูกๆ (Child Tables) ทิ้งก่อน เพื่อตัดการอ้างอิง Foreign Key
        Schema::dropIfExists('employee_documents');
        Schema::dropIfExists('employee_emergency_contacts');
        Schema::dropIfExists('employee_addresses');
        Schema::dropIfExists('employee_identities');
        
        // แก้ไข: พอไม่มีใครอ้างอิงถึงแล้ว จึงสามารถลบตารางแม่ (Parent Table) ได้อย่างปลอดภัย
        Schema::dropIfExists('employees');
    }
};