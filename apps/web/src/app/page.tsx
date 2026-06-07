"use client";

import {
  ArrowLeft,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  CreditCard,
  Headphones,
  Heart,
  Home,
  ListFilter,
  MapPin,
  Mic2,
  Music2,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  User,
  WalletCards
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { studios, type Slot, type Studio } from "@/data/studios";

type View = "catalog" | "studio" | "booking" | "payment" | "success" | "profile";

const filters = ["Сегодня", "До 2500 ₽/ч", "У метро", "С инженером", "Вокал"];

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        colorScheme?: "light" | "dark";
      };
    };
    ymaps?: {
      ready: (callback: () => void) => void;
      Map: new (element: HTMLElement, options: unknown, state?: unknown) => unknown;
      Placemark: new (coordinates: [number, number], properties?: unknown, options?: unknown) => unknown;
    };
  }
}

export default function HomePage() {
  const [view, setView] = useState<View>("catalog");
  const [selectedStudio, setSelectedStudio] = useState<Studio>(studios[0]);
  const [selectedSlot, setSelectedSlot] = useState<Slot>(studios[0].slots[0]);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Сегодня");
  const [favoriteIds, setFavoriteIds] = useState<string[]>(["mono-room"]);

  useEffect(() => {
    window.Telegram?.WebApp?.ready();
    window.Telegram?.WebApp?.expand();
  }, []);

  const filteredStudios = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return studios.filter((studio) => {
      const matchesQuery =
        !normalized ||
        [studio.name, studio.metro, studio.district, studio.address]
          .join(" ")
          .toLowerCase()
          .includes(normalized);

      const matchesFilter =
        activeFilter === "Сегодня" ||
        (activeFilter === "До 2500 ₽/ч" && studio.priceFrom <= 2500) ||
        (activeFilter === "У метро" && studio.walkMinutes <= 8) ||
        (activeFilter === "С инженером" && studio.features.includes("Инженер")) ||
        (activeFilter === "Вокал" && studio.tags.includes("Вокал"));

      return matchesQuery && matchesFilter;
    });
  }, [activeFilter, query]);

  const bookingTotal = selectedSlot.price;

  function openStudio(studio: Studio) {
    setSelectedStudio(studio);
    setSelectedSlot(studio.slots[0]);
    setView("studio");
  }

  function toggleFavorite(studioId: string) {
    setFavoriteIds((current) =>
      current.includes(studioId)
        ? current.filter((id) => id !== studioId)
        : [...current, studioId]
    );
  }

  return (
    <main className="app-shell">
      <div className="phone-frame">
        <TopBar
          view={view}
          onBack={() => setView(view === "catalog" ? "catalog" : "studio")}
          onProfile={() => setView("profile")}
        />

        <section className="screen">
          {view === "catalog" && (
            <CatalogScreen
              activeFilter={activeFilter}
              favoriteIds={favoriteIds}
              filteredStudios={filteredStudios}
              query={query}
              setActiveFilter={setActiveFilter}
              setQuery={setQuery}
              onOpenStudio={openStudio}
              onToggleFavorite={toggleFavorite}
            />
          )}

          {view === "studio" && (
            <StudioScreen
              favoriteIds={favoriteIds}
              selectedStudio={selectedStudio}
              onBook={() => setView("booking")}
              onToggleFavorite={toggleFavorite}
            />
          )}

          {view === "booking" && (
            <BookingScreen
              selectedSlot={selectedSlot}
              selectedStudio={selectedStudio}
              onSelectSlot={setSelectedSlot}
              onPay={() => setView("payment")}
            />
          )}

          {view === "payment" && (
            <PaymentScreen
              total={bookingTotal}
              selectedSlot={selectedSlot}
              selectedStudio={selectedStudio}
              onConfirm={() => setView("success")}
            />
          )}

          {view === "success" && (
            <SuccessScreen
              selectedSlot={selectedSlot}
              selectedStudio={selectedStudio}
              onHome={() => setView("catalog")}
            />
          )}

          {view === "profile" && <ProfileScreen favoriteCount={favoriteIds.length} />}
        </section>

        <BottomNav current={view} onNavigate={setView} />
      </div>
    </main>
  );
}

