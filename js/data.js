/* Demo / mock veri. Gerçek projede CMS veya API'den gelecek. */
const IMG = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

window.CLINIC = {
  name: "NovaMed",
  phone: "+90 212 555 00 00",
  whatsapp: "905550000000",
  email: "info@novamed-demo.com",
  address: {
    tr: "Teşvikiye Mah. Vali Konağı Cad. No:12, Şişli / İstanbul",
    en: "Tesvikiye, Vali Konagi St. No:12, Sisli / Istanbul, Türkiye",
    ar: "تشفيكيه، شارع والي كوناغي رقم 12، شيشلي / إسطنبول، تركيا",
  },
};

window.HERO_IMG = IMG("photo-1519494026892-80bbd2d6fd0d", 1800);
window.ABOUT_IMG = IMG("photo-1586773860418-d37222d8fce3", 1200);

window.TREATMENTS = [
  {
    id: "hair",
    icon: "💇",
    img: IMG("photo-1560066984-138dadb4c035"),
    price: 1890,
    days: 3,
    stay: 0,
    name: { tr: "Saç Ekimi (FUE / DHI)", en: "Hair Transplant (FUE / DHI)", ar: "زراعة الشعر (FUE / DHI)" },
    desc: {
      tr: "Safir uçlu FUE ve DHI teknikleriyle doğal saç çizgisi, 4.000+ greft.",
      en: "Sapphire FUE & DHI techniques for a natural hairline, 4,000+ grafts.",
      ar: "تقنيات FUE بالياقوت و DHI لخط شعر طبيعي، أكثر من 4000 بصيلة.",
    },
  },
  {
    id: "dental",
    icon: "🦷",
    img: IMG("photo-1606811971618-4486d14f3f99"),
    price: 2450,
    days: 7,
    stay: 0,
    name: { tr: "Diş Estetiği & İmplant", en: "Dental Veneers & Implants", ar: "تجميل الأسنان والزراعة" },
    desc: {
      tr: "Hollywood Smile, zirkonyum kaplama ve tek seansta implant çözümleri.",
      en: "Hollywood Smile, zirconia crowns and same-day implant solutions.",
      ar: "ابتسامة هوليوود، تيجان الزركونيا وزراعة الأسنان في نفس اليوم.",
    },
  },
  {
    id: "rhino",
    icon: "👃",
    img: IMG("photo-1579684385127-1ef15d508118"),
    price: 3200,
    days: 7,
    stay: 1,
    name: { tr: "Burun Estetiği (Rinoplasti)", en: "Rhinoplasty", ar: "تجميل الأنف" },
    desc: {
      tr: "Piezo cerrahi ile daha az ödem, daha hızlı iyileşme.",
      en: "Piezo surgery for less swelling and faster recovery.",
      ar: "جراحة بيزو لتورم أقل وتعافٍ أسرع.",
    },
  },
  {
    id: "eye",
    icon: "👁️",
    img: IMG("photo-1551076805-e1869033e561"),
    price: 1450,
    days: 3,
    stay: 0,
    name: { tr: "Lazer Göz (SMILE / LASIK)", en: "Laser Eye Surgery (SMILE / LASIK)", ar: "تصحيح النظر بالليزر" },
    desc: {
      tr: "Bıçaksız SMILE Pro ile 10 dakikada gözlüksüz yaşam.",
      en: "Bladeless SMILE Pro — glasses-free life in 10 minutes.",
      ar: "تقنية SMILE Pro بدون شفرات — حياة بلا نظارات في 10 دقائق.",
    },
  },
  {
    id: "bariatric",
    icon: "⚖️",
    img: IMG("photo-1576091160550-2173dba999ef"),
    price: 4900,
    days: 5,
    stay: 3,
    name: { tr: "Obezite Cerrahisi", en: "Bariatric Surgery", ar: "جراحة السمنة" },
    desc: {
      tr: "Tüp mide ve gastrik bypass; diyetisyen takibi dahil.",
      en: "Gastric sleeve & bypass, dietitian follow-up included.",
      ar: "تكميم المعدة وتحويل المسار مع متابعة أخصائي التغذية.",
    },
  },
  {
    id: "aesthetic",
    icon: "✨",
    img: IMG("photo-1570172619644-dfd03ed5d881"),
    price: 3800,
    days: 7,
    stay: 1,
    name: { tr: "Vücut Estetiği", en: "Body Aesthetics", ar: "تجميل الجسم" },
    desc: {
      tr: "Liposuction, karın germe ve meme estetiği (mommy makeover).",
      en: "Liposuction, tummy tuck and breast surgery (mommy makeover).",
      ar: "شفط الدهون، شد البطن وتجميل الثدي.",
    },
  },
];

