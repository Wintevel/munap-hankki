import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  Bell,
  BellOff,
  Check,
  CheckCircle2,
  ChevronLeft,
  Clock,
  CookingPot,
  House,
  Info,
  Leaf,
  Minus,
  PackageCheck,
  PhoneOff,
  Plus,
  RotateCcw,
  Salad,
  ShieldCheck,
  ShoppingBag,
  Soup,
  Trash2,
  UtensilsCrossed,
} from 'lucide-react'
import { commonOptions, defaultOptions, menuItems } from './data/menuData.js'

const defaultSafetySettings = {
  noPhoneCall: true,
  noDoorbell: true,
  leaveAtDoor: true,
  exceptionContact: 'app-notification',
}

const menuIcons = {
  bowl: CookingPot,
  pasta: UtensilsCrossed,
  salad: Salad,
  soup: Soup,
}

const safetyItems = [
  {
    key: 'noPhoneCall',
    title: '전화하지 않기',
    shortTitle: '전화하지 않기',
    description: '필요할 때 앱 알림으로만 알려드려요.',
    icon: PhoneOff,
  },
  {
    key: 'noDoorbell',
    title: '벨 누르지 않기',
    shortTitle: '벨 누르지 않기',
    description: '도착 알림은 조용히 보내드려요.',
    icon: BellOff,
  },
  {
    key: 'leaveAtDoor',
    title: '문 앞에 두기',
    shortTitle: '문 앞에 두기',
    description: '대면 없이 지정 위치에 놓아드려요.',
    icon: PackageCheck,
  },
]

function formatPrice(price) {
  return `${price.toLocaleString('ko-KR')}원`
}

function Brand() {
  return (
    <div className="brand" aria-label="문앞한끼 홈">
      <span className="brand__mark" aria-hidden="true">
        <House size={25} strokeWidth={2.3} />
      </span>
      <span>문앞한끼</span>
    </div>
  )
}

function MenuIcon({ menu, size = 28 }) {
  const Icon = menuIcons[menu.icon] ?? Leaf

  return (
    <span
      className="menu-icon"
      style={{ backgroundColor: menu.accent, color: menu.iconColor }}
      aria-hidden="true"
    >
      <Icon size={size} strokeWidth={2} />
    </span>
  )
}

function SafeToggle({ item, active, onToggle }) {
  const Icon = item.icon

  return (
    <div className={`safe-toggle-row ${active ? 'is-active' : ''}`}>
      <span className="safe-toggle-row__icon" aria-hidden="true">
        <Icon size={22} />
      </span>
      <span className="safe-toggle-row__copy">
        <strong>{item.title}</strong>
        <small>{item.description}</small>
      </span>
      <button
        className="switch"
        type="button"
        role="switch"
        aria-checked={active}
        aria-label={`${item.title} ${active ? '끄기' : '켜기'}`}
        onClick={onToggle}
      >
        <span className="switch__thumb" />
        <span className="sr-only">{active ? '켜짐' : '꺼짐'}</span>
      </button>
    </div>
  )
}

