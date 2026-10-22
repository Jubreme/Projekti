import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'

const SUPABASE_URL = 'https://gynvmhchddfdpzlychsf.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_O9hk82owcPxO-wCf1CbbYA_cPhXxnsW'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const translations = {
  fi: {
    headerTitle: "Raittiusseuranta",
    headerGreeting: "Hei",
    headerSubtitle: "Hienoa työtä kohti terveellisempää elämää.",
    tabTracker: "Seuranta",
    tabSpending: "Arki",
    tabSavings: "Säästöt",
    tabAdd: "Uusi",
    tabJournal: "Päiväkirja",
    tabSettings: "Asetukset",
    totalSavedTitle: "Yhteenlasketut säästöt",
    totalSavedSubtitle: "Yhteensä kaikista seurattavista kohteista",
    substancesTitle: "Seurattavat kohteet",
    noSubstances: "Ei vielä seurattavia kohteita. Lisää yksi 'Uusi' -valikosta!",
    days: "Päivää",
    hours: "Tuntia",
    minutes: "Minuuttia",
    savedWithSubstance: "Säästetty tällä kohteella",
    delete: "Poista",
    spendingTitle: "Päivittäinen arjen rahankäyttö",
    spendingDesc: "Seuraa ja muokkaa arjen kulutustasi (ruoka ja muut menot).",
    calcStartDateLabel: "1. Laskennan aloituspäivä:",
    editDateLabel: "2. Valitse muokattava päivä:",
    foodCostLabel: "Ruokamenot päivälle",
    otherCostLabel: "Muut arjen menot päivälle",
    totalSpentRangeLabel: "Käytetty rahaa yhteensä",
    savingsTitle: "Säästetty raha päihteistä",
    formerCostTitle: "Aseta entinen päihdekulutus",
    formerCostDesc: "Paljonko ennen käytit keskimäärin rahaa päivässä kuhunkin päihteeseen?",
    formerCostInputLabel: "/ pvä",
    calcSavingsStartLabel: "Laske säästöt alkaen päivästä:",
    savedFromDateLabel: "Säästetty rahaa päihteistä",
    allTimeSavingsLabel: "Kaikkien aikojen kokonaissäästöt:",
    addTitle: "Lisää uusi päihde tai tapa",
    substanceNameLabel: "Päihde / Tapa",
    soberDateLabel: "Raittiuden aloituspäivä",
    dailyCostBeforeLabel: "Paljonko käytit ennen päivässä rahaa tähän?",
    addBtn: "Aloita seuranta",
    journalTitle: "Päiväkirja & Ajatukset",
    selectJournalDateLabel: "Valitse tarkasteltava tai muokattava päivä:",
    journalEntryFor: "Päivän",
    journalEntrySuffix: " merkintä:",
    journalPlaceholderToday: "Miltä tänään tuntuu? Kirjoita ajatuksesi...",
    saveJournalBtn: "Tallenna merkintä",
    allEntriesTitle: "Tallennetut merkinnät",
    noEntries: "Ei vielä tallennettuja päiväkirjamerkintöjä.",
    settingsTitle: "Asetukset",
    settingsDesc: "Mukauta sovelluksen ulkoasua, kieltä ja yläpalkin teemaväriä.",
    langLabel: "Kieli / Language",
    currencyLabel: "Valuutta",
    themeLabel: "Yläpalkin teemaväri",
    darkModeLabel: "Tumma tila (Dark Mode)",
    nameChangeLabel: "Muokkaa nimeä",
    nameChangePlaceholder: "Kirjoita uusi nimi",
    saveNameBtn: "Tallenna nimi",
    logoutBtn: "Kirjaudu ulos",
    confirmDelete: "Haluatko varmasti poistaa tämän seurannan?",
    setupWelcome: "Tervetuloa Raittiusseurantaan",
    setupWelcomeDesc: "Aloitetaan syöttämällä perustietosi ja ensimmäinen seurattava kohde.",
    setupCardTitle: "Käyttöönotto",
    yourName: "Nimesi",
    birthDate: "Syntymäaika",
    firstSubstance: "Ensimmäinen päihde / tapa",
    startTrackingBtn: "Jatka sovellukseen",
    darkModeOptions: {
      light: "Vaalea",
      dark: "Tumma"
    },
    themeNames: {
      indigo: "Moderni Indigo",
      emerald: "Smaragdinvihreä",
      coral: "Syvä Koralli",
      violet: "Hämärän Violetti",
      amber: "Auringonlaskun Kulta",
      cyan: "Pohjoisen Syaani"
    }
  },
  en: {
    headerTitle: "Sobriety Tracker",
    headerGreeting: "Hello",
    headerSubtitle: "Great progress towards a healthier lifestyle.",
    tabTracker: "Tracker",
    tabSpending: "Expenses",
    tabSavings: "Savings",
    tabAdd: "New",
    tabJournal: "Journal",
    tabSettings: "Settings",
    totalSavedTitle: "Total Money Saved",
    totalSavedSubtitle: "Combined savings from all tracked habits",
    substancesTitle: "Tracked Habits",
    noSubstances: "No habits tracked yet. Add one from the 'New' tab!",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    savedWithSubstance: "Saved on this habit",
    delete: "Remove",
    spendingTitle: "Daily Living Expenses",
    spendingDesc: "Log and manage your daily living costs.",
    calcStartDateLabel: "1. Start calculating total spending from:",
    editDateLabel: "2. Select date to edit:",
    foodCostLabel: "Food & Groceries for",
    otherCostLabel: "Other Living Expenses for",
    totalSpentRangeLabel: "Total living expenses spent",
    savingsTitle: "Savings from Sobriety",
    formerCostTitle: "Previous Daily Cost",
    formerCostDesc: "How much did you spend daily on each habit on average?",
    formerCostInputLabel: "/ day",
    calcSavingsStartLabel: "Calculate savings starting from:",
    savedFromDateLabel: "Money saved from habits",
    allTimeSavingsLabel: "All-time savings since day one:",
    addTitle: "Add a New Habit or Substance",
    substanceNameLabel: "Habit / Substance Name",
    soberDateLabel: "Sobriety Start Date",
    dailyCostBeforeLabel: "Previous daily expenditure on this habit?",
    addBtn: "Start Tracking",
    journalTitle: "Journal & Reflections",
    selectJournalDateLabel: "Select date to view or write:",
    journalEntryFor: "Journal entry for",
    journalEntrySuffix: ":",
    journalPlaceholderToday: "How are you feeling today?",
    saveJournalBtn: "Save Entry",
    allEntriesTitle: "Recorded Journal Entries",
    noEntries: "No journal entries recorded yet.",
    settingsTitle: "Preferences & Settings",
    settingsDesc: "Customize language, currency, and header theme color.",
    langLabel: "Language / Kieli",
    currencyLabel: "Currency",
    themeLabel: "Header Theme Color",
    darkModeLabel: "Dark Mode",
    nameChangeLabel: "Edit Name",
    nameChangePlaceholder: "Enter new name",
    saveNameBtn: "Save Name",
    logoutBtn: "Log Out",
    confirmDelete: "Are you sure you want to remove this tracked habit?",
    setupWelcome: "Welcome to Sobriety Tracker",
    setupWelcomeDesc: "Let's set up your profile and your first goal.",
    setupCardTitle: "Initial Setup",
    yourName: "Your Name",
    birthDate: "Date of Birth",
    firstSubstance: "First Habit or Substance",
    startTrackingBtn: "Complete Setup",
    darkModeOptions: {
      light: "Light",
      dark: "Dark"
    },
    themeNames: {
      indigo: "Modern Indigo",
      emerald: "Emerald Green",
      coral: "Deep Coral",
      violet: "Twilight Violet",
      amber: "Sunset Amber",
      cyan: "Nordic Cyan"
    }
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  const userLocale = navigator.language || 'fi-FI'
  return date.toLocaleDateString(userLocale, { month: 'short', day: 'numeric', year: 'numeric' })
}

const formatMoney = (amount, currency) => {
  const formattedNum = Number(amount || 0).toFixed(2)
  const symbol = currency === 'USD' ? '$' : '€'
  return `${formattedNum} ${symbol}`
}

const themeOptions = [
  { id: 'indigo', color: '#6366f1', darker: '#4338ca' },
  { id: 'emerald', color: '#059669', darker: '#047857' },
  { id: 'coral', color: '#e11d48', darker: '#be123c' },
  { id: 'violet', color: '#7c3aed', darker: '#6d28d9' },
  { id: 'amber', color: '#d97706', darker: '#b45309' },
  { id: 'cyan', color: '#0284c7', darker: '#0369a1' }
]

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const [activeTab, setActiveTab] = useState('home')
  const [language, setLanguage] = useState('fi')
  const [currency, setCurrency] = useState('EUR')
  const t = translations[language] || translations.fi

  const [selectedThemeId, setSelectedThemeId] = useState('indigo')
  const [isDarkMode, setIsDarkMode] = useState(false)

  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const [username, setUsername] = useState('')
  const [tempUsername, setTempUsername] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [substances, setSubstances] = useState([])

  const todayStr = new Date().toISOString().slice(0, 10)
  const [moneyStartDate, setMoneyStartDate] = useState(todayStr)
  const [selectedEditDate, setSelectedEditDate] = useState(todayStr)
  const [dailyLivingCosts, setDailyLivingCosts] = useState({})
  const [totalLivingSpentRange, setTotalLivingSpentRange] = useState(0)

  const [selectedSavingsDate, setSelectedSavingsDate] = useState(todayStr)
  const [totalSavedFromSelectedDate, setTotalSavedFromSelectedDate] = useState(0)

  const [selectedJournalDate, setSelectedJournalDate] = useState(todayStr)
  const [journalMap, setJournalMap] = useState({})
  const [journalText, setJournalText] = useState('')

  const [trackerStats, setTrackerStats] = useState([])
  const [totalSaved, setTotalSaved] = useState(0)

  const [newSubstanceName, setNewSubstanceName] = useState('Alkoholi')
  const [newSoberDate, setNewSoberDate] = useState(todayStr)
  const [newDailyCost, setNewDailyCost] = useState('10')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) fetchUserData(session.user.id)
      else setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) fetchUserData(session.user.id)
      else {
        setLoading(false)
        setIsSetupComplete(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserData = async (userId) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()

      if (profile && profile.username) {
        setUsername(profile.username)
        setTempUsername(profile.username)
        setBirthDate(profile.birth_date || '')
        if (profile.money_start_date) setMoneyStartDate(profile.money_start_date)
        if (profile.language) setLanguage(profile.language)
        setIsSetupComplete(true)
      } else {
        setIsSetupComplete(false)
      }

      const { data: subs } = await supabase
        .from('substances')
        .select('*')
        .eq('user_id', userId)
      
      if (subs) {
        setSubstances(subs)
      } else {
        setSubstances([])
      }

      const { data: costs } = await supabase
        .from('daily_costs')
        .select('*')
        .eq('user_id', userId)
      if (costs) {
        const costMap = {}
        costs.forEach(c => { costMap[c.date] = { food: c.food, other: c.other } })
        setDailyLivingCosts(costMap)
      }

      const { data: journals } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', userId)
      if (journals) {
        const jMap = {}
        journals.forEach(j => { jMap[j.date] = j.content })
        setJournalMap(jMap)
      }
    } catch (err) {
      console.error('Virhe tietojen haussa:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAuth = async (e) => {
    e.preventDefault()
    if (isRegistering) {
      const { error } = await supabase.auth.signUp({ email: authEmail, password: authPassword })
      if (error) alert(error.message)
      else alert('Rekisteröityminen onnistui! Tarkista sähköpostisi tarvittaessa tai kirjaudu sisään.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword })
      if (error) alert(error.message)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setIsSetupComplete(false)
  }

  const handleSetupSubmit = async (e) => {
    e.preventDefault()
    if (!username.trim() || !birthDate || !newSubstanceName.trim()) {
      alert(language === 'en' ? 'Please fill all required fields.' : 'Täytä kaikki kentät.')
      return
    }

    const userId = session.user.id

    const { error: profErr } = await supabase.from('profiles').upsert({
      id: userId,
      username: username.trim(),
      birth_date: birthDate,
      money_start_date: todayStr,
      language: language
    })

    if (profErr) {
      alert('Virhe profiilin tallennuksessa: ' + profErr.message)
      return
    }

    const { error: subErr } = await supabase.from('substances').insert([{
      user_id: userId,
      name: newSubstanceName.trim(),
      sober_date: newSoberDate,
      default_daily_cost: parseFloat(newDailyCost) || 0
    }])

    if (subErr) {
      alert('Virhe kohteen tallennuksessa: ' + subErr.message)
      return
    }

    setTempUsername(username.trim())
    await fetchUserData(userId)
  }

  const handleUpdateName = async (e) => {
    e.preventDefault()
    if (!tempUsername.trim()) return

    const userId = session.user.id
    const { error } = await supabase.from('profiles').upsert({
      id: userId,
      username: tempUsername.trim(),
      birth_date: birthDate,
      language: language
    })

    if (error) {
      alert('Virhe nimen päivityksessä: ' + error.message)
    } else {
      setUsername(tempUsername.trim())
      alert(language === 'en' ? 'Name updated successfully!' : 'Nimi päivitetty onnistuneesti!')
    }
  }

  const handleAddSubstance = async (e) => {
    e.preventDefault()
    if (!newSubstanceName.trim()) return

    const { error } = await supabase.from('substances').insert([{
      user_id: session.user.id,
      name: newSubstanceName.trim(),
      sober_date: newSoberDate,
      default_daily_cost: parseFloat(newDailyCost) || 0
    }])

    if (error) {
      alert('Virhe lisäyksessä: ' + error.message)
    } else {
      setNewSubstanceName('')
      setNewDailyCost('10')
      await fetchUserData(session.user.id)
      setActiveTab('home')
    }
  }

  const handleDeleteSubstance = async (substanceId) => {
    if (!window.confirm(t.confirmDelete)) return

    setSubstances(prev => prev.filter(item => item.id !== substanceId))

    try {
      const { error } = await supabase
        .from('substances')
        .delete()
        .eq('id', substanceId)

      if (error) {
        alert('Poisto epäonnistui tietokannassa: ' + error.message)
        fetchUserData(session.user.id)
      }
    } catch (err) {
      console.error('Virhe poistossa:', err)
      fetchUserData(session.user.id)
    }
  }

  const handleDefaultCostChange = async (id, newCost) => {
    const costVal = parseFloat(newCost) || 0
    await supabase.from('substances').update({ default_daily_cost: costVal }).eq('id', id)
    setSubstances(substances.map(item => item.id === id ? { ...item, default_daily_cost: costVal } : item))
  }

  const handleLivingCostChange = async (dateStr, category, amount) => {
    const val = amount === '' ? 0 : parseFloat(amount) || 0
    const currentDayCosts = dailyLivingCosts[dateStr] || { food: 0, other: 0 }
    const updatedDayCosts = { ...currentDayCosts, [category]: val }

    setDailyLivingCosts(prev => ({ ...prev, [dateStr]: updatedDayCosts }))

    await supabase.from('daily_costs').upsert({
      user_id: session.user.id,
      date: dateStr,
      food: updatedDayCosts.food,
      other: updatedDayCosts.other
    }, { onConflict: 'user_id,date' })
  }

  const handleSaveJournalEntry = async (e) => {
    e.preventDefault()
    const updatedMap = { ...journalMap }

    if (!journalText.trim()) {
      delete updatedMap[selectedJournalDate]
      await supabase.from('journal_entries').delete().match({ user_id: session.user.id, date: selectedJournalDate })
    } else {
      updatedMap[selectedJournalDate] = journalText.trim()
      await supabase.from('journal_entries').upsert({
        user_id: session.user.id,
        date: selectedJournalDate,
        content: journalText.trim()
      }, { onConflict: 'user_id,date' })
    }

    setJournalMap(updatedMap)
    alert(`${t.journalEntryFor} ${formatDate(selectedJournalDate)} tallennettu!`)
  }

  useEffect(() => {
    if (!substances || substances.length === 0) {
      setTrackerStats([])
      setTotalSaved(0)
      setTotalSavedFromSelectedDate(0)
      return
    }

    let overallMoney = 0
    const updatedStats = substances.map((item) => {
      const start = new Date(item.sober_date)
      const now = new Date()
      const diffMs = Math.max(0, now.getTime() - start.getTime())

      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60)

      let substanceSaved = 0
      let currDate = new Date(start.getFullYear(), start.getMonth(), start.getDate())
      const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())

      while (currDate <= endDate) {
        substanceSaved += (item.default_daily_cost || 0)
        currDate.setDate(currDate.getDate() + 1)
      }

      overallMoney += substanceSaved
      return { ...item, timePassed: { days, hours, minutes }, savedMoney: substanceSaved }
    })

    setTrackerStats(updatedStats)
    setTotalSaved(overallMoney)

    let savedMoneySum = 0
    const sStartDate = new Date(selectedSavingsDate)
    let sIterDate = new Date(sStartDate.getFullYear(), sStartDate.getMonth(), sStartDate.getDate())
    const sFinalDate = new Date()

    while (sIterDate <= sFinalDate) {
      substances.forEach((sub) => { savedMoneySum += (sub.default_daily_cost || 0) })
      sIterDate.setDate(sIterDate.getDate() + 1)
    }
    setTotalSavedFromSelectedDate(savedMoneySum)
  }, [substances, selectedSavingsDate])

  useEffect(() => {
    let sum = 0
    const [startYear, startMonth, startDay] = moneyStartDate.split('-').map(Number)
    const [todayYear, todayMonth, todayDay] = todayStr.split('-').map(Number)

    let curr = new Date(startYear, startMonth - 1, startDay)
    const end = new Date(todayYear, todayMonth - 1, todayDay)

    while (curr <= end) {
      const y = curr.getFullYear()
      const m = String(curr.getMonth() + 1).padStart(2, '0')
      const d = String(curr.getDate()).padStart(2, '0')
      const dStr = `${y}-${m}-${d}`

      const dayCost = dailyLivingCosts[dStr] || { food: 0, other: 0 }
      sum += (Number(dayCost.food) || 0) + (Number(dayCost.other) || 0)
      curr.setDate(curr.getDate() + 1)
    }
    setTotalLivingSpentRange(sum)
  }, [moneyStartDate, dailyLivingCosts, todayStr])

  useEffect(() => {
    setJournalText(journalMap[selectedJournalDate] || '')
  }, [selectedJournalDate, journalMap])

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2rem', fontFamily: 'Inter, sans-serif' }}>Ladataan...</div>
  }

  const containerClass = `app-container ${isDarkMode ? 'dark-mode' : ''}`

  const currentTheme = themeOptions.find(th => th.id === selectedThemeId) || themeOptions[0]
  const dynamicHeaderStyle = {
    background: `linear-gradient(135deg, ${currentTheme.color} 0%, ${currentTheme.darker} 100%)`,
    boxShadow: `0 15px 35px -10px ${currentTheme.color}66, 0 5px 15px rgba(0, 0, 0, 0.08)`
  }

  if (!session) {
    return (
      <div className={containerClass}>
        <header className="header" style={dynamicHeaderStyle}>
          <h1>Raittiusseuranta</h1>
          <p>Kirjaudu sisään tai luo tunnus hallitaksesi tietoja.</p>
        </header>
        <main className="main-content">
          <section className="card">
            <h2>{isRegistering ? 'Luo uusi tili' : 'Kirjaudu sisään'}</h2>
            <form onSubmit={handleAuth}>
              <div className="form-group">
                <label>Sähköposti</label>
                <input 
                  type="email" 
                  value={authEmail} 
                  onChange={(e) => setAuthEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Salasana</label>
                <input 
                  type="password" 
                  value={authPassword} 
                  onChange={(e) => setAuthPassword(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="btn-primary" style={{ marginBottom: '16px' }}>
                {isRegistering ? 'Rekisteröidy' : 'Kirjaudu'}
              </button>
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', width: '100%', fontSize: '0.9rem', fontWeight: '500' }}
              >
                {isRegistering ? 'Onko sinulla jo tili? Kirjaudu sisään' : 'Eikö sinulla ole tiliä? Rekisteröidy tästä'}
              </button>
            </form>
          </section>
        </main>
      </div>
    )
  }

  if (!isSetupComplete) {
    return (
      <div className={containerClass}>
        <header className="header" style={dynamicHeaderStyle}>
          <h1>{t.setupWelcome}</h1>
          <p>{t.setupWelcomeDesc}</p>
        </header>
        <main className="main-content">
          <section className="card">
            <h2>{t.setupCardTitle}</h2>
            <form onSubmit={handleSetupSubmit}>
              <div className="form-group">
                <label>{t.yourName}</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Esim. Matti" required />
              </div>
              <div className="form-group">
                <label>{t.birthDate}</label>
                <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
              </div>
              <div className="divider"></div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>{t.firstSubstance}</h3>
              <div className="form-group">
                <label>{t.substanceNameLabel}</label>
                <input type="text" value={newSubstanceName} onChange={(e) => setNewSubstanceName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>{t.soberDateLabel}</label>
                <input type="date" value={newSoberDate} onChange={(e) => setNewSoberDate(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>{t.dailyCostBeforeLabel}</label>
                <input type="number" value={newDailyCost} onChange={(e) => setNewDailyCost(e.target.value)} />
              </div>
              <button type="submit" className="btn-primary">{t.startTrackingBtn}</button>
            </form>
          </section>
        </main>
      </div>
    )
  }

  const currentEditCosts = dailyLivingCosts[selectedEditDate] || { food: '', other: '' }

  return (
    <div className={containerClass}>
      <header className="header" style={dynamicHeaderStyle}>
        <h1>{t.headerTitle}</h1>
        <p>{t.headerGreeting} {username}! {t.headerSubtitle}</p>
        
        <nav className="nav-menu">
          <button className={`nav-tab ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>{t.tabTracker}</button>
          <button className={`nav-tab ${activeTab === 'money' ? 'active' : ''}`} onClick={() => setActiveTab('money')}>{t.tabSpending}</button>
          <button className={`nav-tab ${activeTab === 'savings' ? 'active' : ''}`} onClick={() => setActiveTab('savings')}>{t.tabSavings}</button>
          <button className={`nav-tab ${activeTab === 'add' ? 'active' : ''}`} onClick={() => setActiveTab('add')}>{t.tabAdd}</button>
          <button className={`nav-tab ${activeTab === 'journal' ? 'active' : ''}`} onClick={() => setActiveTab('journal')}>{t.tabJournal}</button>
          <button className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>{t.tabSettings}</button>
        </nav>
      </header>

      <main className="main-content" style={{ marginTop: '24px' }}>
        
        {activeTab === 'home' && (
          <>
            <section className="card">
              <h2>{t.totalSavedTitle}</h2>
              <div className="savings-amount" style={{ color: currentTheme.color }}>{formatMoney(totalSaved, currency)}</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '4px' }}>{t.totalSavedSubtitle}</p>
            </section>

            <section className="card">
              <h2>{t.substancesTitle} ({trackerStats.length})</h2>
              {trackerStats.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>{t.noSubstances}</p>
              ) : (
                trackerStats.map((item) => (
                  <div key={item.id} className="substance-item">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ margin: '0', color: 'var(--text-color)', fontSize: '1.05rem', fontWeight: '600' }}>{item.name}</h3>
                      <button onClick={() => handleDeleteSubstance(item.id)} className="btn-delete-sub">{t.delete}</button>
                    </div>
                    <div className="counter-grid">
                      <div className="counter-box"><div className="counter-number">{item.timePassed?.days || 0}</div><div className="counter-label">{t.days}</div></div>
                      <div className="counter-box"><div className="counter-number">{item.timePassed?.hours || 0}</div><div className="counter-label">{t.hours}</div></div>
                      <div className="counter-box"><div className="counter-number">{item.timePassed?.minutes || 0}</div><div className="counter-label">{t.minutes}</div></div>
                    </div>
                    <div style={{ marginTop: '14px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t.savedWithSubstance}: <strong style={{ color: 'var(--text-color)' }}>{formatMoney(item.savedMoney, currency)}</strong></div>
                  </div>
                ))
              )}
            </section>
          </>
        )}

        {activeTab === 'money' && (
          <section className="card">
            <h2>{t.spendingTitle}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{t.spendingDesc}</p>
            <div className="form-group" style={{ background: 'var(--input-bg)', padding: '14px', borderRadius: '14px', marginBottom: '14px' }}>
              <label style={{ fontWeight: '600' }}>{t.calcStartDateLabel}</label>
              <input type="date" value={moneyStartDate} max={todayStr} onChange={(e) => setMoneyStartDate(e.target.value)} />
            </div>
            <div className="form-group" style={{ background: 'var(--input-bg)', padding: '14px', borderRadius: '14px', marginBottom: '14px' }}>
              <label style={{ fontWeight: '600' }}>{t.editDateLabel}</label>
              <input type="date" value={selectedEditDate} max={todayStr} onChange={(e) => setSelectedEditDate(e.target.value)} />
            </div>
            <div className="form-group" style={{ background: 'var(--input-bg)', padding: '14px', borderRadius: '14px', marginBottom: '14px' }}>
              <label style={{ fontWeight: '600' }}>{t.foodCostLabel} {formatDate(selectedEditDate)}</label>
              <input type="number" value={currentEditCosts.food} onChange={(e) => handleLivingCostChange(selectedEditDate, 'food', e.target.value)} />
            </div>
            <div className="form-group" style={{ background: 'var(--input-bg)', padding: '14px', borderRadius: '14px', marginBottom: '14px' }}>
              <label style={{ fontWeight: '600' }}>{t.otherCostLabel} {formatDate(selectedEditDate)}</label>
              <input type="number" value={currentEditCosts.other} onChange={(e) => handleLivingCostChange(selectedEditDate, 'other', e.target.value)} />
            </div>
            <div className="card-total-box" style={{ padding: '20px', borderRadius: '16px', textAlign: 'center', marginTop: '16px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-muted)' }}>{t.totalSpentRangeLabel}:</span>
              <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-color)', marginTop: '4px' }}>{formatMoney(totalLivingSpentRange, currency)}</div>
            </div>
          </section>
        )}

        {activeTab === 'savings' && (
          <section className="card">
            <h2>{t.savingsTitle}</h2>
            <div style={{ background: 'var(--input-bg)', padding: '16px', borderRadius: '14px', marginBottom: '16px' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '1rem', color: 'var(--text-color)', fontWeight: '600' }}>{t.formerCostTitle}</h3>
              {substances.map((item) => (
                <div key={item.id} className="form-group" style={{ marginBottom: '10px' }}>
                  <label style={{ fontWeight: '600' }}>{item.name} ({t.formerCostInputLabel})</label>
                  <input type="number" value={item.default_daily_cost} onChange={(e) => handleDefaultCostChange(item.id, e.target.value)} />
                </div>
              ))}
            </div>
            <div className="form-group" style={{ background: 'var(--input-bg)', padding: '14px', borderRadius: '14px', marginBottom: '16px' }}>
              <label style={{ fontWeight: '600' }}>{t.calcSavingsStartLabel}</label>
              <input type="date" value={selectedSavingsDate} max={todayStr} onChange={(e) => setSelectedSavingsDate(e.target.value)} />
            </div>
            <div className="card-savings-box" style={{ padding: '20px', borderRadius: '16px', textAlign: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-muted)' }}>{t.savedFromDateLabel}:</span>
              <div className="savings-amount" style={{ margin: '8px 0 0 0', fontSize: '2.4rem', color: currentTheme.color }}>{formatMoney(totalSavedFromSelectedDate, currency)}</div>
            </div>
          </section>
        )}

        {activeTab === 'add' && (
          <section className="card">
            <h2>{t.addTitle}</h2>
            <form onSubmit={handleAddSubstance}>
              <div className="form-group">
                <label>{t.substanceNameLabel}</label>
                <input type="text" value={newSubstanceName} onChange={(e) => setNewSubstanceName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>{t.soberDateLabel}</label>
                <input type="date" value={newSoberDate} onChange={(e) => setNewSoberDate(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>{t.dailyCostBeforeLabel}</label>
                <input type="number" value={newDailyCost} onChange={(e) => setNewDailyCost(e.target.value)} />
              </div>
              <button type="submit" className="btn-primary" style={{ backgroundColor: currentTheme.color, marginTop: '8px' }}>{t.addBtn}</button>
            </form>
          </section>
        )}

        {activeTab === 'journal' && (
          <section className="card">
            <h2>{t.journalTitle}</h2>
            <div className="form-group" style={{ background: 'var(--input-bg)', padding: '14px', borderRadius: '14px' }}>
              <label style={{ fontWeight: '600' }}>{t.selectJournalDateLabel}</label>
              <input type="date" value={selectedJournalDate} max={todayStr} onChange={(e) => setSelectedJournalDate(e.target.value)} />
            </div>
            <form onSubmit={handleSaveJournalEntry} style={{ marginTop: '16px' }}>
              <div className="form-group">
                <label style={{ fontWeight: '600' }}>{t.journalEntryFor} {formatDate(selectedJournalDate)}{t.journalEntrySuffix}</label>
                <textarea rows="4" value={journalText} onChange={(e) => setJournalText(e.target.value)} placeholder={t.journalPlaceholderToday} />
              </div>
              <button type="submit" className="btn-primary" style={{ backgroundColor: currentTheme.color }}>{t.saveJournalBtn}</button>
            </form>

            <div className="divider"></div>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '14px', color: 'var(--text-color)', fontWeight: '600' }}>{t.allEntriesTitle}</h3>
            {Object.keys(journalMap).length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t.noEntries}</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {Object.entries(journalMap)
                  .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
                  .map(([date, content]) => (
                    <div key={date} className="journal-entry-card" style={{ borderLeftColor: currentTheme.color }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: '700', color: currentTheme.color, marginBottom: '4px' }}>
                        {formatDate(date)}
                      </div>
                      <div style={{ fontSize: '0.95rem', color: 'var(--text-color)', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                        {content}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'settings' && (
          <section className="card">
            <h2>{t.settingsTitle}</h2>
            
            {/* NIMEN MUOKKAUS */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: '600', marginBottom: '6px' }}>{t.nameChangeLabel}</label>
              <form onSubmit={handleUpdateName} style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  value={tempUsername} 
                  onChange={(e) => setTempUsername(e.target.value)} 
                  placeholder={t.nameChangePlaceholder} 
                  required 
                />
                <button type="submit" className="btn-primary" style={{ backgroundColor: currentTheme.color, width: 'auto', padding: '12px 20px', whiteSpace: 'nowrap' }}>
                  {t.saveNameBtn}
                </button>
              </form>
            </div>

            <div className="divider"></div>

            {/* KIELI */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: '600', marginBottom: '8px' }}>{t.langLabel}</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <button type="button" onClick={() => setLanguage('fi')} className={`setting-toggle-btn ${language === 'fi' ? 'active' : ''}`}>Suomi</button>
                <button type="button" onClick={() => setLanguage('en')} className={`setting-toggle-btn ${language === 'en' ? 'active' : ''}`}>English</button>
              </div>
            </div>

            <div className="divider"></div>

            {/* VALUUTTA */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: '600', marginBottom: '8px' }}>{t.currencyLabel}</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <button type="button" onClick={() => setCurrency('EUR')} className={`setting-toggle-btn ${currency === 'EUR' ? 'active' : ''}`}>Euro (€)</button>
                <button type="button" onClick={() => setCurrency('USD')} className={`setting-toggle-btn ${currency === 'USD' ? 'active' : ''}`}>Dollar ($)</button>
              </div>
            </div>

            <div className="divider"></div>

            {/* TUMMA TILA */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: '600', marginBottom: '8px' }}>{t.darkModeLabel}</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <button type="button" onClick={() => setIsDarkMode(false)} className={`setting-toggle-btn ${!isDarkMode ? 'active' : ''}`}>{t.darkModeOptions.light}</button>
                <button type="button" onClick={() => setIsDarkMode(true)} className={`setting-toggle-btn ${isDarkMode ? 'active' : ''}`}>{t.darkModeOptions.dark}</button>
              </div>
            </div>

            <div className="divider"></div>

            {/* 6 MODERNIA TEOLLISUUSVÄRIÄ HEADERILLE */}
            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label style={{ fontWeight: '600', marginBottom: '10px' }}>{t.themeLabel}</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {themeOptions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedThemeId(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      border: selectedThemeId === item.id ? `2px solid var(--text-color)` : '1px solid var(--border-color)',
                      background: 'var(--input-bg)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontWeight: selectedThemeId === item.id ? '700' : '600',
                      color: 'var(--text-color)'
                    }}
                  >
                    <span style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: item.color, display: 'inline-block', boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }}></span>
                    <span style={{ fontSize: '0.85rem' }}>{t.themeNames[item.id]}</span>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleLogout} className="btn-logout">
              {t.logoutBtn}
            </button>
          </section>
        )}

      </main>
    </div>
  )
}

export default App