window.PACKAGES = [
  {
    id: "basic",
    price: 1890,
    name: { tr: "Temel", en: "Essential", ar: "الأساسية" },
    items: {
      tr: ["Tedavi & ilaçlar", "Havalimanı transferi", "2 gece 4★ otel", "Tercüman desteği"],
      en: ["Treatment & medication", "Airport transfer", "2 nights 4★ hotel", "Interpreter"],
      ar: ["العلاج والأدوية", "النقل من المطار", "ليلتان فندق 4 نجوم", "مترجم"],
    },
  },
  {
    id: "vip",
    price: 2690,
    featured: true,
    name: { tr: "VIP", en: "VIP", ar: "VIP" },
    items: {
      tr: ["Temel paketteki her şey", "4 gece 5★ otel", "VIP araç & şoför", "Kişisel hasta koordinatörü", "1 yıl online kontrol"],
      en: ["Everything in Essential", "4 nights 5★ hotel", "VIP car & driver", "Personal patient coordinator", "1-year online follow-up"],
      ar: ["كل ما في الباقة الأساسية", "4 ليالٍ فندق 5 نجوم", "سيارة VIP مع سائق", "منسق مريض شخصي", "متابعة أونلاين لمدة سنة"],
    },
  },
  {
    id: "premium",
    price: 3990,
    name: { tr: "Premium + Refakatçi", en: "Premium + Companion", ar: "بريميوم + مرافق" },
    items: {
      tr: ["VIP paketteki her şey", "Refakatçi konaklaması", "İstanbul şehir turu", "Boğaz turu", "Ömür boyu garanti belgesi"],
      en: ["Everything in VIP", "Companion accommodation", "Istanbul city tour", "Bosphorus cruise", "Lifetime guarantee certificate"],
      ar: ["كل ما في باقة VIP", "إقامة المرافق", "جولة في إسطنبول", "رحلة البوسفور", "شهادة ضمان مدى الحياة"],
    },
  },
];

window.DOCTORS = [
  {
    img: IMG("photo-1612349317150-e413f6a5b16d", 600),
    name: "Op. Dr. Ahmet Yılmaz",
    exp: 18,
    title: { tr: "Plastik & Estetik Cerrahi", en: "Plastic & Aesthetic Surgery", ar: "الجراحة التجميلية" },
  },
  {
    img: IMG("photo-1559839734-2b71ea197ec2", 600),
    name: "Dr. Elif Kaya",
    exp: 12,
    title: { tr: "Saç Ekimi & Dermatoloji", en: "Hair Restoration & Dermatology", ar: "زراعة الشعر والجلدية" },
  },
  {
    img: IMG("photo-1622253692010-333f2da6031d", 600),
    name: "Dt. Mehmet Öz",
    exp: 15,
    title: { tr: "Estetik Diş Hekimliği", en: "Cosmetic Dentistry", ar: "طب الأسنان التجميلي" },
  },
  {
    img: IMG("photo-1594824476967-48c8b964273f", 600),
    name: "Prof. Dr. Zeynep Arslan",
    exp: 22,
    title: { tr: "Göz Hastalıkları", en: "Ophthalmology", ar: "طب العيون" },
  },
];

