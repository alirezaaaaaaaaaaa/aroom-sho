import { useState } from "react";

const DB = {
  meta: {
    name: "Aroom Sho",
    tagline: "عطاری هوشمند — ترکیب گیاهان مناسب شما",
    year: 2025,
  },
  suggestions: {
    "استرس": {
      mix: "بابونه · به‌لیمو · اسطوخودوس",
      info: "این ترکیب آرام‌بخش با کاهش تنش عصبی به بهبود خواب و کاهش اضطراب کمک می‌کند.",
      warning: "در صورت مصرف داروهای آرام‌بخش یا بنزودیازپین‌ها با پزشک مشورت کنید.",
    },
    "بی‌خوابی": {
      mix: "سنبل‌الطیب · گل گاوزبان · لیمو عمانی",
      info: "این ترکیب به کیفیت و شروع خواب کمک می‌کند.",
      warning: "از مصرف همزمان با داروهای خواب‌آور خودداری کنید؛ در بارداری با پزشک مشورت شود.",
    },
    "معده‌درد": {
      mix: "نعناع · زنجبیل · رازیانه",
      info: "به هضم کمک و نفخ را کاهش می‌دهد.",
      warning: "افراد مبتلا به رفلاکس یا زخم معده احتیاط کنند.",
    },
    "سرماخوردگی": {
      mix: "زنجبیل · دارچین · عسل · آب‌لیمو",
      info: "تقویت سیستم ایمنی و باز کردن مجاری تنفسی.",
      warning: "برای کودکان زیر ۲ سال از عسل استفاده نشود.",
    },
    "تمرکز": {
      mix: "رزماری · جینسینگ · چای سبز",
      info: "افزایش تمرکز و انرژی ذهنی.",
      warning: "در فشارخون یا بیماری قلبی با احتیاط مصرف شود.",
    },
  },
  commonKeywords: [
    "استرس","بی‌خوابی","معده","سرماخوردگی","تمرکز","انرژی","خستگی","سردرد"
  ]
};

// ساده‌سازیِ نگاشت ورودی به کلیدهای پیشنهادی (فازیِ خیلی سبک)
function mapInputToKey(text) {
  if (!text) return null;
  const q = text.normalize("NFKC").toLowerCase();
  if (q.includes("خواب") || q.includes("بی‌خوابی")) return "بی‌خوابی";
  if (q.includes("استرس") || q.includes("اضطراب")) return "استرس";
  if (q.includes("معده") || q.includes("نفخ") || q.includes("درد معده")) return "معده‌درد";
  if (q.includes("سرما") || q.includes("گرفتگی") || q.includes("سینوس")) return "سرماخوردگی";
  if (q.includes("تمرکز") || q.includes("حواس") || q.includes("حافظه")) return "تمرکز";
  if (q.includes("خستگی") || q.includes("انرژی")) return "تمرکز";
  if (q.includes("سردرد")) return "استرس";
  // fallback: try exact match among commonKeywords
  for (const k of DB.commonKeywords) if (q.includes(k)) return k === "خستگی" ? "تمرکز" : k;
  return null;
}

function Pill({ children }) {
  return (
    <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-medium px-3 py-1 rounded-full mr-2 mb-2">
      {children}
    </span>
  );
}

