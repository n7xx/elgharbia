import { Phone, MessageCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";

const MENU_SECTIONS = [
  {
    title: "عروض صواني قصر الغربية",
    items: [
      { name: "صينية الغربية 3", desc: "ربع ضاني مندي + نصف كفتة + نصف كباب + نصف طرب + ممبار + محاشي + سمبوسك + أرز مندي + سلطات + شوربة مغربي", price: "3550", priceBefore: "3700" },
      { name: "صينية الصحاب", desc: "كيلو كفتة مشوية + نصف شيش طاووك + نصف طرب + فرخة مندي + نصف ممبار + كيلو محاشي + أرز بسمتي + 4 شوربة مغربي + سلطات + عيش", price: "1899", priceBefore: "2100" },
      { name: "صينية الحمام", desc: "10 حمام محشي + كيلو كفتة + محاشي + ممبار + أرز بسمتي + شوربة مغربي + عيش + سلطات", price: "2499", priceBefore: "2650" },
      { name: "صينية الكرم", desc: "جوز حمام محشي + كيلو كفتة + كوارع ورق عنب + ربع ضاني مندي + محاشي + ممبار + أرز بسمتي + شوربة مغربي + عيش + سلطات", price: "2750", priceBefore: "2900" },
      { name: "صينية البط", desc: "نصف بطة + نصف كفتة + 2 حمام + محاشي + أرز مشكل + أرز بسمتي + سلطات + عيش + شوربة مغربي", price: "1399", priceBefore: "1490" },
      { name: "صينية الغربية 1", desc: "نصف ضاني مندي + كيلو كفتة + فرخة مندي + أرز مندي + محاشي مشكل + ممبار + سلطات + شوربة مغربي", price: "1670", priceBefore: "1820" },
      { name: "صينية اللمة", desc: "كيلو ضاني مندي + 4 حمام كامل + كيلو كفتة + فرخة مندي + ممبار + محاشي + أرز مندي + سلطات + شوربة مغربي", price: "2799", priceBefore: "3100" },
      { name: "صينية التوفير", desc: "فرخة مندي + 12 قطعة كفتة + محاشي + أرز بسمتي + سلطات + 2 شوربة مغربي", price: "890" },
      { name: "صينية الوليمة", desc: "ربع عجل مندي + أرز بسمتي + محاشي + ممبار + شوربة مغربي + عيش + سلطات", price: "2150", priceBefore: "2300" },
      { name: "قصعة القصر", desc: "نصف كفتة مشوية + 9 قطع شيش طاووك + نصف سجق + نصف ممبار محشي + سمبوسك + أرز بسمتي + سلطات + عيش + شوربة مغربي", price: "1050" },
    ],
  },
  {
    title: "سفرة قصر الغربية — خصم 15%",
    items: [
      { name: "سفرة الصحاب", desc: "فرخة مندي + نصف كفتة + طاجن فريك باللحمة + 4 شوربة لسان عصفور", price: "1030", priceBefore: "1210" },
      { name: "سفرة العيلة", desc: "بطة أرز ومكسرات + كيلو مشكل (لحمة + كفتة) + نصف ضاني مندي + طاجن قنبلة الغربية + نصف تحميرة + طبق محاشي + 2 ملوخية + 2 شوربة لسان عصفور + 2 بامية سادة", price: "2690", priceBefore: "3160" },
      { name: "سفرة الملك", desc: "بطة أرز ومكسرات + 4 فرد حمام محشي + نصف طرب + نصف كفتة + نصف لحمة + نصف ضاني قندي + طاجن كوارع ورق عنب + طبق محاشي + 2 ملوخية + 2 شوربة لسان عصفور + 2 بامية سادة", price: "3155", priceBefore: "3710" },
      { name: "سفرة ألف ليلة وليلة", desc: "ربع خروف مندي 2.5ك + 4 فرد حمام محشي + كيلو كفتة + فرخة مندي + طاجن كوارع ورق عنب + طبق محاشي + 2 ملوخية + 2 شوربة لسان عصفور + 2 بامية سادة", price: "3935", priceBefore: "4630" },
    ],
  },
  {
    title: "وجبات رمضان",
    items: [
      { name: "وجبة رقم 1", desc: "ربع فرخة + سلطات + عيش + عصير", price: "95" },
      { name: "وجبة رقم 2", desc: "ربع فرخة + أرز شعرية + خضار مشكل + عصير", price: "145" },
      { name: "وجبة رقم 3", desc: "ربع فرخة + 2 قطعة كفتة + أرز شعرية + خضار مشكل + عصير", price: "170" },
      { name: "وجبة رقم 4", desc: "سيخ كفتة + أرز شعرية + خضار مشكل + عصير", price: "150" },
      { name: "وجبة رقم 5", desc: "ورقة لحمة بالخضار + أرز شعرية + عصير", price: "150" },
      { name: "وجبة رقم 6", desc: "ربع كفتة + أرز شعرية + خضار مشكل + عصير", price: "220" },
      { name: "وجبة رقم 7", desc: "سمكة بوري سنجاري + أرز صيادية + شوربة جمبري سادة + عصير", price: "180" },
    ],
  },
  {
    title: "المشويات",
    items: [
      { name: "روز بيف", price: "حسب الطلب" },
      { name: "كفتة (نص / ثلث)", price: "حسب الطلب" },
      { name: "طرب (نص / ثلث)", price: "حسب الطلب" },
      { name: "سجق", price: "حسب الطلب" },
      { name: "مشكل (لحمة + كفتة)", price: "حسب الطلب" },
      { name: "فخايد ضاني", price: "حسب الطلب" },
      { name: "ريش ضاني", price: "حسب الطلب" },
      { name: "ريش بتلو", price: "حسب الطلب" },
      { name: "كباب بتلو", price: "حسب الطلب" },
      { name: "فلتو", price: "حسب الطلب" },
      { name: "كبدة ضاني", price: "حسب الطلب" },
      { name: "موزة مشوية 600 جرام", price: "حسب الطلب" },
      { name: "شيش طاووق", price: "حسب الطلب" },
    ],
  },
  {
    title: "البدوي",
    items: [
      { name: "ضاني أرز أو مبكبكة", price: "حسب الطلب" },
      { name: "شمبري أرز أو مبكبكة", price: "حسب الطلب" },
      { name: "موزة ضاني أرز أو مبكبكة", price: "حسب الطلب" },
      { name: "موزة بتلو أرز أو مبكبكة", price: "حسب الطلب" },
      { name: "تحميرة لحمة بالبصل", price: "حسب الطلب" },
      { name: "كبدة ضاني", price: "حسب الطلب" },
      { name: "أرز حمر سادة", price: "180 / 100 / 80" },
      { name: "مكرونة مبكبكة", price: "حسب الطلب" },
    ],
  },
  {
    title: "الطواجن",
    items: [
      { name: "فريك باللحمة", price: "حسب الطلب" },
      { name: "خضار باللحمة", price: "حسب الطلب" },
      { name: "بامية باللحمة", price: "حسب الطلب" },
      { name: "لسان عصفور باللحمة", price: "حسب الطلب" },
      { name: "كباب بتلو بالبصل", price: "حسب الطلب" },
      { name: "ورقة لحمة", price: "حسب الطلب" },
      { name: "كوارع ورق عنب", price: "حسب الطلب" },
      { name: "عكاوي ورق عنب", price: "حسب الطلب" },
      { name: "فتة كوارع", price: "حسب الطلب" },
      { name: "موزة ضاني فتة", price: "حسب الطلب" },
      { name: "طاجن قنبلة الغربية (جديد)", desc: "ممبار + مخاصي + كوارع + عكاوي + ورق عنب", price: "حسب الطلب" },
    ],
  },
  {
    title: "أطباق الشرقي",
    items: [
      { name: "ممبار", price: "حسب الطلب" },
      { name: "ورق عنب", price: "حسب الطلب" },
      { name: "محاشي مشكل", price: "حسب الطلب" },
      { name: "سمبوسك لحمة", price: "حسب الطلب" },
      { name: "سمبوسك جبنة", price: "حسب الطلب" },
      { name: "مكرونة بشاميل", price: "حسب الطلب" },
      { name: "أرز معمر باللحمة", price: "حسب الطلب" },
      { name: "أرز شعرية", price: "حسب الطلب" },
      { name: "أرز خلطة بالمكسرات", price: "حسب الطلب" },
      { name: "فتة سادة", price: "حسب الطلب" },
      { name: "بطاطس بوم فريت", price: "حسب الطلب" },
      { name: "بانية", price: "حسب الطلب" },
      { name: "طبق اليوم", price: "حسب الطلب" },
    ],
  },
  {
    title: "التركي",
    items: [
      { name: "موزة ضاني أرز أو فريك", price: "حسب الطلب" },
      { name: "موزة بتلو أرز أو فريك", price: "حسب الطلب" },
      { name: "فرد حمام أرز أو فريك تركي", price: "حسب الطلب" },
      { name: "ممبار بالكوارع تركي", price: "حسب الطلب" },
      { name: "كرنب بالكوارع تركي", price: "حسب الطلب" },
      { name: "ورق عنب تركي", price: "حسب الطلب" },
      { name: "محاشي مشكل تركي", price: "حسب الطلب" },
      { name: "نصف شمبري تركي أرز أو فريك", price: "حسب الطلب" },
      { name: "نصف ضاني تركي أرز أو فريك", price: "حسب الطلب" },
      { name: "نصف ريش تركي", price: "حسب الطلب" },
      { name: "جوز حمام بالكوارع", price: "حسب الطلب" },
    ],
  },
  {
    title: "المندي",
    items: [
      { name: "ضاني مندي أرز (نص / ثلث / كاملة)", price: "حسب الطلب" },
      { name: "شمبري مندي أرز", price: "حسب الطلب" },
      { name: "موزة ضاني مندي", price: "حسب الطلب" },
      { name: "أرز بسمتي سادة", price: "حسب الطلب" },
      { name: "فرخة مندي بالأرز (نص / ثلث / كاملة)", price: "حسب الطلب" },
    ],
  },
  {
    title: "الطيور",
    items: [
      { name: "ديك بلدي أرز أو مكرونة", price: "حسب الطلب" },
      { name: "بطة بالأرز والمكسرات 3ك", price: "حسب الطلب" },
      { name: "نصف بطة أرز ومكسرات", price: "حسب الطلب" },
      { name: "جوز حمام أرز أو فريك", price: "حسب الطلب" },
      { name: "فرد حمام أرز أو فريك", price: "حسب الطلب" },
      { name: "فرخة مشوية", price: "حسب الطلب" },
      { name: "فرخة شيش", price: "حسب الطلب" },
    ],
  },
  {
    title: "الخضار والشوربة",
    items: [
      { name: "ملوخية خضراء", price: "حسب الطلب" },
      { name: "بامية", price: "حسب الطلب" },
      { name: "خضار مشكل", price: "حسب الطلب" },
      { name: "شوربة مغربي", price: "حسب الطلب" },
      { name: "شوربة كريمة", price: "حسب الطلب" },
      { name: "شوربة لسان عصفور", price: "حسب الطلب" },
      { name: "شوربة خضار سوتية", price: "حسب الطلب" },
      { name: "شوربة كوارع سادة", price: "حسب الطلب" },
      { name: "شوربة كوارع بالكوارع", price: "حسب الطلب" },
      { name: "شوربة حمام بالحمام", price: "حسب الطلب" },
    ],
  },
  {
    title: "الأسماك والمأكولات البحرية",
    items: [
      { name: "جمبري، بلح البحر، بوري، وقار", price: "حسب الطلب" },
      { name: "أرز سي فود، شوربة سي فود", price: "حسب الطلب" },
      { name: "سبيط، بيض سبيط، دنيس، مياس", price: "حسب الطلب" },
      { name: "مكرونة سي فود، شوربة جمبري", price: "حسب الطلب" },
      { name: "كابوريا، جندوفلي، موسى، قاروس", price: "حسب الطلب" },
      { name: "أرز صيادية، شوربة سمك", price: "حسب الطلب" },
      { name: "استاكوزا، فيليه، مرجان، رنجة", price: "حسب الطلب" },
      { name: "طاجن فياجرا، ملوخية جمبري", price: "حسب الطلب" },
    ],
  },
  {
    title: "الوجبات",
    items: [
      { name: "وجبة ميكس مشاوي (جديد)", desc: "شريحة لحم + 3 ق كفتة + 3 ق شيش طاووك + طرب + أرز بسمتي + شوربة مغربي", price: "حسب الطلب" },
      { name: "وجبة الحمام (جديد)", desc: "فرد حمام + 3 ق كفتة + 2 ق لحم كباب حلة + أرز خلطة + شوربة مغربي", price: "حسب الطلب" },
      { name: "وجبة شرقي (جديد)", desc: "ورقة لحمة + أرز شعرية + شوربة لسان عصفور", price: "حسب الطلب" },
      { name: "وجبة الفتة (جديد)", desc: "ثلث ضاني فتة + شوربة كوارع بالكوارع + 3 ق ممبار", price: "حسب الطلب" },
    ],
  },
  {
    title: "المشروبات الباردة",
    items: [
      { name: "صن شاين", price: "45" },
      { name: "موهيتو (ماراكويا / بلوبيري / رمان / نعناع)", price: "45" },
      { name: "بلو سكاي (كرواسون / إسبريسو / ليمون)", price: "60" },
      { name: "أورانج بيري (إسبريسو / بلوبيري / برتقال)", price: "حسب الطلب" },
      { name: "علب، بيبسي، ريد بول", price: "25–65" },
      { name: "مياه معدنية صغيرة", price: "15" },
      { name: "آيس كوفي، آيس شوكولاتة، أوريو", price: "45–60" },
      { name: "ميلك شيك، عصير طازج، سموذي", price: "45–55" },
      { name: "كوكتيل قصر الغربية", price: "65" },
      { name: "عصير مانجو، عصير ليمون نعناع، عصير طازج (زجاجة)", price: "45–90" },
    ],
  },
  {
    title: "المشروبات الساخنة",
    items: [
      { name: "شاي كلاسيك", price: "20" },
      { name: "شاي أخضر، شاي زردة، أعشاب", price: "25–30" },
      { name: "سيدر ساخن، شوكولاتة ساخنة", price: "40–60" },
      { name: "أمريكانو", price: "60" },
      { name: "إسبريسو / دبل، كابتشينو، ماكياتو", price: "40–60" },
      { name: "نسكافيه، قهوة تركية / دبل", price: "50" },
      { name: "قهوة فرنسية، قهوة (بندق / نوتيلا)", price: "50–60" },
      { name: "لاتيه (بندق / كراميل / فانيلا / قرفة / شوكولاتة / نوتيلا)", price: "50–60" },
    ],
  },
  {
    title: "الحلويات والفاكهة",
    items: [
      { name: "أرز بالحليب، كاسترد، بودنغ فرن", price: "35" },
      { name: "جيلي، أم علي", price: "35–65" },
      { name: "آيس كريم 3 سكوب", price: "75" },
      { name: "طبق فاكهة وسط / كبير، سلطة فاكهة", price: "35" },
      { name: "كنافة نابلسية بالفحم (مقادير مختلفة)", price: "35–140" },
    ],
  },
];

const CONTACT_NUMBERS = [
  { label: "للحجز والاستعلام", numbers: ["01207188881", "01207188882", "01205558230"], tel: true },
  { label: "طلبات تيك أواي", numbers: ["01281321166"], whatsapp: true },
  { label: "حفلات ومناسبات", numbers: ["01281321166"], whatsapp: true },
];

const Menu = () => {
  return (
    <Layout>
      <section className="bg-gradient-hero py-10 lg:py-14">
        <div className="container-rtl text-center text-primary-foreground">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3">منيو قصر الغربية</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            للمأكولات البدوية والمشويات والأسماك
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-rtl max-w-4xl">
          {MENU_SECTIONS.map((section) => (
            <div key={section.title} className="mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-2 border-primary">
                {section.title}
              </h2>
              <ul className="space-y-4">
                {section.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3 border-b border-border last:border-0"
                  >
                    <div>
                      <span className="font-medium text-foreground">{item.name}</span>
                      {item.desc && (
                        <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {item.priceBefore && (
                        <span className="text-sm text-muted-foreground line-through">
                          {item.priceBefore} ج.م
                        </span>
                      )}
                      <span className="font-bold text-primary">
                        {item.price}
                        {typeof item.price === "string" && !item.price.includes("حسب") && !item.price.includes("–") ? " ج.م" : ""}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="mt-12 bg-card rounded-2xl p-6 shadow-card">
            <h2 className="text-xl font-bold text-foreground mb-4">للحجز والاستعلام</h2>
            <div className="space-y-4">
              {CONTACT_NUMBERS.map((block) => (
                <div key={block.label}>
                  <p className="text-sm font-medium text-muted-foreground mb-2">{block.label}:</p>
                  <div className="flex flex-wrap gap-3">
                    {block.numbers.map((num) => (
                      <a
                        key={num}
                        href={block.whatsapp ? `https://wa.me/20${num.replace(/^0/, "")}` : `tel:${num}`}
                        target={block.whatsapp ? "_blank" : undefined}
                        rel={block.whatsapp ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors"
                      >
                        {block.whatsapp ? (
                          <MessageCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Phone className="w-4 h-4" />
                        )}
                        {num}
                        {block.whatsapp && <span className="text-xs text-muted-foreground">(واتساب)</span>}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Menu;
