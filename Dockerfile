# 1. ใช้ภาพพื้นหลังเป็น PHP 8.2 แบบ FPM (เหมือนเดิม)
FROM php:8.4-fpm

# 2. ตั้งค่าโฟลเดอร์ทำงานหลักในตู้คอนเทนเนอร์ (เหมือนเดิม)
WORKDIR /var/www

# 3. ติดตั้งเครื่องมือพื้นฐาน และลากคำสั่งติดตั้ง Node.js มาต้มรวมไว้ในข้อนี้ให้จบทีเดียวเลยครับ
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libzip-dev \
    libonig-dev \
    && curl -sL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# 🧹 4. เคลียร์ไฟล์ขยะของระบบ (สลับลงมาทำตรงนี้เพื่อให้ติดตั้ง Node.js ข้างบนเสร็จก่อน)
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# ⚙️ 5. ติดตั้ง PHP Extensions (เหมือนเดิม คราวนี้จะเจอ libonig-dev ชัวร์ๆ แล้ว)
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --with-freetype --with-jpeg
RUN docker-php-ext-install gd

# 📦 6. คัดลอกเครื่องมืออัปเกรด Composer (เหมือนเดิม)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 7. เปิดพอร์ต 9000 (เหมือนเดิม)
EXPOSE 9000
CMD ["php-fpm"]