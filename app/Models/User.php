<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password'])]//การ์ดเผ้าประตู ให้บันทึกแค่ 3 คอลัมน์นี้
#[Hidden(['password', 'remember_token'])] //เอาไว้ปิดบังข้อมูล ป้องกันรหัสหลุด

class User extends Authenticatable
{
    /* ดึงความสามารถของ Traits มาใช้ */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime', //เอาวันที่ในฐานข้อมูล มาเป็น obj เอามาใช้ต่อได้ง่าย
            'password' => 'hashed', //แปลงรหัสเป็นแบบมั่วๆ เพื่อความปลอดภัยก่อนลง Database
        ];
    }
}