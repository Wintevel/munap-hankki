export const menuItems = [
  {
    id: 'soy-chicken-bowl',
    name: '간장 닭 덮밥',
    category: '한식',
    description: '부드러운 닭고기와 채소를 담은 담백한 한 그릇',
    basePrice: 9800,
    icon: 'bowl',
    accent: '#DFF4EC',
    iconColor: '#237A67',
    time: '20~30분',
  },
  {
    id: 'basil-tomato-pasta',
    name: '바질 토마토 파스타',
    category: '양식',
    description: '토마토와 바질 향을 가볍게 살린 따뜻한 파스타',
    basePrice: 11500,
    icon: 'pasta',
    accent: '#FFF0E5',
    iconColor: '#B5663A',
    time: '25~35분',
  },
  {
    id: 'chicken-salad',
    name: '닭가슴살 샐러드',
    category: '샐러드',
    description: '구운 닭가슴살과 아삭한 채소를 담은 산뜻한 식사',
    basePrice: 10200,
    icon: 'salad',
    accent: '#EAF5D8',
    iconColor: '#66883E',
    time: '15~25분',
  },
  {
    id: 'pumpkin-soup-set',
    name: '단호박 수프 세트',
    category: '가벼운 식사',
    description: '부드러운 단호박 수프와 작은 빵을 함께 담은 세트',
    basePrice: 8900,
    icon: 'soup',
    accent: '#FFF3CC',
    iconColor: '#A56C18',
    time: '15~20분',
  },
]

export const commonOptions = [
  {
    id: 'portion',
    label: '식사 양',
    choices: [
      { id: 'regular', label: '기본', price: 0 },
      { id: 'large', label: '든든하게', price: 1500 },
    ],
  },
  {
    id: 'drink',
    label: '함께 받을 음료',
    choices: [
      { id: 'none', label: '선택 안 함', price: 0 },
      { id: 'tea', label: '무가당 보리차', price: 1800 },
    ],
  },
]

export const defaultOptions = {
  portion: 'regular',
  drink: 'none',
}