function TopBar({
  view,
  onBack,
  onProfile
}: {
  view: View;
  onBack: () => void;
  onProfile: () => void;
}) {
  const canGoBack = view !== "catalog" && view !== "profile";

  return (
    <header className="top-bar">
      <button className="icon-button" onClick={canGoBack ? onBack : undefined} aria-label="Назад">
        {canGoBack ? <ArrowLeft size={20} /> : <Music2 size={20} />}
      </button>
      <div className="brand">
        <strong>StudioRent</strong>
        <span>Москва · студии звукозаписи</span>
      </div>
      <button className="icon-button" onClick={onProfile} aria-label="Профиль">
        <User size={20} />
      </button>
    </header>
  );
}

function CatalogScreen({
  activeFilter,
  favoriteIds,
  filteredStudios,
  query,
  setActiveFilter,
  setQuery,
  onOpenStudio,
  onToggleFavorite
}: {
  activeFilter: string;
  favoriteIds: string[];
  filteredStudios: Studio[];
  query: string;
  setActiveFilter: (filter: string) => void;
  setQuery: (query: string) => void;
  onOpenStudio: (studio: Studio) => void;
  onToggleFavorite: (studioId: string) => void;
}) {
  return (
    <>
      <div className="search-row">
        <label className="search-box">
          <Search size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Студия, метро, район"
          />
        </label>
        <button className="round-action" aria-label="Фильтры">
          <SlidersHorizontal size={19} />
        </button>
        <button className="round-action" aria-label="Уведомления">
          <Bell size={19} />
        </button>
      </div>

      <div className="hero-banner">
        <div>
          <span className="eyebrow">Свободные окна сегодня</span>
          <h1>Запиши трек без долгой переписки</h1>
          <p>Каталог московских студий с оборудованием, ценами и моментальной бронью.</p>
        </div>
        <div className="hero-badge">
          <Mic2 size={22} />
          <span>18:00</span>
        </div>
      </div>

      <div className="filter-strip">
        {filters.map((filter) => (
          <button
            className={filter === activeFilter ? "chip active" : "chip"}
            key={filter}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <SectionHeader action="Все студии" title="Подборка для записи" />

      <div className="studio-list">
        {filteredStudios.map((studio) => (
          <StudioCard
            favorite={favoriteIds.includes(studio.id)}
            key={studio.id}
            studio={studio}
            onOpen={() => onOpenStudio(studio)}
            onToggleFavorite={() => onToggleFavorite(studio.id)}
          />
        ))}
      </div>
    </>
  );
}

function StudioCard({
  favorite,
  studio,
  onOpen,
  onToggleFavorite
}: {
  favorite: boolean;
  studio: Studio;
  onOpen: () => void;
  onToggleFavorite: () => void;
}) {
  return (
    <article className="studio-card">
      <button className="studio-main" onClick={onOpen}>
        <Image
          alt=""
          className="studio-thumb"
          height={116}
          src={studio.images[0]}
          unoptimized
          width={98}
        />
        <div className="studio-copy">
          <div className="studio-title-row">
            <h2>{studio.name}</h2>
            <span className="rating">
              <Star size={13} fill="currentColor" />
              {studio.rating}
            </span>
          </div>
          <p>
            <MapPin size={14} />
            {studio.metro} · {studio.walkMinutes} мин
          </p>
          <div className="tag-row">
            {studio.tags.slice(0, 3).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="price-row">
            <strong>от {studio.priceFrom.toLocaleString("ru-RU")} ₽/ч</strong>
            <small>{studio.slots[0].time} свободно</small>
          </div>
        </div>
      </button>
      <button
        className={favorite ? "heart-button active" : "heart-button"}
        onClick={onToggleFavorite}
        aria-label="В избранное"
      >
        <Heart size={18} fill={favorite ? "currentColor" : "none"} />
      </button>
    </article>
  );
}

function StudioScreen({
  favoriteIds,
  selectedStudio,
  onBook,
  onToggleFavorite
}: {
  favoriteIds: string[];
  selectedStudio: Studio;
  onBook: () => void;
  onToggleFavorite: (studioId: string) => void;
}) {
  const isFavorite = favoriteIds.includes(selectedStudio.id);

  return (
    <div className="details">
      <div className="gallery">
        <div className="gallery-image">
          <Image
            alt=""
            className="gallery-photo"
            height={210}
            priority
            src={selectedStudio.images[0]}
            unoptimized
            width={230}
          />
        </div>
        <div className="gallery-image">
          <Image
            alt=""
            className="gallery-photo"
            height={210}
            priority
            src={selectedStudio.images[1]}
            unoptimized
            width={150}
          />
        </div>
      </div>

      <div className="title-block">
        <div>
          <span className="eyebrow">{selectedStudio.metro} · {selectedStudio.district}</span>
          <h1>{selectedStudio.name}</h1>
        </div>
        <button
          className={isFavorite ? "round-action active" : "round-action"}
          onClick={() => onToggleFavorite(selectedStudio.id)}
          aria-label="В избранное"
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="summary-grid">
        <Metric icon={<Star size={16} />} label="Рейтинг" value={selectedStudio.rating.toString()} />
        <Metric icon={<Clock3 size={16} />} label="Ближайшее" value={selectedStudio.slots[0].time} />
        <Metric icon={<WalletCards size={16} />} label="Цена" value={`${selectedStudio.priceFrom} ₽/ч`} />
      </div>

      <InfoPanel title="О студии">
        <p>{selectedStudio.description}</p>
      </InfoPanel>

      <InfoPanel title="Оборудование">
        <div className="equipment-grid">
          {selectedStudio.equipment.map((item) => (
            <span key={item}>
              <Headphones size={14} />
              {item}
            </span>
          ))}
        </div>
      </InfoPanel>

      <InfoPanel title="Адрес и карта">
        <p className="address">
          <MapPin size={15} />
          {selectedStudio.address}
        </p>
        <YandexMap studio={selectedStudio} />
      </InfoPanel>

      <button className="primary-button sticky-action" onClick={onBook}>
        Выбрать время
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

function BookingScreen({
  selectedSlot,
  selectedStudio,
  onSelectSlot,
  onPay
}: {
  selectedSlot: Slot;
  selectedStudio: Studio;
  onSelectSlot: (slot: Slot) => void;
  onPay: () => void;
}) {
  return (
    <div className="booking">
      <div className="section-title">
        <h1>Выбор времени</h1>
        <span>{selectedStudio.name}</span>
      </div>

      <div className="date-card">
        <CalendarDays size={20} />
        <div>
          <strong>Сегодня, 7 июня</strong>
          <span>Моментальное подтверждение после mock-оплаты</span>
        </div>
      </div>

      <div className="slot-grid">
        {selectedStudio.slots.map((slot) => (
          <button
            className={slot.id === selectedSlot.id ? "slot active" : "slot"}
            key={slot.id}
            onClick={() => onSelectSlot(slot)}
          >
            <span>{slot.time}</span>
            <strong>{slot.price.toLocaleString("ru-RU")} ₽</strong>
          </button>
        ))}
      </div>

      <InfoPanel title="Что входит">
        <ul className="clean-list">
          <li>Аренда комнаты на 1 час</li>
          <li>Базовая помощь инженера</li>
          <li>Подготовка микрофонной цепи</li>
        </ul>
      </InfoPanel>

      <button className="primary-button sticky-action" onClick={onPay}>
        Перейти к оплате
        <CreditCard size={18} />
      </button>
    </div>
  );
}

function PaymentScreen({
  total,
  selectedSlot,
  selectedStudio,
  onConfirm
}: {
  total: number;
  selectedSlot: Slot;
  selectedStudio: Studio;
  onConfirm: () => void;
}) {
  return (
    <div className="payment">
      <div className="payment-card">
        <div className="payment-icon">
          <ShieldCheck size={28} />
        </div>
        <span className="eyebrow">Mock payment</span>
        <h1>{total.toLocaleString("ru-RU")} ₽</h1>
        <p>
          {selectedStudio.name}, сегодня в {selectedSlot.time}. Реальная платежка пока не подключена.
        </p>
      </div>

      <div className="method-list">
        <button className="method active">
          <CreditCard size={19} />
          <span>Карта **** 2042</span>
          <Check size={17} />
        </button>
        <button className="method">
          <WalletCards size={19} />
          <span>Telegram Pay later</span>
        </button>
      </div>

      <button className="primary-button sticky-action" onClick={onConfirm}>
        Подтвердить mock-оплату
        <Sparkles size={18} />
      </button>
    </div>
  );
}

function SuccessScreen({
  selectedSlot,
  selectedStudio,
  onHome
}: {
  selectedSlot: Slot;
  selectedStudio: Studio;
  onHome: () => void;
}) {
  return (
    <div className="success">
      <div className="success-mark">
        <Check size={36} />
      </div>
      <h1>Бронь подтверждена</h1>
      <p>
        {selectedStudio.name} ждет тебя сегодня в {selectedSlot.time}. Детали брони уже в профиле.
      </p>
      <div className="confirmation-card">
        <span>Адрес</span>
        <strong>{selectedStudio.address}</strong>
      </div>
      <button className="primary-button" onClick={onHome}>
        Вернуться в каталог
      </button>
    </div>
  );
}

function ProfileScreen({ favoriteCount }: { favoriteCount: number }) {
  return (
    <div className="profile">
      <div className="role-switch">
        <button className="active">Клиент</button>
        <button>Студия</button>
      </div>

      <div className="profile-card">
        <div className="avatar">SR</div>
        <div>
          <h1>Гость StudioRent</h1>
          <span>Telegram Mini App профиль</span>
        </div>
      </div>

      <div className="profile-grid">
        <InfoTile icon={<CalendarDays size={18} />} label="Брони" value="1 активная" />
        <InfoTile icon={<Heart size={18} />} label="Избранное" value={`${favoriteCount} студии`} />
        <InfoTile icon={<CreditCard size={18} />} label="Оплата" value="Mock mode" />
        <InfoTile icon={<Settings2 size={18} />} label="Студия" value="Скоро" />
      </div>
    </div>
  );
}

function SectionHeader({ action, title }: { action: string; title: string }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      <button>
        {action}
        <ChevronRight size={15} />
      </button>
    </div>
  );
}

function InfoPanel({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="info-panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="metric">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function InfoTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="info-tile">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function YandexMap({ studio }: { studio: Studio }) {
  const mapId = `map-${studio.id}`;

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
    const element = document.getElementById(mapId);

    if (!apiKey || !element) {
      return;
    }

    const initMap = () => {
      if (!window.ymaps || element.dataset.loaded === "true") {
        return;
      }

      window.ymaps.ready(() => {
        const map = new window.ymaps!.Map(
          element,
          {
            center: studio.coordinates,
            controls: [],
            zoom: 15
          },
          {
            suppressMapOpenBlock: true
          }
        ) as { geoObjects?: { add: (placemark: unknown) => void } };

        const placemark = new window.ymaps!.Placemark(
          studio.coordinates,
          { hintContent: studio.name, balloonContent: studio.address },
          { preset: "islands#redMusicIcon" }
        );

        map.geoObjects?.add(placemark);
        element.dataset.loaded = "true";
      });
    };

    if (window.ymaps) {
      initMap();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>("#yandex-maps-api");
    if (existingScript) {
      existingScript.addEventListener("load", initMap, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = "yandex-maps-api";
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
    script.async = true;
    script.addEventListener("load", initMap, { once: true });
    document.head.appendChild(script);
  }, [mapId, studio.address, studio.coordinates, studio.id, studio.name]);

  return (
    <div className="map-preview">
      <div className="map-canvas" id={mapId} aria-label={`Карта: ${studio.address}`} />
      <div className="map-overlay">
        <MapPin size={15} />
        <span>{studio.metro}</span>
      </div>
    </div>
  );
}

function BottomNav({ current, onNavigate }: { current: View; onNavigate: (view: View) => void }) {
  return (
    <nav className="bottom-nav">
      <button className={current === "catalog" ? "active" : ""} onClick={() => onNavigate("catalog")}>
        <Home size={21} />
      </button>
      <button className={current === "catalog" ? "" : ""} onClick={() => onNavigate("catalog")}>
        <ListFilter size={21} />
      </button>
      <button className="nav-plus" onClick={() => onNavigate("booking")}>
        <CalendarDays size={22} />
      </button>
      <button onClick={() => onNavigate("catalog")}>
        <Heart size={21} />
      </button>
      <button className={current === "profile" ? "active" : ""} onClick={() => onNavigate("profile")}>
        <User size={21} />
      </button>
    </nav>
  );
}
