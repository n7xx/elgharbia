# جزارة الغربية (El Gharbia Butcher)

موقع جزارة ومشويات الغربية - لحوم بلدي طازة ومشويات في الإسكندرية.

## التقنيات

- Vite
- React
- Tailwind CSS
- shadcn/ui

## التشغيل محلياً

```bash
# تثبيت الحزم
npm i

# تشغيل السيرفر
npm run dev
```

## البناء

```bash
npm run build
```

## الاختبارات

```bash
npm run test
```

## الشعار و Favicon و og:image

لاستخدام شعار جزارة الغربية (البيج، الأحمر، الأزرق والنجوم) كأيقونة الموقع وصورة المشاركة:

1. احفظ صورة الشعار باسم **`public/brand-logo.png`** في المشروع.
2. شغّل: `npm run copy-favicon` (أو شغّل `npm run dev` وسيُنفَّذ تلقائياً).

سيتم استخدام الملف لـ: أيقونة التبويب (favicon) وصورة Open Graph للمشاركة (og:image).
