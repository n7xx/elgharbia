import meatSlices from "@/assets/meat-slices.jpg";
import kabab from "@/assets/kabab-420.jpg";
import ketf from "@/assets/ketf-350.jpg";
import sogo2 from "@/assets/sogo2-330.jpg";
import meatKhodar from "@/assets/meat-khodar-380.jpg";
import meat380 from "@/assets/meat-380.jpg";
import beefsteak from "@/assets/beefsteak-420.jpg";
import meat from "@/assets/meat-380.jpg";
import meatTray from "@/assets/meat-tray.jpg";
import sausages from "@/assets/sausages.jpg";
import grilledMeat from "@/assets/grilled-meat.jpg";
import marinatedMeat from "@/assets/marinated-meat.jpg";

export const categories = [
  { id: "cat-1", name: "لحوم بلدي", description: "أجود أنواع اللحوم البلدي الطازة", sort_order: 0 },
  { id: "cat-2", name: "لحوم ضاني", description: "لحم ضاني طازة بجودة ممتازة", sort_order: 1 },
  { id: "cat-3", name: "المشويات", description: "مشويات طازة محضرة بعناية", sort_order: 2 },
  { id: "cat-4", name: "الطواجن", description: "طواجن جاهزة للطبخ", sort_order: 3 },
  { id: "cat-5", name: "الوجبات", description: "وجبات جاهزة ولذيذة", sort_order: 4 },
  { id: "cat-6", name: "الحلويات والأحشاء", description: "أحشاء وحلويات طازة", sort_order: 5 },
];

export const products = [
  { id: "p-1", name: "لحم مليس", description: "لحم بلدي طازة بدون عظم - مناسب للطبخ والشوي", price: 380, unit: "كيلو", image_url: meatSlices, category_id: "cat-1", is_available: true, is_offer: false, offer_badge: null, sort_order: 0 },
  { id: "p-2", name: "كباب حلة", description: "قطع كباب مميزة للطبخ في الحلة", price: 420, unit: "كيلو", image_url: kabab, category_id: "cat-1", is_available: true, is_offer: true, offer_badge: "الأكثر طلبًا", sort_order: 1 },
  { id: "p-3", name: "كتف", description: "لحم كتف طازة - مناسب للشوي والطبخ", price: 350, unit: "كيلو", image_url: ketf, category_id: "cat-1", is_available: true, is_offer: false, offer_badge: null, sort_order: 2 },
  { id: "p-4", name: "لحمة خضار", description: "لحم بلدي طازة مقطع خصيصًا للخضار", price: 380, unit: "كيلو", image_url: meatKhodar, category_id: "cat-1", is_available: true, is_offer: true, offer_badge: "عرض مميز", sort_order: 3 },
  { id: "p-5", name: "لحمة مليس ممتازة", description: "لحم بلدي بدون عظم - قطع ممتازة", price: 380, unit: "كيلو", image_url: meat380, category_id: "cat-1", is_available: true, is_offer: false, offer_badge: null, sort_order: 4 },
  { id: "p-6", name: "لحم ضاني", description: "لحم ضاني طازة بجودة عالية", price: 450, unit: "كيلو", image_url: meat, category_id: "cat-2", is_available: true, is_offer: false, offer_badge: null, sort_order: 0 },
  { id: "p-7", name: "ريش ضاني", description: "ريش ضاني مقطعة ومجهزة للشوي", price: 480, unit: "كيلو", image_url: meatTray, category_id: "cat-2", is_available: true, is_offer: true, offer_badge: "جودة ممتازة", sort_order: 1 },
  { id: "p-8", name: "كباب مشوي", description: "كباب مشوي على الفحم بتتبيلة مميزة", price: 450, unit: "كيلو", image_url: grilledMeat, category_id: "cat-3", is_available: true, is_offer: false, offer_badge: null, sort_order: 0 },
  { id: "p-9", name: "كفتة مشوية", description: "كفتة مشوية بالبهارات على الفحم", price: 400, unit: "كيلو", image_url: marinatedMeat, category_id: "cat-3", is_available: true, is_offer: false, offer_badge: null, sort_order: 1 },
  { id: "p-10", name: "طاجن لحمة بالخضار", description: "طاجن لحمة بلدي بالخضار الطازة جاهز للفرن", price: 350, unit: "طاجن", image_url: meatKhodar, category_id: "cat-4", is_available: true, is_offer: false, offer_badge: null, sort_order: 0 },
  { id: "p-11", name: "وجبة مشويات مشكلة", description: "تشكيلة مشويات متنوعة مع الأرز والسلطة", price: 250, unit: "وجبة", image_url: grilledMeat, category_id: "cat-5", is_available: true, is_offer: true, offer_badge: "عرض خاص", sort_order: 0 },
  { id: "p-12", name: "سجق بلدي", description: "سجق بلدي طازة بالبهارات المميزة", price: 330, unit: "كيلو", image_url: sogo2, category_id: "cat-6", is_available: true, is_offer: false, offer_badge: null, sort_order: 0 },
  { id: "p-13", name: "سجق اسكندراني", description: "سجق اسكندراني بالتوابل الخاصة", price: 350, unit: "كيلو", image_url: sausages, category_id: "cat-6", is_available: true, is_offer: false, offer_badge: null, sort_order: 1 },
  { id: "p-14", name: "بفتيك", description: "شرائح بفتيك مميزة بجودة عالية", price: 420, unit: "كيلو", image_url: beefsteak, category_id: "cat-1", is_available: true, is_offer: true, offer_badge: "جودة ممتازة", sort_order: 5 },
];
