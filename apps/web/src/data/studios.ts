export type Slot = {
  id: string;
  time: string;
  price: number;
};

export type Studio = {
  id: string;
  name: string;
  district: string;
  metro: string;
  walkMinutes: number;
  address: string;
  coordinates: [number, number];
  rating: number;
  priceFrom: number;
  description: string;
  tags: string[];
  features: string[];
  equipment: string[];
  images: string[];
  slots: Slot[];
};

export const studios: Studio[] = [
  {
    id: "mono-room",
    name: "Mono Room",
    district: "Таганский",
    metro: "Курская",
    walkMinutes: 6,
    address: "Москва, Нижний Сусальный пер., 5с4",
    coordinates: [55.7596, 37.6612],
    rating: 4.9,
    priceFrom: 2200,
    description:
      "Камерная vocal room для записи треков, демо и куплетов. Подходит для рэпа, поп-вокала и быстрых ночных сессий.",
    tags: ["Вокал", "Рэп", "Инженер"],
    features: ["Инженер", "24/7", "У метро"],
    equipment: ["Neumann TLM 103", "Apollo Twin", "Yamaha HS8", "Auto-Tune", "Vocal booth"],
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=900&q=80"
    ],
    slots: [
      { id: "mono-18", time: "18:00", price: 2200 },
      { id: "mono-20", time: "20:00", price: 2400 },
      { id: "mono-23", time: "23:00", price: 2600 }
    ]
  },
  {
    id: "redline",
    name: "Redline Records",
    district: "Пресненский",
    metro: "Улица 1905 года",
    walkMinutes: 8,
    address: "Москва, Звенигородское ш., 3",
    coordinates: [55.7635, 37.5609],
    rating: 4.8,
    priceFrom: 2800,
    description:
      "Студия для полноценной записи треков с инженерной сменой, плотным мониторингом и подготовленными пресетами.",
    tags: ["Вокал", "Сведение", "Премиум"],
    features: ["Инженер", "Парковка", "У метро"],
    equipment: ["Sony C-800G chain", "UAD Apollo x8", "Focal Twin6", "SSL plugins", "Комната A"],
    images: [
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=80"
    ],
    slots: [
      { id: "red-17", time: "17:00", price: 2800 },
      { id: "red-19", time: "19:00", price: 3200 },
      { id: "red-22", time: "22:00", price: 3400 }
    ]
  },
  {
    id: "north-sound",
    name: "North Sound",
    district: "Савеловский",
    metro: "Дмитровская",
    walkMinutes: 5,
    address: "Москва, Бутырская ул., 46",
    coordinates: [55.808, 37.5814],
    rating: 4.7,
    priceFrom: 1800,
    description:
      "Доступная студия для демо, куплетов и быстрых правок. Можно прийти со своим проектом и добить запись за час.",
    tags: ["Демо", "Вокал", "Бюджет"],
    features: ["Инженер", "У метро"],
    equipment: ["Rode NTK", "Audient iD44", "Adam T7V", "Waves bundle", "Комната B"],
    images: [
      "https://images.unsplash.com/photo-1524650359799-842906ca1c06?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1618609378039-b572f64c5b42?auto=format&fit=crop&w=900&q=80"
    ],
    slots: [
      { id: "north-16", time: "16:00", price: 1800 },
      { id: "north-21", time: "21:00", price: 2100 },
      { id: "north-00", time: "00:00", price: 2300 }
    ]
  },
  {
    id: "wave-factory",
    name: "Wave Factory",
    district: "Басманный",
    metro: "Бауманская",
    walkMinutes: 7,
    address: "Москва, Бауманская ул., 11",
    coordinates: [55.7726, 37.6794],
    rating: 4.8,
    priceFrom: 2500,
    description:
      "Акустически подготовленная студия для чистой вокальной записи, припевов и продакшн-сессий с продюсером.",
    tags: ["Поп", "Вокал", "Продюсер"],
    features: ["Инженер", "Продюсер", "У метро"],
    equipment: ["AKG C414", "RME Fireface", "Genelec 8030", "Melodyne", "Vocal booth"],
    images: [
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520170350707-b2da59970118?auto=format&fit=crop&w=900&q=80"
    ],
    slots: [
      { id: "wave-15", time: "15:00", price: 2500 },
      { id: "wave-18", time: "18:00", price: 2700 },
      { id: "wave-21", time: "21:00", price: 2900 }
    ]
  }
];

