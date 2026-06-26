# TRT HR System - Project Context & Documentation

เอกสารนี้เป็นแหล่งข้อมูลอ้างอิงภาพรวมสถาปัตยกรรม โครงสร้างฐานข้อมูล และวิธีการทำงานของโปรเจกต์ **TRT HR System** (ระบบบริหารจัดการข้อมูลพนักงาน) เพื่อช่วยให้ผู้พัฒนาหรือ AI สามารถทำความเข้าใจและพัฒนาต่อยอดระบบได้อย่างรวดเร็ว

---

## 1. ภาพรวมโปรเจกต์ (Project Overview)
**TRT HR System** เป็นระบบเว็บแอปพลิเคชันสำหรับจัดการข้อมูลพนักงานขององค์กร โดยเน้นความง่ายในการจัดการประวัติ ข้อมูลระบุตัวตน ที่อยู่ ผู้ติดต่อฉุกเฉิน และเอกสารสำคัญต่าง ๆ ของพนักงาน 

ระบบประกอบด้วยฟีเจอร์หลักดังนี้:
- **Dashboard**: แสดงรายชื่อพนักงานทั้งหมด ค้นหาข้อมูลพนักงานด้วย รหัสพนักงาน, ชื่อ-นามสกุล, หรือชื่อเล่น พร้อมระบบแบ่งหน้า (Pagination)
- **Employee Management**: เพิ่ม แก้ไข และดูข้อมูลส่วนตัวของพนักงานโดยละเอียด
- **Document Management**: อัปโหลด จัดเก็บ และลบเอกสารสำคัญของพนักงาน (เช่น สำเนาบัตรประชาชน, ทะเบียนบ้าน, สัญญาจ้าง, หน้าสมุดบัญชี)
- **Profile Image Management**: ระบบจัดการรูปโปรไฟล์ของพนักงาน

---

## 2. เทคโนโลยีที่ใช้ (Tech Stack)
โปรเจกต์นี้ทำงานในรูปแบบ **Monolith** ที่เชื่อมต่อกันด้วย **Inertia.js** ทำให้สามารถเขียน Frontend ด้วย React ร่วมกับ Backend ของ Laravel ได้อย่างราบรื่น:

### Backend (หลังบ้าน)
- **Framework**: Laravel v13.5.0 (PHP v8.4.22)
- **Database**: MySQL v8.0 (รันผ่าน Docker หรือ XAMPP) / SQLite (สำหรับการรันเทส)
- **ORM**: Eloquent ORM (Laravel)
- **Dependency Manager**: Composer v2.9.5
- **Authentication**: Laravel Breeze (React)

### Frontend (หน้าบ้าน)
- **Framework/Library**: React v18.3.1
- **Build Tool**: Vite v8.0.9 (พร้อม `@tailwindcss/vite` v4.2.2)
- **Styling**: Tailwind CSS v3.4.19 / v4.2.2 & PostCSS
- **State/Routing Link**: Inertia.js React Adapter (`@inertiajs/react` v2.3.21)

---

## 3. โครงสร้างฐานข้อมูล (Database Schema)
ระบบใช้ความสัมพันธ์ของฐานข้อมูลแบบ **One-to-One** และ **One-to-Many** โดยมีตารางหลักคือ `employees` และตารางลูกเชื่อมโยงผ่าน `employee_id` (พร้อมระบบ Cascade Delete):