export default function App() {
  const [input, setInput] = useState("");
  const [selectedKey, setSelectedKey] = useState(null);
  const [result, setResult] = useState(null);
  const [showAbout, setShowAbout] = useState(false);

  function handleSuggest() {
    const key = selectedKey || mapInputToKey(input);
    if (!key) {
      setResult({
        mix: "در حال حاضر داده‌ای برای این مورد نداریم.",
        info: "نسخهٔ MVP فقط حالات رایج را پوشش می‌دهد. می‌توانید کلیدواژه‌هایی مثل «استرس» یا «بی‌خوابی» را امتحان کنید.",
        warning: ""
      });
      return;
    }
    const res = DB.suggestions[key] || {
      mix: "در حال حاضر داده‌ای برای این مورد نداریم.",
      info: "در نسخهٔ پیشرفته مدل پیشنهادات اختصاصی تولید می‌شود.",
      warning: ""
    };
    setResult({ key, ...res });
  }

  function quickPick(k) {
    setSelectedKey(k);
    setInput(k);
    setResult(null);
  }

  function clearAll() {
    setInput("");
    setSelectedKey(null);
    setResult(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 font-sans">
      {/* Header */}
      <header className="max-w-4xl mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-emerald-700 flex items-center justify-center text-white text-xl font-bold shadow">
            🌿
          </div>
          <div className="text-right">
            <div className="font-extrabold text-lg text-emerald-800">{DB.meta.name}</div>
            <div className="text-xs text-gray-600 -mt-0.5">{DB.meta.tagline}</div>
          </div>
        </div>

        <nav className="text-sm text-gray-600">
          <button onClick={() => setShowAbout(true)} className="px-3 py-1 hover:text-emerald-700">درباره</button>
          <a className="px-3 py-1 hover:text-emerald-700" href="mailto:hello@aroomsho.example">تماس</a>
        </nav>
      </header>

      {/* Hero */}
      <main className="max-w-4xl mx-auto mt-6">
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-right">
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-3">آرامشِ درون، با ترکیبِ درستِ طبیعت</h1>
            <p className="text-gray-600 mb-4">
              Aroom Sho دستیار هوشمند عطاری است که با ورودیِ سادهٔ شما، ترکیب گیاهان دارویی مناسب را پیشنهاد می‌دهد — امن و قابل‌اعتماد.
            </p>

            <div className="mb-3 text-right">
              <label className="block mb-2 text-sm font-medium text-gray-700">حالت یا مشکل خود را بنویسید</label>
              <input
                dir="rtl"
                value={input}
                onChange={(e) => { setInput(e.target.value); setSelectedKey(null); setResult(null); }}
                placeholder="مثلاً: استرس، خوابم نمی‌برد، معده‌درد..."
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button onClick={handleSuggest} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-semibold">دریافت پیشنهاد</button>
              <button onClick={clearAll} className="px-4 py-2 border rounded-lg text-emerald-700">پاک کردن</button>
            </div>

            <div className="mt-5 text-right">
              <div className="text-xs text-gray-500 mb-1"><strong>کلیدواژه‌های پیشنهادی:</strong></div>
              <div className="flex flex-wrap justify-end">
                {DB.commonKeywords.map((k) => (
                  <button key={k} onClick={() => quickPick(k)} className="mr-2 mb-2">
                    <Pill>{k}</Pill>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — visual + quick info */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-sm">
              <img alt="herbal" src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8e2b5f1f3a8b9a6a87f1b1db3d7b7b8c" className="rounded-xl shadow-md w-full h-48 object-cover mb-4" />
              <div className="text-right">
                <h3 className="font-semibold text-emerald-700">چگونه کار می‌کنیم</h3>
                <p className="text-gray-600 text-sm mt-2">ما برای MVP ترکیبات پایه‌ای را با قواعد ایمنی ساده نمایش می‌دهیم. در نسخهٔ بعدی قصد داریم منابع علمی و لایهٔ بررسی انسانی اضافه کنیم.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Result Card */}
        {result && (
          <section className="mt-6 text-right">
            <div className="bg-white rounded-2xl shadow p-5 border border-emerald-50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-2xl font-bold text-emerald-700">پیشنهاد برای «{result.key}»</h2>
                  <div className="text-sm text-gray-600 mt-1">ترکیب پیشنهادی:</div>
                </div>
                <div className="text-xs text-gray-500">MVP</div>
              </div>

              <div className="text-gray-800 mb-3 text-lg">{result.mix}</div>
              <div className="text-sm text-gray-600 mb-3">{result.info}</div>
              {result.warning && <div className="text-red-600 font-semibold mb-2">⚠️ {result.warning}</div>}

              <div className="flex gap-2 justify-end">
                <a className="text-sm underline text-emerald-700" href="#" onClick={(e)=>e.preventDefault()}>مشاهده منابع (نمونه)</a>
                <button className="text-sm px-3 py-1 border rounded" onClick={() => navigator.clipboard?.writeText(`${result.key} — ${result.mix}\n${result.info}`)}>کپی نتیجه</button>
              </div>
            </div>
          </section>
        )}

        {/* Footer info / roadmap */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow text-right">
            <h4 className="font-semibold text-emerald-700 mb-2">ایمن‌سازی</h4>
            <p className="text-gray-600 text-sm">هشدار صریح: این سرویس جایگزین مشاوره پزشکی نیست. نسخهٔ بعدی شامل rule-based تداخل دارویی و human-in-the-loop خواهد شد.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-right">
            <h4 className="font-semibold text-emerald-700 mb-2">Roadmap</h4>
            <ul className="text-gray-600 text-sm list-disc pr-4">
              <li>مصاحبهٔ مرحله‌ای (داروها، بارداری)</li>
              <li>افزودن پایگاه منابع پزشکی</li>
              <li>پنل مدیریت و API برای عطاری‌ها</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-right">
            <h4 className="font-semibold text-emerald-700 mb-2">اشتراک</h4>
            <p className="text-gray-600 text-sm">در نسخهٔ بعدی قابلیت اشتراک برای پیشنهادات پیشرفته و تاریخچه کاربر اضافه خواهد شد.</p>
          </div>
        </section>

        <footer className="mt-8 text-right text-gray-500 text-sm">
          © {DB.meta.year} {DB.meta.name} — ساخته شده با ❤️
        </footer>
      </main>

      {/* About modal */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-5 max-w-lg w-full text-right">
            <h3 className="text-lg font-bold text-emerald-700 mb-2">درباره Aroom Sho</h3>
            <p className="text-gray-600 text-sm mb-3">
              Aroom Sho نسخهٔ MVP استارتاپ «عطاری هوشمند» است. هدف ارائهٔ پیشنهادهای گیاهی ساده و ایمن برای کاربران است. این نسخه صرفا نمایشی ست و برای استفادهٔ درمانی باید به پزشک مراجعه شود.
            </p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowAbout(false)} className="px-4 py-2 bg-emerald-600 text-white rounded">بستن</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
