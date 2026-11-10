# NovaMed — Sağlık Turizmi Klinik Web Sitesi (Demo)

Uluslararası sağlık turizmi odaklı bir klinik için demo web sitesi. Tüm içerik **mock veri**, görseller **Unsplash stok fotoğrafları**dır.

## Özellikler
- **Çoklu dil:** Türkçe, İngilizce, Arapça (tam RTL desteği). `?lang=ar` ile doğrudan açılabilir, seçim tarayıcıda hatırlanır.
- **WhatsApp:** Sabit sohbet butonu + her tedavi kartında tedaviye özel, dile göre hazır mesajlı "Fiyat Al" butonu.
- **Randevu / iletişim formu:** Doğrulama, KVKK onayı, başarı penceresi ve WhatsApp'ta devam etme. Hero alanında hızlı teklif formu.
- **Dönüşüm odaklı bölümler:** İstatistikler, tedaviler (fiyat, kalış süresi), 5 adımlı süreç, her şey dahil paketler, doktorlar, hasta yorumları, akreditasyonlar, SSS.
- **Tasarım:** Editoryal tipografi (Instrument Serif + Manrope, Arapça için IBM Plex Sans Arabic), kâğıt / koyu yeşil / lime paleti, bento tedavi ızgarası, kaydırınca beliren animasyonlar.
- **İkonlar:** [Lucide](https://lucide.dev) (v0.460, ISC). `js/icons.js` içine gömülü SVG sprite olarak — CDN gerekmez. Sadece WhatsApp butonlarında marka logosu kullanılır.
- **Responsive:** Masaüstü, tablet ve mobil. Mobilde tam ekran menü ve alt sabit eylem çubuğu (Ara / WhatsApp / Teklif).
- Build adımı yok (saf HTML/CSS/JS).

## Çalıştırma
```bash
npx serve .        # veya: python3 -m http.server
```
Ya da `index.html` dosyasını doğrudan tarayıcıda açın. GitHub Pages / Netlify / Vercel'e olduğu gibi yüklenebilir.

## Yapı
| Dosya | İçerik |
|---|---|
| `index.html` | Sayfa iskeleti |
| `css/style.css` | Tasarım (RTL için logical CSS özellikleri) |
| `js/icons.js` | Lucide ikon sprite'ı |
| `js/data.js` | Mock veri: tedaviler, paketler, doktorlar, yorumlar, SSS, iletişim |
| `js/i18n.js` | TR / EN / AR arayüz metinleri |
| `js/app.js` | Render, dil değiştirme, formlar, WhatsApp linkleri |

WhatsApp numarası ve iletişim bilgileri `js/data.js` içindeki `CLINIC` nesnesinden değiştirilir. Form gönderimleri demo amaçlı tarayıcının `localStorage`'ına (`demoLeads`) kaydedilir; gerçek kullanımda bir API / e-posta servisine bağlanmalıdır.

> Not: Klinik adı, doktorlar, yorumlar, fiyatlar ve akreditasyonlar örnek amaçlıdır.