```mermaid
erDiagram
    employees ||--o| employee_identities : "has one"
    employees ||--o{ employee_addresses : "has many"
    employees ||--o{ employee_emergency_contacts : "has many"
    employees ||--o| employee_documents : "has one"

    employees {
        bigint id PK
        string employee_code "รหัสพนักงาน (Unique)"
        string prefix "คำนำหน้าชื่อ"
        string first_name_th "ชื่อจริง (ไทย)"
        string last_name_th "นามสกุล (ไทย)"
        string first_name_en "ชื่อจริง (อังกฤษ)"
        string last_name_en "นามสกุล (อังกฤษ)"
        string nickname "ชื่อเล่น (Nullable)"
        string position "ตำแหน่งงาน"
        string phone "เบอร์โทรศัพท์ (Nullable)"
        string email "อีเมล (Unique, Nullable)"
        date birth_date "วันเกิด"
        string blood_group "กรุ๊ปเลือด (Nullable)"
        text medical_condition "โรคประจำตัว/ข้อมูลสุขภาพ (Nullable)"
        date hired_date "วันที่เริ่มงาน"
        string profile_image "พาธรูปโปรไฟล์ (Nullable)"
        timestamp created_at
        timestamp updated_at
        timestamp deleted_at "Soft Deletes"
    }

    employee_identities {
        bigint id PK
        bigint employee_id FK
        string id_card_number "เลขบัตรประชาชน (Nullable)"
        string passport_number "เลขพาสปอร์ต (Nullable)"
        string pink_card_number "เลขบัตรสีชมพู (Nullable)"
        string work_permit_number "เลขใบอนุญาตทำงาน (Nullable)"
        string ssn "ประกันสังคม (Nullable)"
        string ssn_hospital "โรงพยาบาลประกันสังคม (Nullable)"
    }

    employee_addresses {
        bigint id PK
        bigint employee_id FK
        string house_no "บ้านเลขที่"
        string moo "หมู่ที่"
        string village_name "ชื่อหมู่บ้าน"
        string soi "ซอย"
        string road "ถนน"
        string sub_district "ตำบล/แขวง"
        string district "อำเภอ/เขต"
        string province "จังหวัด"
        string zipcode "รหัสไปรษณีย์"
    }

    employee_emergency_contacts {
        bigint id PK
        bigint employee_id FK
        string name "ชื่อผู้ติดต่อ"
        string relationship "ความสัมพันธ์"
        string phone "เบอร์โทรศัพท์"
        text full_address "ที่อยู่โดยละเอียด"
    }

    employee_documents {
        bigint id PK
        bigint employee_id FK
        string id_card_path "สำเนาบัตรประชาชน (PDF/Image)"
        string house_reg_path "สำเนาทะเบียนบ้าน (PDF/Image)"
        string contract_path "สัญญาจ้าง (PDF/Image)"
        string bank_book_path "สำเนาหน้าสมุดบัญชี (PDF/Image)"
        string transcript_path "วุฒิการศึกษา (PDF/Image)"
        string application_form_path "ใบสมัครงาน (PDF/Image)"
        text other_docs_path "เอกสารอื่นๆ (PDF/Image)"
    }
```

---

## 4. โครงสร้างและส่วนประกอบสำคัญของโค้ด (Key Architectural Components)

