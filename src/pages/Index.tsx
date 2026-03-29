import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const GEROYICHIKI_COVER =
  "https://cdn.poehali.dev/projects/ada8d6aa-630f-4917-b7c9-cdd2153781f2/bucket/2b4c69d2-e962-49c8-848b-cbcf2f454e6f.jpeg";

const EPISODES_S1 = [
  { n: 1, title: "Новые герои", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239052?from=video&linked=1&t=4s" },
  { n: 2, title: "Плохая примета", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239053?from=video&linked=1" },
  { n: 3, title: "Лунная гонка", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239054?from=video&linked=1" },
  { n: 4, title: "Идеальный друг", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239055?from=video&linked=1&t=5s" },
  { n: 5, title: "Флаг для Генерала", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239056?from=video&linked=1&t=26s" },
  { n: 6, title: "Таинственная коробка", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239057?from=video&linked=1&t=15s" },
  { n: 7, title: "Сладкая миссия", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239058?from=video&linked=1&t=1m43s" },
  { n: 8, title: "Супергерой", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239059?from=video&linked=1" },
  { n: 9, title: "Метод Флая", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239060?from=video&linked=1" },
  { n: 10, title: "За фантазию", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239063?from=video&linked=1" },
  { n: 11, title: "Любимая игрушка", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239065?from=video&linked=1" },
  { n: 12, title: "Эмблема команды", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239070?from=video&linked=1" },
  { n: 13, title: "Премия Пинки", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239068?from=video&linked=1" },
  { n: 14, title: "Секрет Де-Кроля", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239071?from=video&linked=1" },
  { n: 15, title: "Одиссея Бублика", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239072?from=video&linked=1" },
  { n: 16, title: "Возвращение Пинки", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239073?from=video&linked=1" },
  { n: 17, title: "Одиночество Бублика", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239074?from=video&linked=1&t=2m21s" },
  { n: 18, title: "Страшный праздник", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239080?from=video&linked=1" },
  { n: 19, title: "Хвост О-Раша", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239075?from=video&linked=1" },
  { n: 20, title: "История Ко-Ко", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239076?from=video&linked=1&t=32s" },
  { n: 21, title: "Конкурс точилок", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239077?from=video&linked=1" },
  { n: 22, title: "Другая Глория", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239079?from=video&linked=1" },
  { n: 23, title: "Мелкотрон Крузо", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239082?from=video&linked=1" },
  { n: 24, title: "История Бублика", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239083?from=video&linked=1&t=3m10s" },
  { n: 25, title: "Жаркий четверг", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239085?from=video&linked=1" },
  { n: 26, title: "Блогер", url: "https://m.vkvideo.ru/playlist/-234589463_5/video-234589463_456239087?from=video&linked=1" },
];

const CARTOONS = [
  {
    id: "geroyichiki",
    title: "Геройчики",
    rating: "0+",
    years: "2022–2023",
    seasons: 2,
    episodes: 26,
    cover: GEROYICHIKI_COVER,
    genre: "Приключения",
    description:
      "Мальчик Рома очень любит играть, поэтому в его комнате полным-полно разных игрушек. Кого здесь только нет: и загадочный пушистый инопланетянин Бублик, и отважный петух-тянучка Ко-Ко, и благородная ящерица-самурай О-Раш, и милая куколка Пинки, и воинственный плюшевый заяц Генерал Де-Кроль со своими роботами, и, конечно, отважные супергерои Флай и Глория. Когда Ромы нет в комнате, они живут собственной увлекательной игрушечной жизнью.",
    seasonData: [
      { season: 1, episodes: EPISODES_S1 },
      { season: 2, episodes: [] },
    ],
  },
  {
    id: "um-i-khrum",
    title: "Ум и Хрум",
    rating: "0+",
    years: "2023",
    seasons: 1,
    episodes: 0,
    cover: "",
    genre: "Комедия",
    description: "Описание мультсериала будет добавлено позже.",
    seasonData: [],
  },
];

const TV_CHANNELS = [
  { id: "perviy", name: "Первый канал", stream: "http://rt-vlg-nn-htlive.cdn.ngenix.net/hls/CH_R03_OTT_VLG_NN_1TV/variant.m3u8?version=2", logo: "1️⃣", img: "https://cdn.poehali.dev/projects/ada8d6aa-630f-4917-b7c9-cdd2153781f2/bucket/79ba3114-0222-48b5-b6f1-e98e6a1693fc.jpeg", category: "Федеральные" },
  { id: "russia1", name: "Россия 1", stream: "https://vgtrkregion-reg.cdnvideo.ru/vgtrk/0/russia1-hd/index.m3u8", logo: "📺", img: "https://cdn.poehali.dev/projects/ada8d6aa-630f-4917-b7c9-cdd2153781f2/bucket/3e5ed4c9-6ddc-4fc5-b7d9-8a7206255c83.jpeg", category: "Федеральные" },
  { id: "ntv", name: "НТВ", stream: "https://zabava-htlive.cdn.ngenix.net/hls/CH_NTV/variant.m3u8", logo: "📡", img: "https://cdn.poehali.dev/projects/ada8d6aa-630f-4917-b7c9-cdd2153781f2/bucket/934a4d36-d244-4d5f-a958-1b0378e3fe10.jpeg", category: "Федеральные" },
  { id: "5kanal", name: "Пятый канал", stream: "https://zabava-htlive.cdn.ngenix.net/hls/CH_5TV/variant.m3u8", logo: "5️⃣", img: "https://cdn.poehali.dev/projects/ada8d6aa-630f-4917-b7c9-cdd2153781f2/bucket/ae8f9683-a8a8-4ae4-8c98-0a505ec4f6e1.jpeg", category: "Федеральные" },
  { id: "russia24", name: "Россия 24", stream: "https://vgtrkregion-reg.cdnvideo.ru/vgtrk/abakan/russia24-sd/index.m3u8", logo: "📰", img: "https://cdn.poehali.dev/projects/ada8d6aa-630f-4917-b7c9-cdd2153781f2/bucket/034201ec-b54a-43ea-9333-3eca707343b9.jpeg", category: "Новости" },
  { id: "rentv", name: "РЕН ТВ", stream: "https://zabava-htlive.cdn.ngenix.net/hls/CH_RENTV/variant.m3u8", logo: "🎬", img: "", category: "Развлечения" },
  { id: "sts", name: "СТС", stream: "https://zabava-htlive.cdn.ngenix.net/hls/CH_STS/variant.m3u8", logo: "🎭", img: "", category: "Развлечения" },
  { id: "tnt", name: "ТНТ", stream: "https://streaming.televizor-24-tochka.ru/live/38.m3u8", logo: "😂", img: "", category: "Развлечения" },
  { id: "match", name: "Матч ТВ", stream: "", logo: "⚽", img: "", category: "Спорт" },
  { id: "kultura", name: "Культура", stream: "https://vgtrkregion-reg.cdnvideo.ru/vgtrk/0/kultura-hd/index.m3u8", logo: "🎨", img: "", category: "Культура" },
  { id: "tvk", name: "ТВК", stream: "", logo: "📻", img: "", category: "Региональные" },
  { id: "karusel", name: "Карусель", stream: "https://zabava-htlive.cdn.ngenix.net/hls/CH_KARUSEL/variant.m3u8", logo: "🎠", img: "", category: "Детские" },
];

const TV_SCHEDULE: Record<string, { time: string; title: string; desc?: string }[]> = {
  perviy: [
    { time: "06:00", title: "Доброе утро" },
    { time: "09:00", title: "Новости" },
    { time: "09:15", title: "Контрольная закупка" },
    { time: "10:00", title: "Жить здорово!" },
    { time: "11:00", title: "Время" },
    { time: "12:00", title: "Дневник" },
    { time: "13:00", title: "Новости" },
    { time: "14:00", title: "Сериал дня" },
    { time: "16:00", title: "Мужское / Женское" },
    { time: "18:00", title: "Вечерние новости" },
    { time: "19:00", title: "Пусть говорят" },
    { time: "21:00", title: "Время", desc: "Главные новости дня" },
    { time: "21:30", title: "Вечерний прайм" },
  ],
  russia1: [
    { time: "07:00", title: "Утро России" },
    { time: "09:00", title: "О самом главном", desc: "Ток-шоу о здоровье" },
    { time: "11:00", title: "Вести", desc: "Федеральные новости" },
    { time: "13:00", title: "60 минут", desc: "Общественно-политическое ток-шоу" },
    { time: "15:00", title: "Сериал" },
    { time: "17:00", title: "Вести" },
    { time: "20:00", title: "Вести недели", desc: "Главные события" },
    { time: "21:30", title: "Вечерний прайм" },
  ],
  ntv: [
    { time: "07:00", title: "Утро. Самое лучшее" },
    { time: "09:00", title: "НТВ Утром" },
    { time: "10:00", title: "Первая передача", desc: "Авто" },
    { time: "13:00", title: "Чрезвычайное происшествие" },
    { time: "14:00", title: "Место встречи" },
    { time: "17:00", title: "Говорим и показываем" },
    { time: "19:00", title: "Сегодня", desc: "Новости" },
    { time: "20:30", title: "Вечерний сериал" },
  ],
  russia24: [
    { time: "06:00", title: "Утренние вести" },
    { time: "09:00", title: "Вести" },
    { time: "12:00", title: "Вести" },
    { time: "15:00", title: "Вести" },
    { time: "18:00", title: "Вести" },
    { time: "21:00", title: "Вести", desc: "Итоги дня" },
    { time: "23:00", title: "Вести ночью" },
  ],
  "5kanal": [
    { time: "07:00", title: "Утро на 5" },
    { time: "10:00", title: "Известия" },
    { time: "12:00", title: "Сейчас" },
    { time: "14:00", title: "Известия" },
    { time: "16:00", title: "Место происшествия" },
    { time: "18:00", title: "Сейчас" },
    { time: "19:30", title: "Главное" },
    { time: "21:00", title: "Детективы" },
  ],
  rentv: [
    { time: "07:00", title: "Утро" },
    { time: "09:00", title: "Новости 24" },
    { time: "12:00", title: "Новости 24" },
    { time: "14:00", title: "Документальный фильм" },
    { time: "16:00", title: "Сериал" },
    { time: "19:00", title: "Новости 24" },
    { time: "20:30", title: "Спецпроект" },
    { time: "22:00", title: "Сериал" },
  ],
  sts: [
    { time: "07:00", title: "Мультфильмы" },
    { time: "09:00", title: "Кухня", desc: "Сериал" },
    { time: "11:00", title: "Воронины", desc: "Сериал" },
    { time: "13:00", title: "Молодёжка" },
    { time: "16:00", title: "Мультфильмы" },
    { time: "18:00", title: "Кухня" },
    { time: "20:00", title: "СТС Love" },
    { time: "22:00", title: "Кино" },
  ],
  tnt: [
    { time: "07:00", title: "Квест" },
    { time: "09:00", title: "Теория большого взрыва" },
    { time: "11:00", title: "Универ" },
    { time: "13:00", title: "ТНТ-music" },
    { time: "16:00", title: "Интерны" },
    { time: "19:00", title: "Битва экстрасенсов" },
    { time: "21:00", title: "Реалити-шоу" },
    { time: "23:00", title: "Стендап" },
  ],
  match: [
    { time: "07:00", title: "Спортивные новости" },
    { time: "08:00", title: "Хоккей", desc: "Прямой эфир" },
    { time: "12:00", title: "Футбол" },
    { time: "15:00", title: "Спортивные новости" },
    { time: "16:00", title: "Теннис" },
    { time: "18:00", title: "Футбол. Обзор матчей" },
    { time: "20:00", title: "Футбол. Чемпионат" },
    { time: "22:30", title: "Ночные новости спорта" },
  ],
  kultura: [
    { time: "07:00", title: "Доброе утро" },
    { time: "09:00", title: "Новости культуры" },
    { time: "10:00", title: "Документальное кино" },
    { time: "12:00", title: "Театр" },
    { time: "15:00", title: "Новости культуры" },
    { time: "16:00", title: "Кинопоказ" },
    { time: "19:00", title: "Главная роль" },
    { time: "21:00", title: "Концерт" },
  ],
  otr: [
    { time: "07:00", title: "ОТРажение", desc: "Итоги" },
    { time: "09:00", title: "Школа" },
    { time: "11:00", title: "Документальное кино" },
    { time: "13:00", title: "ОТРажение" },
    { time: "15:00", title: "Культурный обмен" },
    { time: "17:00", title: "Малые города России" },
    { time: "19:00", title: "ОТРажение" },
    { time: "21:00", title: "Открытая студия" },
  ],
  tvk: [
    { time: "07:00", title: "Новости ТВК" },
    { time: "09:00", title: "Утренний эфир" },
    { time: "12:00", title: "Новости ТВК" },
    { time: "14:00", title: "Сериал" },
    { time: "17:00", title: "Новости ТВК" },
    { time: "19:00", title: "Вечерний эфир" },
    { time: "21:00", title: "Ночные новости" },
    { time: "22:00", title: "Кино" },
  ],
};

type Section = "home" | "cartoons" | "tv" | "schedule" | "favorites";

// ─── NAV ──────────────────────────────────────────────────────────────────────

function NavBar({ active, setActive, searchOpen, setSearchOpen }: {
  active: Section;
  setActive: (s: Section) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links: { id: Section; label: string }[] = [
    { id: "home", label: "Главная" },
    { id: "cartoons", label: "Мультсериалы" },
    { id: "tv", label: "ТВ-каналы" },
    { id: "schedule", label: "Программа" },
    { id: "favorites", label: "Избранное" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0f0f0f]/98 shadow-lg shadow-black/60" : "nav-glass"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-16 gap-5">
        <button onClick={() => setActive("home")} className="font-display text-2xl font-bold text-primary shrink-0 tracking-wide">
          🚀 ПОЕХАЛИ
        </button>
        <div className="hidden md:flex items-center gap-0.5 flex-1">
          {links.map((l) => (
            <button key={l.id} onClick={() => setActive(l.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${active === l.id ? "text-primary bg-primary/10" : "text-white/65 hover:text-white hover:bg-white/6"}`}>
              {l.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button onClick={() => setSearchOpen(!searchOpen)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white">
            <Icon name="Search" size={18} />
          </button>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold cursor-pointer">П</div>
        </div>
      </div>
      <div className="md:hidden flex gap-2 overflow-x-auto px-4 pb-2 no-scrollbar">
        {links.map((l) => (
          <button key={l.id} onClick={() => setActive(l.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${active === l.id ? "bg-primary text-white" : "bg-white/10 text-white/60"}`}>
            {l.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

// ─── SEARCH ───────────────────────────────────────────────────────────────────

function SearchOverlay({ open, onClose, onSelect }: {
  open: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (open) { setTimeout(() => ref.current?.focus(), 80); setQuery(""); } }, [open]);

  const results = query.length > 1
    ? CARTOONS.filter(c => c.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] search-overlay flex flex-col items-center pt-24 px-4" onClick={onClose}>
      <div className="w-full max-w-xl bg-[#1c1c1c] rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-scale-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
          <Icon name="Search" size={19} className="text-white/35" />
          <input ref={ref} value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Фильмы, сериалы, каналы..."
            className="flex-1 bg-transparent text-white text-base outline-none placeholder:text-white/30" />
          <button onClick={onClose} className="text-white/35 hover:text-white transition-colors"><Icon name="X" size={18} /></button>
        </div>
        <div className="p-3 min-h-[80px]">
          {query.length > 1 && results.length === 0 && (
            <p className="text-white/35 text-center py-6 text-sm">Ничего не найдено</p>
          )}
          {results.map(c => (
            <button key={c.id} onClick={() => { onSelect(c.id); onClose(); }}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/6 transition-colors text-left">
              <img src={c.cover || GEROYICHIKI_COVER} className="w-10 h-14 object-cover rounded-lg shrink-0" alt={c.title} />
              <div>
                <p className="text-white font-semibold text-sm">{c.title}</p>
                <p className="text-white/45 text-xs">{c.rating} · {c.years}</p>
              </div>
            </button>
          ))}
          {query.length <= 1 && (
            <div className="px-2 pt-1">
              <p className="text-white/25 text-xs mb-2">Популярные</p>
              <div className="flex flex-wrap gap-2">
                {["Геройчики", "Мультфильмы", "Россия 1", "ТНТ", "Матч ТВ"].map(t => (
                  <button key={t} onClick={() => setQuery(t)}
                    className="px-3 py-1.5 bg-white/8 rounded-full text-xs text-white/65 hover:text-white hover:bg-white/12 transition-colors">
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroBanner({ onWatch, onInfo }: { onWatch: () => void; onInfo: () => void }) {
  return (
    <div className="relative w-full h-[72vh] min-h-[500px] overflow-hidden">
      <img src={GEROYICHIKI_COVER} alt="Геройчики"
        className="absolute inset-0 w-full h-full object-cover object-top"
        style={{ filter: "brightness(0.5)" }} />
      <div className="hero-gradient absolute inset-0" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0f0f0f] to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end pb-20 px-8 max-w-3xl animate-fade-in">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="bg-primary text-white text-xs font-bold px-2.5 py-0.5 rounded-md">0+</span>
          <span className="text-white/55 text-sm font-medium">Мультсериал</span>
          <span className="text-white/30">·</span>
          <span className="text-white/55 text-sm">2022–2023</span>
          <span className="text-white/30">·</span>
          <span className="text-white/55 text-sm">2 сезона · 26 серий</span>
        </div>
        <h1 className="text-5xl sm:text-7xl font-display font-bold text-white mb-4 tracking-wide leading-none drop-shadow-2xl">
          ГЕРОЙЧИКИ
        </h1>
        <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-md mb-7">
          Игрушки Ромы оживают, когда его нет дома. Отважные супергерои Флай и Глория всегда придут на помощь!
        </p>
        <div className="flex items-center gap-3">
          <button onClick={onWatch}
            className="flex items-center gap-2 bg-primary hover:bg-orange-500 text-white font-bold px-7 py-3 rounded-xl transition-all shadow-xl shadow-primary/30 text-sm">
            <Icon name="Play" size={17} /> Смотреть
          </button>
          <button onClick={onInfo}
            className="flex items-center gap-2 bg-white/12 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all backdrop-blur-sm text-sm border border-white/15">
            <Icon name="Info" size={17} /> Подробнее
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CARD ─────────────────────────────────────────────────────────────────────

function CartoonCard({ cartoon, onClick, isFav, onFav }: {
  cartoon: typeof CARTOONS[0];
  onClick: () => void;
  isFav: boolean;
  onFav: () => void;
}) {
  return (
    <div className="relative group card-hover rounded-xl overflow-hidden cursor-pointer bg-[#1c1c1c]" onClick={onClick}>
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={cartoon.cover || `https://placehold.co/300x450/1c1c1c/ff5722?text=${encodeURIComponent(cartoon.title)}`}
          alt={cartoon.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <button onClick={e => { e.stopPropagation(); onFav(); }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isFav ? "bg-primary text-white" : "bg-black/60 text-white/60 hover:text-white"}`}>
          <Icon name="Heart" size={13} />
        </button>
        <button className="flex items-center justify-center gap-1 bg-primary text-white text-xs font-bold py-2 rounded-lg w-full">
          <Icon name="Play" size={13} /> Смотреть
        </button>
      </div>
      <div className="p-3">
        <h3 className="font-display font-semibold text-white text-sm leading-tight truncate">{cartoon.title}</h3>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-primary text-xs font-bold">{cartoon.rating}</span>
          <span className="text-white/30 text-xs">·</span>
          <span className="text-white/45 text-xs">{cartoon.years}</span>
        </div>
      </div>
    </div>
  );
}

// ─── DETAIL ───────────────────────────────────────────────────────────────────

function CartoonDetail({ cartoon, onBack, isFav, onFav }: {
  cartoon: typeof CARTOONS[0];
  onBack: () => void;
  isFav: boolean;
  onFav: () => void;
}) {
  const [activeSeason, setActiveSeason] = useState(1);
  const [watchingUrl, setWatchingUrl] = useState<string | null>(null);
  const [watchingTitle, setWatchingTitle] = useState("");

  const season = cartoon.seasonData.find(s => s.season === activeSeason);

  return (
    <div className="pt-16 min-h-screen">
      {watchingUrl && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col">
          <div className="flex items-center gap-3 px-4 py-3 bg-[#111] border-b border-white/8">
            <button onClick={() => setWatchingUrl(null)}
              className="text-white/55 hover:text-white transition-colors flex items-center gap-2 text-sm">
              <Icon name="ArrowLeft" size={15} /> Назад
            </button>
            <span className="text-white/30 text-sm">|</span>
            <span className="text-white/70 text-sm font-medium truncate">{cartoon.title} — {watchingTitle}</span>
          </div>
          <div className="flex-1 flex items-center justify-center bg-black p-6">
            <div className="w-full max-w-lg text-center">
              <div className="bg-[#1c1c1c] rounded-2xl p-10 border border-white/8">
                <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-5">
                  <Icon name="Play" size={28} className="text-primary" />
                </div>
                <h3 className="text-white text-xl font-display font-semibold mb-2">{watchingTitle}</h3>
                <p className="text-white/40 text-sm mb-7">Серия откроется на ВКонтакте</p>
                <a href={watchingUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-orange-500 transition-colors">
                  <Icon name="ExternalLink" size={16} /> Открыть серию
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="relative h-[45vh] overflow-hidden">
        <img src={cartoon.cover || GEROYICHIKI_COVER} alt={cartoon.title}
          className="w-full h-full object-cover" style={{ filter: "brightness(0.38)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
        <button onClick={onBack}
          className="absolute top-20 left-6 flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-sm bg-black/30 px-3 py-1.5 rounded-lg backdrop-blur-sm">
          <Icon name="ArrowLeft" size={14} /> Назад
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-20 relative z-10 pb-24">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="shrink-0">
            <img src={cartoon.cover || GEROYICHIKI_COVER} alt={cartoon.title}
              className="w-36 sm:w-48 rounded-xl shadow-2xl shadow-black/60 border border-white/8" />
          </div>
          <div className="flex-1 pt-2 sm:pt-16">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded">{cartoon.rating}</span>
              <span className="text-white/45 text-sm">{cartoon.genre}</span>
              <span className="text-white/25">·</span>
              <span className="text-white/45 text-sm">{cartoon.years}</span>
              <span className="text-white/25">·</span>
              <span className="text-white/45 text-sm">{cartoon.seasons} сезона · {cartoon.episodes} серий</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-3 tracking-wide leading-none">{cartoon.title.toUpperCase()}</h1>
            <p className="text-white/60 leading-relaxed mb-5 max-w-xl text-sm">{cartoon.description}</p>
            <div className="flex items-center gap-3">
              <button onClick={() => {
                const ep = cartoon.seasonData[0]?.episodes[0];
                if (ep) { setWatchingUrl(ep.url); setWatchingTitle(`С1 Э1 — ${ep.title}`); }
              }} className="flex items-center gap-2 bg-primary hover:bg-orange-500 text-white font-bold px-6 py-2.5 rounded-xl transition-all text-sm">
                <Icon name="Play" size={15} /> Смотреть
              </button>
              <button onClick={onFav}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all border text-sm ${isFav ? "bg-primary/15 border-primary text-primary" : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10"}`}>
                <Icon name="Heart" size={15} />
                {isFav ? "В избранном" : "В избранное"}
              </button>
            </div>
          </div>
        </div>

        {cartoon.seasonData.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-2xl font-display font-semibold text-white">Серии</h2>
              <div className="flex gap-2">
                {cartoon.seasonData.map(s => (
                  <button key={s.season} onClick={() => setActiveSeason(s.season)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeSeason === s.season ? "bg-primary text-white" : "bg-white/8 text-white/55 hover:bg-white/12 hover:text-white"}`}>
                    Сезон {s.season}
                  </button>
                ))}
              </div>
            </div>

            {season && season.episodes.length > 0 ? (
              <div className="bg-[#161616] rounded-2xl overflow-hidden border border-white/8">
                {season.episodes.map((ep, i) => (
                  <div key={ep.n}
                    className={`episode-row flex items-center gap-4 px-5 py-3.5 cursor-pointer ${i < season.episodes.length - 1 ? "border-b border-white/5" : ""}`}
                    onClick={() => { setWatchingUrl(ep.url); setWatchingTitle(`С${activeSeason} Э${ep.n} — ${ep.title}`); }}>
                    <span className="text-white/25 text-sm w-7 text-right shrink-0 font-mono">{ep.n}</span>
                    <p className="flex-1 text-white/85 text-sm font-medium">{ep.title}</p>
                    <Icon name="Play" size={14} className="text-white/25 shrink-0" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#161616] rounded-2xl p-12 text-center border border-white/8">
                <Icon name="Clock" size={32} className="text-white/15 mx-auto mb-3" />
                <p className="text-white/35 text-sm">Серии 2 сезона будут добавлены позже</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SECTIONS ─────────────────────────────────────────────────────────────────

function CartoonsSection({ favorites, toggleFav, onSelect }: {
  favorites: Set<string>; toggleFav: (id: string) => void; onSelect: (id: string) => void;
}) {
  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      <div className="flex items-center gap-3 mb-8 animate-fade-in">
        <h1 className="text-4xl font-display font-bold text-white">МУЛЬТСЕРИАЛЫ</h1>
        <span className="bg-primary/15 text-primary text-sm font-semibold px-3 py-1 rounded-full">{CARTOONS.length}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {CARTOONS.map((c, i) => (
          <div key={c.id} className={`animate-fade-in stagger-${Math.min(i+1,6)}`}>
            <CartoonCard cartoon={c} onClick={() => onSelect(c.id)} isFav={favorites.has(c.id)} onFav={() => toggleFav(c.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function HlsPlayer({ stream, channelName }: { stream: string; channelName: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setError(false);
    setLoading(true);
    const video = videoRef.current;
    if (!video || !stream) { setLoading(false); return; }

    import("hls.js").then(({ default: Hls }) => {
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: false });
        hls.loadSource(stream);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => { setLoading(false); video.play().catch(() => {}); });
        hls.on(Hls.Events.ERROR, (_e: unknown, data: { fatal: boolean }) => { if (data.fatal) setError(true); setLoading(false); });
        return () => hls.destroy();
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = stream;
        video.addEventListener("loadedmetadata", () => { setLoading(false); video.play().catch(() => {}); });
        video.addEventListener("error", () => { setError(true); setLoading(false); });
      } else {
        setError(true); setLoading(false);
      }
    });
  }, [stream]);

  if (!stream) return (
    <div className="w-full aspect-video bg-[#111] rounded-xl flex flex-col items-center justify-center gap-3 border border-white/8">
      <Icon name="Tv" size={36} className="text-white/15" />
      <p className="text-white/30 text-sm">Трансляция скоро будет добавлена</p>
    </div>
  );

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border border-white/8">
      {loading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#111] z-10">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-white/40 text-sm">Загрузка {channelName}...</p>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#111] z-10">
          <Icon name="WifiOff" size={36} className="text-white/20" />
          <p className="text-white/40 text-sm text-center px-6">Не удалось подключиться к трансляции</p>
          <p className="text-white/20 text-xs">Попробуйте обновить страницу</p>
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        muted
        playsInline
        style={{ display: error ? "none" : "block" }}
      />
    </div>
  );
}

function TVSection({ initialChannelId }: { initialChannelId?: string }) {
  const [activeChannel, setActiveChannel] = useState(
    TV_CHANNELS.find(c => c.id === initialChannelId) || TV_CHANNELS[0]
  );
  const cats = [...new Set(TV_CHANNELS.map(c => c.category))];

  return (
    <div className="pt-20 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      {/* Player */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4 mt-4">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-[#111] shrink-0">
            {activeChannel.img
              ? <img src={activeChannel.img} alt={activeChannel.name} className="w-full h-full object-cover" />
              : <span className="text-2xl">{activeChannel.logo}</span>
            }
          </div>
          <h1 className="text-3xl font-display font-bold text-white">{activeChannel.name}</h1>
          <div className="flex items-center gap-1.5 ml-2">
            <div className="live-dot" />
            <span className="text-white/45 text-sm font-medium">Прямой эфир</span>
          </div>
        </div>
        <HlsPlayer stream={activeChannel.stream} channelName={activeChannel.name} />
      </div>

      {/* Channel grid */}
      <h2 className="text-xl font-display font-bold text-white mb-5 flex items-center gap-3">
        ТВ-КАНАЛЫ
        <span className="text-xs font-sans text-white/30 uppercase tracking-widest">— выберите канал</span>
      </h2>
      {cats.map(cat => (
        <div key={cat} className="mb-8">
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">{cat}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {TV_CHANNELS.filter(c => c.category === cat).map(ch => (
              <button key={ch.id} onClick={() => setActiveChannel(ch)}
                className={`group flex flex-col items-center gap-2.5 p-4 rounded-xl border transition-all duration-200 card-hover ${
                  activeChannel.id === ch.id
                    ? "bg-primary/12 border-primary/50 shadow-lg shadow-primary/10"
                    : "bg-[#1c1c1c] border-white/6 hover:bg-[#262626] hover:border-primary/25"
                }`}>
                <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center bg-[#111]">
                  {ch.img
                    ? <img src={ch.img} alt={ch.name} className="w-full h-full object-cover" />
                    : <span className="text-4xl">{ch.logo}</span>
                  }
                </div>
                <div className="text-center">
                  <p className={`font-semibold text-sm ${activeChannel.id === ch.id ? "text-primary" : "text-white/85"}`}>{ch.name}</p>
                  {activeChannel.id === ch.id ? (
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <div className="live-dot" style={{ width: 5, height: 5 }} />
                      <span className="text-primary text-xs">Смотрю</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <div className="live-dot" style={{ width: 5, height: 5 }} />
                      <span className="text-white/30 text-xs">Прямой эфир</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ScheduleSection() {
  const [selected, setSelected] = useState(TV_CHANNELS[0]);
  const now = new Date();
  const nowMins = now.getHours() * 60 + now.getMinutes();
  function toMins(t: string) { const [h, m] = t.split(":").map(Number); return h * 60 + (m || 0); }

  const schedule = TV_SCHEDULE[selected.id] || [];
  const curIdx = schedule.reduce((best, item, i) => toMins(item.time) <= nowMins ? i : best, 0);

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-4xl font-display font-bold text-white mb-1">ПРОГРАММА ПЕРЕДАЧ</h1>
        <p className="text-white/35 text-sm">{now.toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })}</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="lg:w-60 shrink-0">
          <div className="bg-[#161616] rounded-2xl overflow-hidden border border-white/8">
            {TV_CHANNELS.map((ch, i) => (
              <button key={ch.id} onClick={() => setSelected(ch)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left ${selected.id === ch.id ? "bg-primary/12 border-l-2 border-primary" : "hover:bg-white/4"} ${i < TV_CHANNELS.length - 1 ? "border-b border-white/5" : ""}`}>
                <span className="text-xl">{ch.logo}</span>
                <div>
                  <p className={`text-sm font-semibold ${selected.id === ch.id ? "text-primary" : "text-white/85"}`}>{ch.name}</p>
                  <p className="text-white/25 text-xs">{ch.category}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{selected.logo}</span>
            <h2 className="text-xl font-display font-bold text-white">{selected.name}</h2>
            <div className="flex items-center gap-1.5 ml-auto">
              <div className="live-dot" />
              <span className="text-white/40 text-sm">Прямой эфир</span>
            </div>
          </div>
          <div className="bg-[#161616] rounded-2xl overflow-hidden border border-white/8 mb-4">
            {schedule.map((item, i) => {
              const isCur = i === curIdx;
              const isPast = i < curIdx;
              return (
                <div key={i} className={`flex items-start gap-4 px-5 py-4 transition-colors ${isCur ? "bg-primary/10 border-l-2 border-primary" : isPast ? "opacity-35" : "hover:bg-white/3"} ${i < schedule.length - 1 ? "border-b border-white/5" : ""}`}>
                  <span className={`font-mono text-sm w-12 shrink-0 pt-0.5 ${isCur ? "text-primary font-bold" : "text-white/35"}`}>{item.time}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`text-sm font-semibold ${isCur ? "text-white" : isPast ? "text-white/55" : "text-white/80"}`}>{item.title}</p>
                      {isCur && <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">СЕЙЧАС</span>}
                    </div>
                    {item.desc && <p className="text-white/30 text-xs mt-0.5">{item.desc}</p>}
                  </div>
                </div>
              );
            })}
          </div>
          {selected.stream && (
            <a href={selected.stream} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-orange-500 transition-colors text-sm">
              <Icon name="Tv" size={15} /> Смотреть {selected.name} онлайн
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function FavoritesSection({ favorites, toggleFav, onSelect }: {
  favorites: Set<string>; toggleFav: (id: string) => void; onSelect: (id: string) => void;
}) {
  const list = CARTOONS.filter(c => favorites.has(c.id));
  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      <div className="flex items-center gap-3 mb-8 animate-fade-in">
        <h1 className="text-4xl font-display font-bold text-white">ИЗБРАННОЕ</h1>
        {list.length > 0 && <span className="bg-primary/15 text-primary text-sm font-semibold px-3 py-1 rounded-full">{list.length}</span>}
      </div>
      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-3">
          <Icon name="Heart" size={52} className="text-white/12" />
          <p className="text-white/35 text-lg font-display">Пока ничего нет</p>
          <p className="text-white/20 text-sm">Нажмите ❤ на карточке сериала</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {list.map((c, i) => (
            <div key={c.id} className={`animate-fade-in stagger-${Math.min(i+1,6)}`}>
              <CartoonCard cartoon={c} onClick={() => onSelect(c.id)} isFav={true} onFav={() => toggleFav(c.id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function HomeSection({ onCartoonSelect, onHeroWatch, onHeroInfo, favorites, toggleFav, onTvSelect }: {
  onCartoonSelect: (id: string) => void;
  onHeroWatch: () => void;
  onHeroInfo: () => void;
  favorites: Set<string>;
  toggleFav: (id: string) => void;
  onTvSelect: (id: string) => void;
}) {
  return (
    <div className="min-h-screen">
      <HeroBanner onWatch={onHeroWatch} onInfo={onHeroInfo} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-display font-bold text-white">Мультсериалы</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-14">
          {CARTOONS.map((c, i) => (
            <div key={c.id} className={`animate-fade-in stagger-${Math.min(i+1,6)}`}>
              <CartoonCard cartoon={c} onClick={() => onCartoonSelect(c.id)} isFav={favorites.has(c.id)} onFav={() => toggleFav(c.id)} />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-display font-bold text-white">ТВ-каналы</h2>
          <div className="flex items-center gap-1.5">
            <div className="live-dot" />
            <span className="text-white/40 text-xs">В эфире</span>
          </div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {TV_CHANNELS.slice(0, 6).map(ch => (
            <button key={ch.id} onClick={() => onTvSelect(ch.id)}
              className="bg-[#1c1c1c] hover:bg-[#262626] border border-white/6 hover:border-primary/30 rounded-xl p-3 flex flex-col items-center gap-2 transition-all card-hover">
              <span className="text-3xl">{ch.logo}</span>
              <p className="text-white/75 text-xs font-semibold text-center">{ch.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────

export default function Index() {
  const [section, setSection] = useState<Section>("home");
  const [selectedCartoon, setSelectedCartoon] = useState<string | null>(null);
  const [selectedTvChannel, setSelectedTvChannel] = useState<string | undefined>(undefined);
  const [searchOpen, setSearchOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  function toggleFav(id: string) {
    setFavorites(prev => {
      const n = new Set(prev);
      if (n.has(id)) { n.delete(id); } else { n.add(id); }
      return n;
    });
  }

  function openCartoon(id: string) {
    setSelectedCartoon(id);
    setSection("cartoons");
    window.scrollTo({ top: 0 });
  }

  function openTV(channelId?: string) {
    setSelectedTvChannel(channelId);
    setSection("tv");
    window.scrollTo({ top: 0 });
  }

  const cartoon = CARTOONS.find(c => c.id === selectedCartoon);

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <NavBar
        active={section}
        setActive={s => { setSection(s); setSelectedCartoon(null); window.scrollTo({ top: 0 }); }}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)}
        onSelect={id => { openCartoon(id); }} />

      {section === "home" && (
        <HomeSection
          onCartoonSelect={openCartoon}
          onHeroWatch={() => openCartoon("geroyichiki")}
          onHeroInfo={() => openCartoon("geroyichiki")}
          favorites={favorites}
          toggleFav={toggleFav}
          onTvSelect={openTV}
        />
      )}
      {section === "cartoons" && !selectedCartoon && (
        <CartoonsSection favorites={favorites} toggleFav={toggleFav} onSelect={openCartoon} />
      )}
      {section === "cartoons" && cartoon && (
        <CartoonDetail cartoon={cartoon} onBack={() => setSelectedCartoon(null)} isFav={favorites.has(cartoon.id)} onFav={() => toggleFav(cartoon.id)} />
      )}
      {section === "tv" && <TVSection initialChannelId={selectedTvChannel} />}
      {section === "schedule" && <ScheduleSection />}
      {section === "favorites" && <FavoritesSection favorites={favorites} toggleFav={toggleFav} onSelect={openCartoon} />}
    </div>
  );
}