import { useState } from "react";

const suggestions = {
  "استرس": {
    mix: "دمنوش بابونه + به‌لیمو + اسطوخودوس",
    info: "خاصیت آرام‌بخش و ضد اضطراب دارد.",
    warning: "در صورت مصرف داروهای آرام‌بخش، با پزشک مشورت شود.",
  },
  "بی‌خوابی": {
    mix: "سنبل‌الطیب + گل‌گاوزبان + عسل طبیعی",
    info: "به بهبود خواب و کاهش استرس کمک می‌کند.",
    warning: "در بارداری یا شیردهی با پزشک مشورت شود.",
  },
  "معده‌درد": {
    mix: "نعناع + زنجبیل + رازیانه",
    info: "برای هضم بهتر و کاهش نفخ مفید است.",
    warning: "افراد دارای رفلاکس معده با احتیاط مصرف کنند.",
  },
};

export default function App() {
  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState(null);

  const handleSuggest = () => {
    const s = symptom.trim();
    setResult(suggestions[s] || {
      mix: "در حال حاضر داده‌ای برای این مورد نداریم.",
      info: "در نسخه نهایی مدل هوش مصنوعی پیشنهاد دقیق می‌دهد.",
      warning: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-emerald-700 mb-4">🌿 Aroom Sho</h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        علائم خود را بنویسید تا بهترین ترکیب گیاهان دارویی پیشنهاد شود.
      </p>

      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-right">
        <input
          type="text"
          placeholder="مثلاً استرس، بی‌خوابی، معده‌درد..."
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          className="border w-full p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <button
          onClick={handleSuggest}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          پیشنهاد بده
        </button>

        {result && (
          <div className="mt-6 bg-emerald-50 p-4 rounded-lg border border-emerald-200">
            <h2 className="text-xl font-bold text-emerald-700 mb-2">ترکیب پیشنهادی:</h2>
            <p>{result.mix}</p>
            <p className="text-gray-600 text-sm mt-2">{result.info}</p>
            {result.warning && <p className="text-red-500 mt-2">⚠️ {result.warning}</p>}
          </div>
        )}
      </div>

      <footer className="mt-8 text-sm text-gray-500 text-center">
        نسخه MVP — ساخته شده با ❤️ React + Tailwind
      </footer>
    </div>
  );
}