window.TESTIMONIALS = [
  {
    name: "James W.",
    flag: "🇬🇧",
    treatment: "hair",
    rating: 5,
    text: {
      tr: "Havalimanından otele kadar her şey kusursuzdu. 6. ayda sonuçlar inanılmaz!",
      en: "Everything from the airport to the hotel was flawless. Results at month 6 are incredible!",
      ar: "كل شيء من المطار إلى الفندق كان مثالياً. النتائج في الشهر السادس مذهلة!",
    },
  },
  {
    name: "Fatima A.",
    flag: "🇸🇦",
    treatment: "dental",
    rating: 5,
    text: {
      tr: "Arapça konuşan koordinatörüm sayesinde kendimi evimde hissettim. Gülüşüme bayılıyorum.",
      en: "Thanks to my Arabic-speaking coordinator I felt at home. I love my new smile.",
      ar: "بفضل منسقتي الناطقة بالعربية شعرت وكأنني في بيتي. أحب ابتسامتي الجديدة.",
    },
  },
  {
    name: "Lukas M.",
    flag: "🇩🇪",
    treatment: "eye",
    rating: 5,
    text: {
      tr: "Sabah ameliyat, öğleden sonra Boğaz turu. Gözlüklerimi İstanbul'da bıraktım.",
      en: "Surgery in the morning, Bosphorus cruise in the afternoon. I left my glasses in Istanbul.",
      ar: "عملية في الصباح ورحلة البوسفور بعد الظهر. تركت نظارتي في إسطنبول.",
    },
  },
  {
    name: "Omar K.",
    flag: "🇦🇪",
    treatment: "bariatric",
    rating: 5,
    text: {
      tr: "1 yılda 42 kilo verdim. Diyetisyen takibi her şeyi değiştirdi.",
      en: "Lost 42 kg in one year. The dietitian follow-up made all the difference.",
      ar: "فقدت 42 كيلوغراماً في سنة. متابعة أخصائي التغذية صنعت الفارق.",
    },
  },
];

window.FAQ = [
  {
    q: { tr: "Fiyatlara neler dahil?", en: "What is included in the price?", ar: "ماذا يشمل السعر؟" },
    a: {
      tr: "Tedavi, ilaçlar, havalimanı–otel–klinik transferleri, konaklama ve tercüman hizmeti paket fiyatına dahildir.",
      en: "Treatment, medication, airport–hotel–clinic transfers, accommodation and interpreter services are included.",
      ar: "يشمل السعر العلاج والأدوية والتنقلات بين المطار والفندق والعيادة والإقامة وخدمة الترجمة.",
    },
  },
  {
    q: { tr: "Ön görüşme ücretli mi?", en: "Is the initial consultation free?", ar: "هل الاستشارة الأولى مجانية؟" },
    a: {
      tr: "Hayır. Fotoğraflarınızı WhatsApp'tan gönderin, doktorlarımız 24 saat içinde ücretsiz tedavi planı hazırlasın.",
      en: "Yes. Send your photos via WhatsApp and our doctors will prepare a free treatment plan within 24 hours.",
      ar: "نعم. أرسل صورك عبر واتساب وسيعد أطباؤنا خطة علاج مجانية خلال 24 ساعة.",
    },
  },
  {
    q: { tr: "Ne kadar süre Türkiye'de kalmalıyım?", en: "How long do I need to stay in Türkiye?", ar: "كم يجب أن أبقى في تركيا؟" },
    a: {
      tr: "Tedaviye göre 3–7 gün arası. Her tedavi kartında önerilen süreyi görebilirsiniz.",
      en: "Between 3–7 days depending on the treatment. Each treatment card shows the recommended stay.",
      ar: "بين 3 و7 أيام حسب العلاج. تظهر المدة الموصى بها على بطاقة كل علاج.",
    },
  },
  {
    q: { tr: "Komplikasyon durumunda ne olur?", en: "What happens if there are complications?", ar: "ماذا يحدث في حال حدوث مضاعفات؟" },
    a: {
      tr: "Tüm işlemler yazılı garanti kapsamındadır ve uluslararası hasta sigortası sunuyoruz.",
      en: "All procedures come with a written guarantee and we offer international patient insurance.",
      ar: "جميع الإجراءات مشمولة بضمان مكتوب ونقدم تأميناً دولياً للمرضى.",
    },
  },
];
