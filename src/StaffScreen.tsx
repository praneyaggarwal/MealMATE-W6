import './StaffScreen.css'

export type Screen = 'nameGate' | 'staff' | 'dietary' | 'admin'
export const DEFAULT_NAME = 'Praney Aggarwal'

type StaffScreenProps = {
  name: string
  onNameChange: (name: string) => void
  screen: Screen
  onNavigate: (screen: Screen) => void
}

const preferences = [
  { name: 'Vegan', selected: false },
  { name: 'Vegetarian', selected: true },
  { name: 'Gluten-Free', selected: false },
  { name: 'Nut-Free', selected: false },
  { name: 'Halal', selected: false },
]

const menuDishes = [
  {
    name: 'Lemon herb chicken',
    description: 'Roasted potatoes, green beans',
    price: '12.5',
  },
  {
    name: 'Miso aubergine bowl',
    description: 'Brown rice, edamame, sesame',
    price: '11',
  },
  {
    name: 'Pesto pasta',
    description: 'Cherry tomatoes, parmesan, rocket',
    price: '10.5',
  },
]

const orders = [
  { name: 'Lemon herb chicken', count: 8 },
  { name: 'Miso aubergine bowl', count: 5 },
  { name: 'Pesto pasta', count: 6 },
]

function Header() {
  return (
    <header className="staff-header">
      <div>
        <p className="staff-eyebrow">OFFICE LUNCH</p>
        <h1 className="staff-brand">MealMate</h1>
      </div>
      <span className="staff-avatar" aria-label="MealMate user">
        MM
      </span>
    </header>
  )
}