### 4.1 เส้นทางของระบบ (Routing)
กำหนดไว้ในไฟล์ [web.php](file:///c:/Users/Jengza/Desktop/trt-hr-system/routes/web.php) ภายใต้ Middleware `['auth', 'verified']`:
- `/dashboard` : แสดงหน้ารายการพนักงานทั้งหมด (`EmployeeController@index`)
- `/employee/create` : หน้าฟอร์มสำหรับเพิ่มข้อมูลพนักงานใหม่ (`EmployeeController@create`)
- `/employee` [POST] : บันทึกข้อมูลพนักงานใหม่เข้าฐานข้อมูล (`EmployeeController@store`)
- `/employee/{employee}` : แสดงหน้าโปรไฟล์ข้อมูลพนักงานรายคน (`EmployeeController@show`)
- `/employee/{employee}/edit` : หน้าฟอร์มแก้ไขข้อมูลพนักงาน (`EmployeeController@edit`)
- `/employee/{employee}` [POST] : อัปเดตข้อมูลพนักงานที่แก้ไข (`EmployeeController@update`)
- `/employee/{employee}/document` : แสดงหน้าจัดการและดาวน์โหลดเอกสารของพนักงานคนนั้นๆ (`EmployeeController@document`)

### 4.2 คอนโทรลเลอร์ (Controller)
จัดการผ่าน [EmployeeController.php](file:///c:/Users/Jengza/Desktop/trt-hr-system/app/Http/Controllers/EmployeeController.php):
- มีการใช้ระบบ **Validation** หลังบ้านผ่าน [EmployeeRequest.php](file:///c:/Users/Jengza/Desktop/trt-hr-system/app/Http/Requests/EmployeeRequest.php) เพื่อตรวจสอบข้อมูลความถูกต้อง (เช่น การเช็ค `unique` รหัสพนักงานและอีเมล โดยละเว้น ID ของตัวเองในโหมดอัปเดต)
- แยก Logic การบันทึกข้อมูลออกไปไว้ที่ [EmployeeService.php](file:///c:/Users/Jengza/Desktop/trt-hr-system/app/Services/EmployeeService.php) เพื่อรักษาความสะอาดของ Controller ตามหลัก Single Responsibility Principle

### 4.3 เซอร์วิส (Service Pattern)
การสร้างพนักงานใหม่จะทำงานผ่านไฟล์ [EmployeeService.php](file:///c:/Users/Jengza/Desktop/trt-hr-system/app/Services/EmployeeService.php):
1. ตรวจสอบและจัดเก็บไฟล์ภาพโปรไฟล์ลงในดิสก์ `public/employees/profiles/`
2. สร้างแถวข้อมูลใหม่ในตาราง `employees`
3. เชื่อมโยงสร้างข้อมูลลงในตารางลูก `employee_identities`, `employee_addresses`, และ `employee_emergency_contacts`
4. วนลูปบันทึกไฟล์เอกสารแนบทุกประเภทลงในโฟลเดอร์ `public/employees/{id}/documents/` แล้วทำการบันทึกพาธลงตาราง `employee_documents`

### 4.4 การจัดการเอกสารและการลบ (File Storage & Update Logic)
- ในฟังก์ชัน `update` ของ `EmployeeController` ระบบจะรองรับการกด **ลบไฟล์เฉพาะจุด** จากหน้าบ้าน โดยส่งรายการของฟิลด์ที่ต้องการลบมาในอาเรย์ `deleted_documents`
- ระบบจะทำการลบไฟล์เดิมออกจาก Storage จริงผ่าน `Storage::disk('public')->delete(...)` และตั้งค่าฟิลด์ในฐานข้อมูลเป็น `null`
- หากมีการอัปโหลดไฟล์ใหม่มาทดแทน ระบบจะลบไฟล์เก่าทิ้งแล้วเซฟไฟล์ใหม่เข้าไปเก็บทันที

---

## 5. โครงสร้างไฟล์ในโครงการ (Project File Structure)
นี่คือโฟลเดอร์และไฟล์สำคัญที่เราทำงานด้วยบ่อยที่สุด:

```text
trt-hr-system/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── EmployeeController.php         # คอนโทรลเลอร์หลักจัดการพนักงาน
│   │   │   └── ProfileController.php          # จัดการข้อมูลผู้ใช้ระบบ (HR)
│   │   └── Requests/
│   │       └── EmployeeRequest.php            # คอนฟิกการทำ Validation ข้อมูลฝั่งหลังบ้าน
│   ├── Models/
│   │   ├── Employee.php                       # โมเดลหลักพนักงาน
│   │   ├── EmployeeAddress.php                # โมเดลที่อยู่พนักงาน
│   │   ├── EmployeeDocument.php               # โมเดลพาธไฟล์เอกสาร
│   │   ├── EmployeeEmergencyContact.php       # โมเดลติดต่อฉุกเฉิน
│   │   ├── EmployeeIdentity.php               # โมเดลข้อมูลบัตรประจำตัวต่างๆ
│   │   └── User.php                           # โมเดลผู้ใช้ระบบ (สำหรับ Login)
│   └── Services/
│       └── EmployeeService.php                # เซอร์วิสรวม Logic บันทึกข้อมูลพนักงาน
├── database/
│   └── migrations/
│       └── 2026_04_21_032222_create_hr_system_tables.php # ไฟล์ Migrations สร้างตารางทั้งหมด
├── resources/
│   └── js/
│       ├── app.jsx                            # จุดเริ่มสถาปัตยกรรม Inertia+React
│       ├── Components/                        # คอมโพเนนต์ UI พื้นฐานที่ใช้ซ้ำ
│       ├── Layouts/                           # เลย์เอาต์หลักของแอปพลิเคชัน
│       └── Pages/
│           ├── Dashboard.jsx                  # หน้าหลักตารางแสดงรายชื่อและตัวค้นหาพนักงาน
│           ├── Welcome.jsx                    # หน้าแรกของโปรเจกต์ (Redir ไป Login)
│           └── Employee/
│               ├── Create.jsx                 # หน้าฟอร์มกรอกข้อมูลพนักงานใหม่
│               ├── Edit.jsx                   # หน้าฟอร์มแก้ไขข้อมูลพนักงานเก่า
│               ├── Employeeprofile.jsx        # หน้าแสดงข้อมูลรายละเอียดทั้งหมดของพนักงานคนนั้นๆ
│               └── EmployeeDocument.jsx       # หน้าจัดการ ดู ดาวน์โหลด และลบเอกสารพนักงาน
├── routes/
│   ├── auth.php                               # เส้นทางการยืนยันตัวตน (Breeze)
│   └── web.php                                # เส้นทางการใช้งานแอปพลิเคชันหลัก
├── gemini_cli.mjs                             # สคริปต์รันคำสั่งเช็คและรีวิวโค้ดผ่าน Gemini API
├── composer.json                              # ไฟล์การตั้งค่า dependencies ของ PHP และคำสั่งลัด
└── package.json                               # ไฟล์การตั้งค่า dependencies ของฝั่ง Node/React
```

---

## 6. วิธีการติดตั้งและเริ่มต้นระบบ (Setup & Installation)

### 6.1 สิ่งที่ต้องมีในเครื่อง (Prerequisites)
1. **PHP** (เวอร์ชัน 8.4.22)
2. **Composer** (เวอร์ชัน 2.9.5)
3. **Node.js & npm** (Node v24.6.0 & npm v11.5.1)
4. **XAMPP / Docker** (MySQL Database v8.0)

### 6.2 ขั้นตอนการติดตั้ง (Setup Steps)
หากต้องการตั้งค่าโปรเจกต์ใหม่ตั้งแต่ต้น ให้ทำตามลำดับคำสั่งด้านล่างนี้:
```bash
# 1. ติดตั้ง PHP package dependencies
composer install

# 2. คัดลอกไฟล์ตั้งค่า .env (หากยังไม่มี)
copy .env.example .env

# 3. สร้างคีย์สำหรับ Laravel
php artisan key:generate

# 4. ติดตั้ง Node package dependencies
npm install

# 5. สั่ง Migrate โครงสร้างตารางลงฐานข้อมูล
php artisan migrate

# 6. สร้างไฟล์ build ฝั่ง React
npm run build
```
*(ในโปรเจกต์นี้มีสคริปต์ลัดใน `composer.json` สามารถพิมพ์ `composer run setup` เพื่อดำเนินการขั้นตอนด้านบนทั้งหมดแบบอัตโนมัติได้)*

### 6.3 วิธีการเปิดรันเซิร์ฟเวอร์เพื่อพัฒนาต่อ (Running Dev Mode)
1. เปิดโปรแกรม **XAMPP** จากนั้นกดปุ่ม **Start** ในส่วนของ **Apache** และ **MySQL** ให้ขึ้นแถบสีเขียว
2. เปิด Terminal รันคำสั่งด้านหลังบ้าน:
   ```bash
   php artisan serve
   ```
3. เปิด Terminal อีกตัวรันคำสั่งด้านหน้าบ้าน:
   ```bash
   npm run dev
   ```
*(หรือใช้คำสั่งสคริปต์สแกนรันทุกกระบวนการรวมกันในหน้าจอเดียวผ่าน: `composer run dev`)*

### 6.4 การตั้งค่าเชื่อมต่อฐานข้อมูล (.env Config)
ค่าคอนฟิกฐานข้อมูลในไฟล์ `.env` จะต้องตั้งค่าให้ตรงตามสภาพแวดล้อมที่ใช้งาน ดังนี้:

#### 1) การเชื่อมต่อผ่าน XAMPP (Local Development)
หากใช้ฐานข้อมูลของ XAMPP ให้เปิด MySQL ใน XAMPP Control Panel และปรับแก้ค่าในไฟล์ `.env` ดังนี้:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=trt_hr_db
DB_USERNAME=root
DB_PASSWORD=            # ปล่อยเป็นค่าว่างเปล่า (เนื่องจาก MySQL ของ XAMPP ปกติไม่มีรหัสผ่าน)
```
*อย่าลืมสร้างฐานข้อมูลชื่อ `trt_hr_db` ใน phpMyAdmin ก่อนรันคำสั่ง `php artisan migrate`*

#### 2) การเชื่อมต่อผ่าน Docker Development
หากรันระบบผ่าน Docker Containers (รันตู้บริการด้วยคำสั่ง `docker-compose up -d`) ให้ใช้ค่าคอนฟิกในไฟล์ `.env` ดังนี้:
```env
DB_CONNECTION=mysql
DB_HOST=db              # แก้ไขจาก 127.0.0.1 เป็น db (ตามชื่อ service ใน docker-compose.yml)
DB_PORT=3306
DB_DATABASE=trt_hr_db
DB_USERNAME=root
DB_PASSWORD=root_password # ใส่รหัสผ่านให้ตรงกับ MYSQL_ROOT_PASSWORD ใน docker-compose.yml
```
*หมายเหตุ: ใน docker-compose.yml มีการ map พอร์ตภายนอกไว้ที่ 33061 (33061:3306) ทำให้สามารถใช้โปรแกรมจัดการฐานข้อมูลภายนอก (เช่น TablePlus, DBeaver) เชื่อมต่อ Host: 127.0.0.1 Port: 33061 ได้*

#### 3) การเชื่อมต่อและตั้งค่าสำหรับ CloudPanel (Production Server)
เมื่อนำโปรเจกต์ขึ้นระบบจริงบน CloudPanel ให้แก้ไขค่าในไฟล์ `.env` บนเซิร์ฟเวอร์ดังนี้:
```env
APP_NAME="TRT HR"
APP_ENV=production
APP_DEBUG=false
APP_URL=https://thairubbtechconnect.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ชื่อฐานข้อมูลใน CloudPanel (เช่น thairubbtechdb)
DB_USERNAME=ชื่อผู้ใช้ใน CloudPanel (เช่น thairubbtechusr)
DB_PASSWORD="รหัสผ่านฐานข้อมูลใน CloudPanel" # เช่น "#logic1122" (ห้ามลืมเครื่องหมายฟันหนูครอบ)
```
*⚠️ ข้อควรระวัง: หากรหัสผ่านมีเครื่องหมาย `#` นำหน้า (เช่น `#logic1122`) ต้องมีฟันหนู `"..."` ครอบไว้เสมอดังตัวอย่างด้านบน ไม่เช่นนั้นระบบจะมองข้ามรหัสผ่านเนื่องจากคิดว่าเป็นคอมเมนต์ และทำให้การเชื่อมต่อฐานข้อมูลล้มเหลว*

##### คำสั่งการเชื่อมต่อ SSH และอัปเดตระบบด้วย Git บน CloudPanel
หากต้องการเข้าจัดการระบบหรืออัปเดตโค้ดบนเซิร์ฟเวอร์ CloudPanel ผ่าน SSH ให้ดำเนินการดังนี้:
* **เชื่อมต่อ SSH (จากเครื่องหลัก):**
  ```bash
  ssh adminssh@192.168.7.122
  ```
* **ย้ายเข้าโฟลเดอร์โปรเจกต์:**
  ```bash
  cd htdocs/thairubbtechconnect.com
  ```
* **ดึงโค้ดล่าสุดจาก GitHub:**
  ```bash
  git pull
  ```
  *(หากมีปัญหาสิทธิ์ของ Git ให้รัน: `git config --global --add safe.directory /home/thairubbtechconnect/htdocs/thairubbtechconnect.com` ก่อน)*
* **ตั้งค่าและรันแคชระบบหลังบ้าน:**
  ```bash
  php artisan key:generate     # สร้างคีย์ระบบใหม่ (หากจำเป็น)
  php artisan storage:link     # เชื่อมต่อโฟลเดอร์สำหรับไฟล์แนบและรูปถ่ายพนักงาน
  php artisan config:cache     # ล้างแคชคอนฟิกและสร้างใหม่เพื่อความเร็ว
  php artisan route:cache      # ล้างแคชเส้นทางและสร้างใหม่เพื่อความเร็ว
  php artisan view:clear       # ล้างแคชหน้าจอการแสดงผล (Blade/Inertia)
  php artisan cache:clear      # ล้างระบบแคชชั่วคราวทั้งหมด
  ```
* **นำเข้าฐานข้อมูลจากเครื่องขึ้นเซิร์ฟเวอร์:**
  ```bash
  mysql -u thairubbtechusr -p thairubbtechdb < backup.sql
  ```

---

### 6.5 การใช้งาน ngrok สำหรับแชร์ระบบให้ UAT ทดสอบ
เมื่อต้องการเปิดลิงก์ให้ทีม UAT หรือผู้ใช้ภายนอกเข้ามาทดสอบระบบโดยทำงานร่วมกับ Docker มีขั้นตอนดังนี้:
1. **คอมไพล์ React สำหรับ Production:**
   ```bash
   docker compose exec app npm run build
   ```
2. **รัน ngrok ชี้ไปที่พอร์ต Nginx (8000):**
   ```bash
   ngrok http 8000
   ```
3. **อัปเดตค่าในไฟล์ `.env`:** เปลี่ยน `APP_URL` ให้เป็น URL ปลายทางที่ได้จาก ngrok (เช่น `https://xxxx.ngrok-free.app`)
4. **ล้างแคชหลังบ้าน:**
   ```bash
   docker compose exec app php artisan config:clear
   ```
*เมื่อสิ้นสุดการทดสอบ ให้ปิด ngrok และเปลี่ยน `APP_URL` ใน `.env` กลับเป็น `http://localhost:8000` พร้อมรันคำสั่งเคลียร์แคชอีกครั้ง*

---

## 7. เครื่องมือวิเคราะห์โค้ดผ่าน Gemini CLI
ในโปรเจกต์มีไฟล์สคริปต์ [gemini_cli.mjs](file:///c:/Users/Jengza/Desktop/trt-hr-system/gemini_cli.mjs) ที่ผู้พัฒนาทำขึ้นมาเพื่อรันคอมมานด์ส่งไฟล์หรือโครงสร้างโฟลเดอร์ไปวิเคราะห์กับโมเดล `gemini-2.5-flash` ได้โดยตรงผ่าน Node.js

**ตัวอย่างคำสั่งการใช้งาน:**
```bash
node gemini_cli.mjs resources/js/Pages/Welcome.jsx "รีวิวโค้ดชุดนี้หน่อย"
```
*(คำแนะนำ: ควรเปลี่ยน Google Generative AI API Key ภายในไฟล์หากมีคีย์ใหม่ เพื่อความปลอดภัยและเสถียรภาพในการใช้งาน)*
