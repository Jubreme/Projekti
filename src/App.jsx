import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'

// ---------------------------------------------------------------------------
// 1. SUPABASE-YHTEYS
// ---------------------------------------------------------------------------
const SUPABASE_URL = 'https://gynvmhchddfdpzlychsf.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_O9hk82owcPxO-wCf1CbbYA_cPhXxnsW'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Käännösobjekti
const translations = {
  fi: {
    headerTitle: "Raittiusseuranta",
    headerGreeting: "Hei",
    headerSubtitle: "Hienoa työtä paremman elämän puolesta.",
    tabTracker: "📊 Seuranta",
    tabSpending: "💶 Rahankäyttö",
    tabSavings: "💰 Rahansäästö",
    tabAdd: "➕ Lisää uusi",
    tabJournal: "📖 Päiväkirja",
    tabSettings: "⚙️ Asetukset",
    totalSavedTitle: "Yhteenlasketut säästöt",
    totalSavedSubtitle: "Yhteensä kaikista seurattavista kohteista",
    substancesTitle: "Seurattavat kohteet",
    noSubstances: "Ei vielä seurattavia kohteita. Lisää yksi 'Lisää uusi' -valikosta!",
    days: "Päivää",
    hours: "Tuntia",
    minutes: "Minuuttia",
    savedWithSubstance: "Säästetty tällä kohteella",
    delete: "Poista",
    spendingTitle: "Päivittäinen arjen rahankäyttö",
    spendingDesc: "Seuraa ja muokkaa arjen kulutustasi (ruoka ja muut menot).",
    calcStartDateLabel: "1. Laskennan aloituspäivä (mistä lähtien lasketaan):",
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
    allTimeSavingsLabel: "Kaikkien aikojen kokonaissäästöt raittiuden alusta:",
    addTitle: "Lisää uusi päihde tai tapa",
    substanceNameLabel: "Päihde / Tapa",
    soberDateLabel: "Raittiuden aloituspäivä",
    dailyCostBeforeLabel: "Paljonko käytit ennen päivässä rahaa tähän päihteeseen?",
    addBtn: "Lisää seurantaan",
    journalTitle: "Päiväkirja (Journal)",
    selectJournalDateLabel: "Valitse tarkasteltava tai muokattava päivä:",
    journalEntryFor: "Päivän",
    journalEntrySuffix: " merkintä:",
    journalPlaceholderToday: "Miltä tänään tuntuu?",
    saveJournalBtn: "Tallenna merkintä",
    allEntriesTitle: "Tallennetut päiväkirjamerkinnät",
    noEntries: "Ei vielä tallennettuja päiväkirjamerkintöjä.",
    settingsTitle: "Asetukset",
    settingsDesc: "Mukauta sovelluksen ulkoasua ja kieltä.",
    langLabel: "Kieli / Language",
    logoutBtn: "Kirjaudu ulos",
    confirmDelete: "Haluatko varmasti poistaa tämän seurannan?",
    setupWelcome: "Tervetuloa Raittiusseurantaan",
    setupWelcomeDesc: "Aloitetaan syöttämällä perustietosi ja ensimmäinen seurattava kohde",
    setupCardTitle: "Käyttöönotto",
    yourName: "Nimesi",
    birthDate: "Syntymäaika",
    firstSubstance: "Ensimmäinen päihde / tapa",
    startTrackingBtn: "Aloita seuranta"
  },
  en: {
    headerTitle: "Sobriety Tracker",
    headerGreeting: "Hello",
    headerSubtitle: "Great progress towards a healthier lifestyle.",
    tabTracker: "📊 Tracker",
    tabSpending: "💶 Living Expenses",
    tabSavings: "💰 Money Saved",
    tabAdd: "➕ Add New",
    tabJournal: "📖 Journal",
    tabSettings: "⚙️ Settings",
    totalSavedTitle: "Total Money Saved",
    totalSavedSubtitle: "Combined savings from all tracked habits",
    substancesTitle: "Tracked Habits",
    noSubstances: "No habits tracked yet. Add one from the 'Add New' tab!",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    savedWithSubstance: "Saved on this habit",
    delete: "Remove",
    spendingTitle: "Daily Living Expenses",
    spendingDesc: "Log and manage your daily living costs (groceries, leisure, etc.).",
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
    settingsDesc: "Customize language, colors, and application data.",
    langLabel: "Language / Kieli",
    logoutBtn: "Log Out",
    confirmDelete: "Are you sure you want to remove this tracked habit?",
    setupWelcome: "Welcome to Sobriety Tracker",
    setupWelcomeDesc: "Let's set up your profile and your first goal",
    setupCardTitle: "Initial Setup",
    yourName: "Your Name",
    birthDate: "Date of Birth",
    firstSubstance: "First Habit or Substance",
    startTrackingBtn: "Complete Setup"
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  const userLocale = navigator.language || 'fi-FI'
  return date.toLocaleDateString(userLocale, { month: 'short', day: 'numeric', year: 'numeric' })
}

const formatMoney = (amount, lang) => {
  const formattedNum = Number(amount || 0).toFixed(2)
  if (lang === 'en') {
    return `€${formattedNum}`
  }
  return `${formattedNum} €`
}

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const [activeTab, setActiveTab] = useState('home')
  const [language, setLanguage] = useState('fi')
  const t = translations[language] || translations.fi

  // TEEMAVÄRI-TILA (Oletuksena terracotta)
  const [themeColor, setThemeColor] = useState('terracotta')

  const [isSetupComplete, setIsSetupComplete] = useState(false)
  const [username, setUsername] = useState('')
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

    await fetchUserData(userId)
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
    return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2rem' }}>Ladataan...</div>
  }

  if (!session) {
    return (
      <div className={`app-container theme-${themeColor}`}>
        <header className="header">
          <h1>Raittiusseuranta</h1>
          <p>Kirjaudu sisään tai luo tunnus hallitaksesi tietoja pilvessä.</p>
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
              <button type="submit" className="btn-primary" style={{ marginBottom: '12px' }}>
                {isRegistering ? 'Rekisteröidy' : 'Kirjaudu'}
              </button>
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', width: '100%', fontSize: '0.9rem' }}
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
      <div className={`app-container theme-${themeColor}`}>
        <header className="header">
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
              <hr style={{ margin: '20px 0', borderColor: '#eee' }} />
              <h3>{t.firstSubstance}</h3>
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
    <div className={`app-container theme-${themeColor}`}>
      <header className="header">
        <h1>{t.headerTitle}</h1>
        <p>{t.headerGreeting} {username}! {t.headerSubtitle}</p>
        
        <nav className="nav-menu">
          <button style={{ backgroundColor: activeTab === 'home' ? 'rgba(255,255,255,0.3)' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={() => setActiveTab('home')}>{t.tabTracker}</button>
          <button style={{ backgroundColor: activeTab === 'money' ? 'rgba(255,255,255,0.3)' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={() => setActiveTab('money')}>{t.tabSpending}</button>
          <button style={{ backgroundColor: activeTab === 'savings' ? 'rgba(255,255,255,0.3)' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={() => setActiveTab('savings')}>{t.tabSavings}</button>
          <button style={{ backgroundColor: activeTab === 'add' ? 'rgba(255,255,255,0.3)' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={() => setActiveTab('add')}>{t.tabAdd}</button>
          <button style={{ backgroundColor: activeTab === 'journal' ? 'rgba(255,255,255,0.3)' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={() => setActiveTab('journal')}>{t.tabJournal}</button>
          <button style={{ backgroundColor: activeTab === 'settings' ? 'rgba(255,255,255,0.3)' : 'transparent', color: '#fff', border: 'none', cursor: 'pointer' }} onClick={() => setActiveTab('settings')}>{t.tabSettings}</button>
        </nav>
      </header>

      <main className="main-content" style={{ marginTop: '20px' }}>
        
        {activeTab === 'home' && (
          <>
            <section className="card">
              <h2>{t.totalSavedTitle}</h2>
              <div className="savings-amount">{formatMoney(totalSaved, language)}</div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>{t.totalSavedSubtitle}</p>
            </section>

            <section className="card">
              <h2>{t.substancesTitle} ({trackerStats.length})</h2>
              {trackerStats.length === 0 ? (
                <p style={{ color: '#64748b' }}>{t.noSubstances}</p>
              ) : (
                trackerStats.map((item) => (
                  <div key={item.id} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ margin: '0 0 8px 0' }}>{item.name}</h3>
                      <button onClick={() => handleDeleteSubstance(item.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>{t.delete}</button>
                    </div>
                    <div className="counter-grid">
                      <div className="counter-box"><div className="counter-number">{item.timePassed?.days || 0}</div><div className="counter-label">{t.days}</div></div>
                      <div className="counter-box"><div className="counter-number">{item.timePassed?.hours || 0}</div><div className="counter-label">{t.hours}</div></div>
                      <div className="counter-box"><div className="counter-number">{item.timePassed?.minutes || 0}</div><div className="counter-label">{t.minutes}</div></div>
                    </div>
                    <div style={{ marginTop: '12px', fontSize: '0.9rem', color: '#475569' }}>{t.savedWithSubstance}: <strong>{formatMoney(item.savedMoney, language)}</strong></div>
                  </div>
                ))
              )}
            </section>
          </>
        )}

        {activeTab === 'money' && (
          <section className="card">
            <h2>{t.spendingTitle}</h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '16px' }}>{t.spendingDesc}</p>
            <div className="form-group">
              <label>{t.calcStartDateLabel}</label>
              <input type="date" value={moneyStartDate} max={todayStr} onChange={(e) => setMoneyStartDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t.editDateLabel}</label>
              <input type="date" value={selectedEditDate} max={todayStr} onChange={(e) => setSelectedEditDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t.foodCostLabel} {formatDate(selectedEditDate)}</label>
              <input type="number" value={currentEditCosts.food} onChange={(e) => handleLivingCostChange(selectedEditDate, 'food', e.target.value)} />
            </div>
            <div className="form-group">
              <label>{t.otherCostLabel} {formatDate(selectedEditDate)}</label>
              <input type="number" value={currentEditCosts.other} onChange={(e) => handleLivingCostChange(selectedEditDate, 'other', e.target.value)} />
            </div>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', textAlign: 'center', marginTop: '16px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 'bold' }}>{t.totalSpentRangeLabel}:</span>
              <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--primary)', marginTop: '6px' }}>{formatMoney(totalLivingSpentRange, language)}</div>
            </div>
          </section>
        )}

        {activeTab === 'savings' && (
          <section className="card">
            <h2>{t.savingsTitle}</h2>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', marginBottom: '16px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>{t.formerCostTitle}</h3>
              {substances.map((item) => (
                <div key={item.id} className="form-group" style={{ marginBottom: '10px' }}>
                  <label>{item.name} ({t.formerCostInputLabel})</label>
                  <input type="number" value={item.default_daily_cost} onChange={(e) => handleDefaultCostChange(item.id, e.target.value)} />
                </div>
              ))}
            </div>
            <div className="form-group">
              <label>{t.calcSavingsStartLabel}</label>
              <input type="date" value={selectedSavingsDate} max={todayStr} onChange={(e) => setSelectedSavingsDate(e.target.value)} />
            </div>
            <div style={{ background: '#ecfdf5', padding: '16px', borderRadius: '10px', textAlign: 'center', marginBottom: '16px', border: '1px solid #a7f3d0' }}>
              <span style={{ fontSize: '0.9rem', color: '#047857', fontWeight: 'bold' }}>{t.savedFromDateLabel}:</span>
              <div className="savings-amount" style={{ margin: '8px 0 0 0', color: '#059669', fontSize: '2.4rem' }}>{formatMoney(totalSavedFromSelectedDate, language)}</div>
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
              <button type="submit" className="btn-primary">{t.addBtn}</button>
            </form>
          </section>
        )}

        {activeTab === 'journal' && (
          <section className="card">
            <h2>{t.journalTitle}</h2>
            <div className="form-group">
              <label>{t.selectJournalDateLabel}</label>
              <input type="date" value={selectedJournalDate} max={todayStr} onChange={(e) => setSelectedJournalDate(e.target.value)} />
            </div>
            <form onSubmit={handleSaveJournalEntry} style={{ marginTop: '16px' }}>
              <div className="form-group">
                <label>{t.journalEntryFor} {formatDate(selectedJournalDate)}{t.journalEntrySuffix}</label>
                <textarea rows="4" value={journalText} onChange={(e) => setJournalText(e.target.value)} placeholder={t.journalPlaceholderToday} />
              </div>
              <button type="submit" className="btn-primary">{t.saveJournalBtn}</button>
            </form>

            <div style={{ marginTop: '24px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>{t.allEntriesTitle}</h3>
              {Object.keys(journalMap).length === 0 ? (
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{t.noEntries}</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {Object.entries(journalMap)
                    .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
                    .map(([date, content]) => (
                      <div key={date} style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', borderLeft: '4px solid var(--primary)', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '4px' }}>
                          📅 {formatDate(date)}
                        </div>
                        <div style={{ fontSize: '0.95rem', color: '#334155', whiteSpace: 'pre-wrap' }}>
                          {content}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === 'settings' && (
          <section className="card">
            <h2>{t.settingsTitle}</h2>
            
            {/* KIELIVALINTA */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', marginBottom: '8px' }}>🌐 {t.langLabel}</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setLanguage('fi')} 
                  style={{ 
                    padding: '10px', 
                    borderRadius: '8px', 
                    background: language === 'fi' ? 'var(--primary)' : '#f8fafc', 
                    color: language === 'fi' ? '#fff' : '#0f172a', 
                    fontWeight: 'bold', 
                    cursor: 'pointer', 
                    border: '1px solid #cbd5e1' 
                  }}
                >
                  🇫🇮 Suomi
                </button>
                <button 
                  type="button" 
                  onClick={() => setLanguage('en')} 
                  style={{ 
                    padding: '10px', 
                    borderRadius: '8px', 
                    background: language === 'en' ? 'var(--primary)' : '#f8fafc', 
                    color: language === 'en' ? '#fff' : '#0f172a', 
                    fontWeight: 'bold', 
                    cursor: 'pointer', 
                    border: '1px solid #cbd5e1' 
                  }}
                >
                  🇬🇧 English
                </button>
              </div>
            </div>

            <hr style={{ margin: '20px 0', borderColor: '#f1f5f9' }} />

            {/* TEEMAVÄRIVILINTA */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: 'bold', marginBottom: '8px' }}>🎨 Teemaväri</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setThemeColor('terracotta')} 
                  style={{ padding: '10px', borderRadius: '8px', background: '#c05621', color: '#fff', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}
                >
                  🟧 Terracotta
                </button>
                <button 
                  type="button" 
                  onClick={() => setThemeColor('indigo')} 
                  style={{ padding: '10px', borderRadius: '8px', background: '#4f46e5', color: '#fff', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}
                >
                  🟪 Moderni Indigo
                </button>
                <button 
                  type="button" 
                  onClick={() => setThemeColor('forest')} 
                  style={{ padding: '10px', borderRadius: '8px', background: '#059669', color: '#fff', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}
                >
                  🟩 Metsänvihreä
                </button>
                <button 
                  type="button" 
                  onClick={() => setThemeColor('ocean')} 
                  style={{ padding: '10px', borderRadius: '8px', background: '#0284c7', color: '#fff', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}
                >
                  🟦 Merensininen
                </button>
              </div>
            </div>

            <hr style={{ margin: '24px 0 16px 0', borderColor: '#f1f5f9' }} />

            {/* ULOSKIRJAUTUMINEN */}
            <button 
              onClick={handleLogout} 
              style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}
            >
              {t.logoutBtn}
            </button>
          </section>
        )}

      </main>
    </div>
  )
}

export default App