function Navigation({
  screen,
  onNavigate,
}: Pick<StaffScreenProps, 'screen' | 'onNavigate'>) {
  const activeScreen = screen === 'nameGate' ? 'staff' : screen
  const tabs: { label: string; screen: Screen }[] = [
    { label: 'My lunch', screen: 'staff' },
    { label: 'Dietary', screen: 'dietary' },
    { label: 'Admin', screen: 'admin' },
  ]

  return (
    <nav className="staff-navigation" aria-label="Main navigation">
      {tabs.map((tab) => (
        <button
          aria-current={activeScreen === tab.screen ? 'page' : undefined}
          className={`staff-nav-item${activeScreen === tab.screen ? ' staff-nav-item-active' : ''}`}
          key={tab.screen}
          onClick={() => onNavigate(tab.screen)}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}

function NameGate({
  name,
  onNameChange,
  onContinue,
}: {
  name: string
  onNameChange: (name: string) => void
  onContinue: () => void
}) {
  return (
    <>
      <p className="staff-date">Thursday 8 October</p>
      <section className="staff-welcome" aria-labelledby="welcome-title">
        <div className="staff-welcome-icon" aria-hidden="true">
          M
        </div>
        <h2 id="welcome-title">Welcome to MealMate</h2>
        <p className="staff-welcome-copy">
          Enter your name once. We&apos;ll remember it on this device and use it
          to bring back your monthly lunch spending.
        </p>

        <form
          className="staff-name-form"
          onSubmit={(event) => {
            event.preventDefault()
            onContinue()
          }}
        >
          <label htmlFor="staff-name">YOUR NAME</label>
          <input
            autoComplete="name"
            id="staff-name"
            name="name"
            onChange={(event) => onNameChange(event.target.value)}
            type="text"
            value={name}
          />
          <button type="submit">Continue</button>
        </form>
        <p className="staff-note">No password or colleague directory required.</p>
      </section>
    </>
  )
}

function StaffLunch({
  name,
  onNotYou,
}: {
  name: string
  onNotYou: () => void
}) {
  return (
    <section className="staff-content">
      <div className="staff-greeting">
        <span>Hello, {name}</span>
        <span className="staff-status staff-status-closed">CLOSED</span>
      </div>
      <h2 className="staff-page-title">What would you like?</h2>
      <p className="staff-ordering-note">
        <span>Today&apos;s ordering window closed at 10:30.</span>
        <button className="staff-not-you" onClick={onNotYou} type="button">
          Not you?
        </button>
      </p>
      <div className="staff-demo-clock">
        <span className="staff-demo-clock-label">DEMO CLOCK</span>
        <span>Set a time to preview ordering</span>
      </div>
      <p className="staff-filter">
        Showing: <span>Vegetarian</span>
      </p>
      <div className="staff-lunch-dishes">
        {menuDishes.slice(1).map((dish) => (
          <article className="staff-lunch-dish" key={dish.name}>
            <span className="staff-radio" aria-hidden="true" />
            <div>
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
            </div>
            <strong>£{dish.price}</strong>
          </article>
        ))}
      </div>
      <section className="staff-spend" aria-label="Monthly spending">
        <p>SPENT THIS MONTH</p>
        <div>
          <strong>£0.00</strong>
          <span>October 2026</span>
        </div>
        <small>No lunch selected for today</small>
      </section>
    </section>
  )
}

function DietaryPage() {
  return (
    <section className="staff-content">
      <p className="staff-intro">Personalise your menu</p>
      <h2 className="staff-page-title">Dietary Preferences</h2>
      <p className="staff-description">
        Choose any that apply. We&apos;ll use them to show suitable dishes on
        your lunch menu.
      </p>

      <section className="staff-preferences" aria-labelledby="preferences-title">
        <h3 id="preferences-title">MY PREFERENCES</h3>
        <div className="staff-preference-list">
          {preferences.map((preference) => (
            <span
              className={`staff-preference${preference.selected ? ' staff-preference-selected' : ''}`}
              key={preference.name}
            >
              {preference.name}
            </span>
          ))}
        </div>
        <p className="staff-preference-note">
          Leave all options off to see the full menu. With multiple options
          selected, dishes must meet all of them.
        </p>
      </section>

      <button className="staff-save-button" type="button">
        Save and update menu
      </button>
      <p className="staff-cancel">Cancel</p>
    </section>
  )
}

function AdminPage() {
  return (
    <section className="staff-content">
      <div className="staff-date-row">
        <span>Thursday 8 October</span>
        <span className="staff-status">PUBLISHED</span>
      </div>
      <h2 className="staff-page-title">Today&apos;s menu</h2>
      <div className="staff-preview">
        <span>Preview state</span>
        <strong>Sample menu</strong>
        <span>Empty</span>
      </div>
      <div className="staff-admin-dishes">
        {menuDishes.map((dish, index) => (
          <article className="staff-admin-dish" key={dish.name}>
            <div className="staff-admin-dish-head">
              <span>DISH {index + 1}</span>
              <span className="staff-remove">Remove</span>
            </div>
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <div className="staff-admin-price">
              <span>Price</span>
              <strong>£ {dish.price}</strong>
            </div>
          </article>
        ))}
      </div>
      <div className="staff-add-dish">Add another dish</div>
      <div className="staff-published-button">Menu is published</div>
      <section className="staff-orders" aria-labelledby="kitchen-summary">
        <div className="staff-orders-heading">
          <div>
            <p className="staff-eyebrow">LIVE ORDERS</p>
            <h3 id="kitchen-summary">Kitchen summary</h3>
          </div>
          <span>19 meals</span>
        </div>
        <div className="staff-order-list">
          {orders.map((order) => (
            <div className="staff-order-row" key={order.name}>
              <span>{order.name}</span>
              <strong>{order.count}</strong>
            </div>
          ))}
          <div className="staff-order-total">
            <span>Order value</span>
            <strong>£218.00</strong>
          </div>
        </div>
      </section>
    </section>
  )
}

function StaffScreen({
  name,
  onNameChange,
  screen,
  onNavigate,
}: StaffScreenProps) {
  return (
    <main className="staff-screen">
      <Header />
      <Navigation screen={screen} onNavigate={onNavigate} />
      {screen === 'nameGate' && (
        <NameGate
          name={name}
          onNameChange={onNameChange}
          onContinue={() => onNavigate('staff')}
        />
      )}
      {screen === 'staff' && (
        <StaffLunch
          name={name}
          onNotYou={() => {
            onNameChange(DEFAULT_NAME)
            onNavigate('nameGate')
          }}
        />
      )}
      {screen === 'dietary' && <DietaryPage />}
      {screen === 'admin' && <AdminPage />}
    </main>
  )
}

export default StaffScreen