function SetupScreen({ settings, activeCount, onToggle, onContinue }) {
  const statusText =
    activeCount === 3
      ? '3개 모두 켜짐'
      : activeCount === 0
        ? '모두 꺼짐'
        : `${activeCount}개 켜짐`

  return (
    <div className="setup-screen">
      <header className="setup-header page-width">
        <Brand />
        <div className="quiet-badge">
          <span aria-hidden="true" />
          대화 없이 주문할 수 있어요
        </div>
      </header>

      <div className="setup-layout page-width">
        <section className="hero" aria-labelledby="setup-title">
          <p className="audience-label">대화나 대면이 부담스러운 사람을 위한 배달 서비스</p>
          <h1 id="setup-title">내가 정한 방식 그대로<br />도착하는 한 끼.</h1>
          <p className="hero__description">
            전화와 초인종 걱정 없이, 먼저 안심 설정을 정하고<br />편안한 마음으로 메뉴를 골라보세요.
          </p>

          <div className="benefit-chips" aria-label="주요 안심 기능">
            <span><PhoneOff size={20} aria-hidden="true" />전화 없이</span>
            <span><BellOff size={20} aria-hidden="true" />초인종 없이</span>
            <span><PackageCheck size={20} aria-hidden="true" />문 앞에 두기</span>
          </div>

          <div className="flow-preview" aria-label="이용 순서">
            <p>이용 순서</p>
            <ol>
              <li className="is-current"><span>1</span>안심 설정</li>
              <li><span>2</span>메뉴 선택</li>
              <li><span>3</span>주문 확인</li>
            </ol>
          </div>

          <div className="reassurance">
            <span className="reassurance__check" aria-hidden="true"><Check size={20} /></span>
            <div>
              <strong>원하지 않는 연락은 하지 않아요.</strong>
              <p>필요한 상황은 앱 알림으로만 조용히 알려드려요.</p>
            </div>
          </div>
        </section>

        <section className="safety-card" aria-labelledby="safety-card-title">
          <div className="safety-card__step">안심 설정</div>
          <div className="safety-card__heading">
            <div>
              <h2 id="safety-card-title">배달받을 방식을 먼저 정해요</h2>
              <p>원하는 항목만 켜고 끌 수 있어요.</p>
            </div>
            <span className="setting-count" aria-live="polite">{statusText}</span>
          </div>

          <div className="safe-toggle-list">
            {safetyItems.map((item) => (
              <SafeToggle
                key={item.key}
                item={item}
                active={settings[item.key]}
                onToggle={() => onToggle(item.key)}
              />
            ))}
          </div>

          <div className="exception-note">
            <span aria-hidden="true"><Info size={19} /></span>
            <div>
              <strong>불가피할 때만 앱 알림 받기</strong>
              <p>주소 확인이 꼭 필요하면 전화 대신 앱 알림을 보내요.</p>
            </div>
          </div>

          <button className="primary-button" type="button" onClick={onContinue}>
            안심 설정 확인하고 메뉴 보기
            <ArrowRight size={21} aria-hidden="true" />
          </button>
          <p className="card-footnote">설정은 주문 전 언제든 바꿀 수 있어요.</p>
        </section>
      </div>
    </div>
  )
}

function ProgressHeader({ current, settings, finalLabel = '주문 완료' }) {
  const steps = [
    { number: 1, label: '메뉴 선택' },
    { number: 2, label: '주문 확인' },
    { number: 3, label: finalLabel },
  ]
  const activeCount = safetyItems.filter((item) => settings[item.key]).length

  return (
    <header className="progress-header">
      <div className="page-width progress-header__inner">
        <Brand />
        <ol className="progress-steps" aria-label="주문 진행 단계">
          {steps.map((step) => (
            <li
              key={step.number}
              className={`${current === step.number ? 'is-current' : ''} ${current > step.number ? 'is-done' : ''}`}
              aria-current={current === step.number ? 'step' : undefined}
            >
              <span>{current > step.number ? <Check size={15} /> : step.number}</span>
              {step.label}
            </li>
          ))}
        </ol>
        <div className="header-safety-summary">
          <ShieldCheck size={18} aria-hidden="true" />
          안심 설정 {activeCount}개 켜짐
        </div>
      </div>
    </header>
  )
}

