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
            $table->string('employee_code')->unique();
            $table->string('prefix');
            $table->string('first_name_th');
            $table->string('last_name_th');
            $table->string('first_name_en');
            $table->string('last_name_en');
            $table->string('nickname')->nullable();
            $table->string('position');
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->date('birth_date');
            $table->string('blood_group')->nullable();
            $table->text('medical_condition')->nullable(); // ← เพิ่ม โรคประจำตัว
            $table->date('hired_date');
            $table->string('profile_image')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
        
        // ตาราง employee_identities — เพิ่ม ssn, ssn_hospital
        Schema::create('employee_identities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('id_card_number')->nullable();
            $table->string('passport_number')->nullable();
            $table->string('pink_card_number')->nullable();
            $table->string('work_permit_number')->nullable();
            $table->string('ssn')->nullable();          // ← ย้ายมาจาก employees
            $table->string('ssn_hospital')->nullable(); // ← ย้ายมาจาก employees
            $table->timestamps();
        });

       // ตาราง employee_addresses — เพิ่ม village_name
        Schema::create('employee_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('house_no')->nullable();
            $table->string('moo')->nullable();
            $table->string('village_name')->nullable(); 
            $table->string('soi')->nullable();
            $table->string('road')->nullable();
            $table->string('sub_district')->nullable();
            $table->string('district')->nullable();
            $table->string('province')->nullable();
            $table->string('zipcode')->nullable();
            $table->timestamps();
        });

        // 4. ตารางติดต่อฉุกเฉิน
        Schema::create('employee_emergency_contacts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('name')->nullable(); 
            $table->string('relationship')->nullable();
            $table->string('phone')->nullable();
            $table->text('full_address')->nullable();
            $table->timestamps();
        });

        // 5. ตารางเก็บไฟล์เอกสาร (PDF)
        Schema::create('employee_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->string('id_card_path')->nullable();
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