function MenuScreen({
  settings,
  selectedMenu,
  selectedOptions,
  quantity,
  cartCount,
  cartTotal,
  onSelectMenu,
  onOptionChange,
  onQuantityChange,
  onAddToCart,
  onGoBack,
  onReview,
}) {
  const optionExtra = commonOptions.reduce((total, group) => {
    const choice = group.choices.find((item) => item.id === selectedOptions[group.id])
    return total + (choice?.price ?? 0)
  }, 0)
  const configuredTotal = (selectedMenu.basePrice + optionExtra) * quantity

  return (
    <div className="app-screen">
      <ProgressHeader current={1} settings={settings} />
      <div className="page-width app-content">
        <button className="text-button back-button" type="button" onClick={onGoBack}>
          <ChevronLeft size={18} aria-hidden="true" /> 안심 설정으로
        </button>
        <div className="screen-heading">
          <div>
            <p className="eyebrow">2 / 3 메뉴 선택</p>
            <h1>오늘 먹고 싶은 한 끼를 골라보세요</h1>
            <p>메뉴를 고른 뒤 오른쪽에서 공통 옵션과 수량을 정할 수 있어요.</p>
          </div>
          <div className="safety-inline">
            <ShieldCheck size={20} aria-hidden="true" />
            <span>안심 설정이 주문까지 유지돼요</span>
          </div>
        </div>

        <div className="menu-workspace">
          <section className="menu-list-panel" aria-labelledby="menu-list-title">
            <div className="panel-heading">
              <h2 id="menu-list-title">메뉴 4개</h2>
              <span>Mock 데이터</span>
            </div>
            <div className="menu-list">
              {menuItems.map((menu) => {
                const isSelected = selectedMenu.id === menu.id
                return (
                  <button
                    key={menu.id}
                    className={`menu-card ${isSelected ? 'is-selected' : ''}`}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => onSelectMenu(menu.id)}
                  >
                    <MenuIcon menu={menu} />
                    <span className="menu-card__copy">
                      <span className="menu-card__meta">{menu.category} · {menu.time}</span>
                      <strong>{menu.name}</strong>
                      <small>{menu.description}</small>
                      <b>{formatPrice(menu.basePrice)}</b>
                    </span>
                    <span className="menu-card__check" aria-hidden="true">
                      {isSelected && <Check size={16} />}
                    </span>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="option-panel" aria-labelledby="option-panel-title">
            <div className="selected-menu-summary">
              <MenuIcon menu={selectedMenu} size={32} />
              <div>
                <p>선택한 메뉴</p>
                <h2 id="option-panel-title">{selectedMenu.name}</h2>
                <span>{formatPrice(selectedMenu.basePrice)}부터</span>
              </div>
            </div>

            <div className="option-groups">
              {commonOptions.map((group) => (
                <fieldset key={group.id} className="option-group">
                  <legend>{group.label}</legend>
                  <div className="option-choices">
                    {group.choices.map((choice) => (
                      <label
                        key={choice.id}
                        className={selectedOptions[group.id] === choice.id ? 'is-selected' : ''}
                      >
                        <input
                          type="radio"
                          name={group.id}
                          value={choice.id}
                          checked={selectedOptions[group.id] === choice.id}
                          onChange={() => onOptionChange(group.id, choice.id)}
                        />
                        <span>{choice.label}</span>
                        <small>{choice.price ? `+${formatPrice(choice.price)}` : '추가 금액 없음'}</small>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>

            <div className="quantity-row">
              <div>
                <strong>수량</strong>
                <small>한 번에 담을 수량이에요.</small>
              </div>
              <div className="quantity-control" aria-label="수량 조절">
                <button
                  type="button"
                  aria-label="수량 줄이기"
                  disabled={quantity === 1}
                  onClick={() => onQuantityChange(quantity - 1)}
                >
                  <Minus size={18} />
                </button>
                <output aria-live="polite">{quantity}</output>
                <button
                  type="button"
                  aria-label="수량 늘리기"
                  onClick={() => onQuantityChange(quantity + 1)}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <div className="configured-total">
              <span>담을 금액</span>
              <strong>{formatPrice(configuredTotal)}</strong>
            </div>
            <button className="primary-button" type="button" onClick={onAddToCart}>
              <ShoppingBag size={20} aria-hidden="true" />
              장바구니에 담기
            </button>
          </section>
        </div>

        <div className={`cart-dock ${cartCount ? 'has-items' : ''}`} aria-live="polite">
          <div>
            <span className="cart-dock__icon"><ShoppingBag size={21} aria-hidden="true" /></span>
            <p>
              <strong>{cartCount ? `${cartCount}개 메뉴가 담겼어요` : '아직 담은 메뉴가 없어요'}</strong>
              <small>{cartCount ? '주문 확인에서 메뉴와 안심 설정을 다시 볼 수 있어요.' : '메뉴와 옵션을 정한 뒤 장바구니에 담아주세요.'}</small>
            </p>
          </div>
          <div className="cart-dock__action">
            <strong>{formatPrice(cartTotal)}</strong>
            <button type="button" disabled={!cartCount} onClick={onReview}>
              주문 확인하기 <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SafetySummary({ settings, onEdit }) {
  return (
    <section className="review-card safety-review-card" aria-labelledby="safety-review-title">
      <div className="review-card__heading">
        <div>
          <p className="eyebrow">안심 주문 설정</p>
          <h2 id="safety-review-title">배달받을 방식</h2>
        </div>
        {onEdit && <button className="text-button" type="button" onClick={onEdit}>수정</button>}
      </div>
      <ul className="safety-summary-list">
        {safetyItems.map((item) => {
          const Icon = item.icon
          const active = settings[item.key]
          return (
            <li key={item.key} className={active ? 'is-active' : 'is-off'}>
              <Icon size={19} aria-hidden="true" />
              <span>{item.shortTitle}</span>
              <strong>{active ? '켜짐' : '꺼짐'}</strong>
            </li>
          )
        })}
      </ul>
      <div className="notification-method">
        <Bell size={18} aria-hidden="true" />
        <span>예외 연락은 전화 대신 앱 알림으로 받아요.</span>
      </div>
    </section>
  )
}

function ReviewScreen({ settings, cart, total, onBack, onEditSettings, onRemove, onOrder }) {
  const getChoiceLabel = (groupId, choiceId) =>
    commonOptions
      .find((group) => group.id === groupId)
      ?.choices.find((choice) => choice.id === choiceId)?.label ?? choiceId

  return (
    <div className="app-screen">
      <ProgressHeader current={2} settings={settings} />
      <div className="page-width app-content review-content">
        <button className="text-button back-button" type="button" onClick={onBack}>
          <ChevronLeft size={18} aria-hidden="true" /> 메뉴 더 보기
        </button>
        <div className="screen-heading">
          <div>
            <p className="eyebrow">3 / 3 주문 확인</p>
            <h1>이대로 주문할까요?</h1>
            <p>메뉴와 안심 설정을 한 번 더 확인해 주세요.</p>
          </div>
        </div>

        <div className="review-layout">
          <section className="review-card order-review-card" aria-labelledby="order-review-title">
            <div className="review-card__heading">
              <div>
                <p className="eyebrow">주문 메뉴</p>
                <h2 id="order-review-title">{cart.length}가지 구성</h2>
              </div>
            </div>
            <ul className="review-items">
              {cart.map((item) => (
                <li key={item.id}>
                  <MenuIcon menu={item.menu} size={24} />
                  <div className="review-item__copy">
                    <strong>{item.menu.name}</strong>
                    <span>
                      {getChoiceLabel('portion', item.options.portion)} · {getChoiceLabel('drink', item.options.drink)} · {item.quantity}개
                    </span>
                  </div>
                  <b>{formatPrice(item.unitPrice * item.quantity)}</b>
                  <button type="button" aria-label={`${item.menu.name} 삭제`} onClick={() => onRemove(item.id)}>
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="order-total">
              <span>총 결제 예정 금액</span>
              <strong>{formatPrice(total)}</strong>
            </div>
          </section>

          <div className="review-side">
            <SafetySummary settings={settings} onEdit={onEditSettings} />
            <div className="final-action-card">
              <div>
                <Clock size={20} aria-hidden="true" />
                <span>예상 도착</span>
                <strong>25~35분</strong>
              </div>
              <p>실제 결제와 배달 요청은 발생하지 않는 과제용 화면입니다.</p>
              <button className="primary-button" type="button" disabled={!cart.length} onClick={onOrder}>
                {formatPrice(total)} 주문하기
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProcessingScreen({ settings, cartCount }) {
  return (
    <div className="app-screen">
      <ProgressHeader current={3} settings={settings} finalLabel="접수 중" />
      <div className="status-screen" role="status" aria-live="polite">
        <div className="processing-spinner" aria-hidden="true">
          <span />
        </div>
        <p className="eyebrow">주문 처리 중</p>
        <h1>안심 설정과 메뉴를 전달하고 있어요</h1>
        <p>{cartCount}개 메뉴와 요청하신 배달 방식을 확인하고 있습니다.</p>
        <div className="processing-note">
          <PhoneOff size={19} aria-hidden="true" />
          전화 없이 앱 안에서 조용히 처리해요.
        </div>
      </div>
    </div>
  )
}

function CompleteScreen({ settings, cart, total, notificationConfirmed, onConfirmAddress, onRestart }) {
  return (
    <div className="app-screen complete-screen">
      <ProgressHeader current={3} settings={settings} />
      <div className="page-width complete-content">
        <section className="complete-hero" aria-labelledby="complete-title">
          <span className="success-icon" aria-hidden="true"><CheckCircle2 size={38} /></span>
          <p className="eyebrow">주문 접수 완료</p>
          <h1 id="complete-title">주문이 조용히 접수됐어요</h1>
          <p>원하신 안심 설정은 배달이 끝날 때까지 그대로 유지됩니다.</p>
          <span className="order-number">주문번호 MH-0717-001</span>
        </section>

        <div className="complete-grid">
          <section
            className={`app-notification ${notificationConfirmed ? 'is-confirmed' : ''}`}
            role={notificationConfirmed ? 'status' : 'alert'}
            aria-live="polite"
          >
            <span className="app-notification__icon" aria-hidden="true">
              {notificationConfirmed ? <Check size={24} /> : <Bell size={24} />}
            </span>
            <div className="app-notification__copy">
              <p>문앞한끼 앱 알림</p>
              <h2>{notificationConfirmed ? '상세 주소 확인이 전달됐어요' : '상세 주소를 확인해 주세요'}</h2>
              <span>
                {notificationConfirmed
                  ? '전화 없이 앱에서 확인한 내용이 가게에 전달되었습니다.'
                  : '배달 위치가 101동 공동현관 앞이 맞는지 확인이 필요해요. 전화는 드리지 않아요.'}
              </span>
            </div>
            {!notificationConfirmed && (
              <button type="button" onClick={onConfirmAddress}>주소가 맞아요</button>
            )}
          </section>

          <section className="complete-summary" aria-labelledby="complete-summary-title">
            <div className="review-card__heading">
              <div>
                <p className="eyebrow">주문 내용</p>
                <h2 id="complete-summary-title">한 끼 주문 요약</h2>
              </div>
              <strong>{formatPrice(total)}</strong>
            </div>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <span>{item.menu.name} · {item.quantity}개</span>
                  <b>{formatPrice(item.unitPrice * item.quantity)}</b>
                </li>
              ))}
            </ul>
            <div className="complete-safety-lines">
              {safetyItems.map((item) => (
                <span key={item.key} className={settings[item.key] ? 'is-on' : 'is-off'}>
                  {settings[item.key] ? <Check size={15} /> : <Minus size={15} />}
                  {item.shortTitle} {settings[item.key] ? '켜짐' : '꺼짐'}
                </span>
              ))}
            </div>
          </section>
        </div>

        <button className="secondary-button restart-button" type="button" onClick={onRestart}>
          <RotateCcw size={18} aria-hidden="true" /> 처음부터 다시 보기
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [currentStep, setCurrentStep] = useState('setup')
  const [safeOrderSettings, setSafeOrderSettings] = useState(defaultSafetySettings)
  const [selectedMenuId, setSelectedMenuId] = useState(menuItems[0].id)
  const [selectedOptions, setSelectedOptions] = useState(defaultOptions)
  const [quantity, setQuantity] = useState(1)
  const [cart, setCart] = useState([])
  const [notificationConfirmed, setNotificationConfirmed] = useState(false)
  const pageRef = useRef(null)

  const selectedMenu = menuItems.find((menu) => menu.id === selectedMenuId) ?? menuItems[0]
  const activeSafetyCount = safetyItems.filter((item) => safeOrderSettings[item.key]).length
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0)

  const selectedOptionExtra = useMemo(
    () =>
      commonOptions.reduce((total, group) => {
        const choice = group.choices.find((item) => item.id === selectedOptions[group.id])
        return total + (choice?.price ?? 0)
      }, 0),
    [selectedOptions],
  )

  useEffect(() => {
    pageRef.current?.focus()
  }, [currentStep])

  useEffect(() => {
    if (currentStep !== 'processing') return undefined

    const timerId = window.setTimeout(() => {
      setCurrentStep('complete')
    }, 1500)

    return () => window.clearTimeout(timerId)
  }, [currentStep])

  function toggleSafetySetting(key) {
    setSafeOrderSettings((current) => ({
      ...current,
      [key]: !current[key],
    }))
  }

  function selectMenu(menuId) {
    setSelectedMenuId(menuId)
    setSelectedOptions(defaultOptions)
    setQuantity(1)
  }

  function updateOption(groupId, choiceId) {
    setSelectedOptions((current) => ({
      ...current,
      [groupId]: choiceId,
    }))
  }

  function addToCart() {
    const itemId = `${selectedMenu.id}-${selectedOptions.portion}-${selectedOptions.drink}`
    const unitPrice = selectedMenu.basePrice + selectedOptionExtra
    const cartItem = {
      id: itemId,
      menu: { ...selectedMenu },
      options: { ...selectedOptions },
      quantity,
      unitPrice,
    }

    setCart((current) => {
      const existingItem = current.find((item) => item.id === itemId)
      if (!existingItem) return [...current, cartItem]

      return current.map((item) =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      )
    })
    setQuantity(1)
  }

  function removeCartItem(itemId) {
    const nextCart = cart.filter((item) => item.id !== itemId)
    setCart(nextCart)

    if (nextCart.length === 0) {
      setCurrentStep('menu')
    }
  }

  function restart() {
    setCurrentStep('setup')
    setSafeOrderSettings(defaultSafetySettings)
    setSelectedMenuId(menuItems[0].id)
    setSelectedOptions(defaultOptions)
    setQuantity(1)
    setCart([])
    setNotificationConfirmed(false)
  }

  let screen

  if (currentStep === 'setup') {
    screen = (
      <SetupScreen
        settings={safeOrderSettings}
        activeCount={activeSafetyCount}
        onToggle={toggleSafetySetting}
        onContinue={() => setCurrentStep('menu')}
      />
    )
  } else if (currentStep === 'menu') {
    screen = (
      <MenuScreen
        settings={safeOrderSettings}
        selectedMenu={selectedMenu}
        selectedOptions={selectedOptions}
        quantity={quantity}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onSelectMenu={selectMenu}
        onOptionChange={updateOption}
        onQuantityChange={setQuantity}
        onAddToCart={addToCart}
        onGoBack={() => setCurrentStep('setup')}
        onReview={() => cart.length && setCurrentStep('review')}
      />
    )
  } else if (currentStep === 'review') {
    screen = (
      <ReviewScreen
        settings={safeOrderSettings}
        cart={cart}
        total={cartTotal}
        onBack={() => setCurrentStep('menu')}
        onEditSettings={() => setCurrentStep('setup')}
        onRemove={removeCartItem}
        onOrder={() => setCurrentStep('processing')}
      />
    )
  } else if (currentStep === 'processing') {
    screen = <ProcessingScreen settings={safeOrderSettings} cartCount={cartCount} />
  } else {
    screen = (
      <CompleteScreen
        settings={safeOrderSettings}
        cart={cart}
        total={cartTotal}
        notificationConfirmed={notificationConfirmed}
        onConfirmAddress={() => setNotificationConfirmed(true)}
        onRestart={restart}
      />
    )
  }

  return (
    <main ref={pageRef} className="app" tabIndex="-1">
      {screen}
    </main>
  )
}
