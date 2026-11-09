import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'

// ---------------------------------------------------------------------------
// 1. SUPABASE-ALUSTUS
// ---------------------------------------------------------------------------
const SUPABASE_URL = 'https://gynvmhchddfdpzlychsf.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_O9hk82owcPxO-wCf1CbbYA_cPhXxnsW'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ---------------------------------------------------------------------------
// 2. VAKIOKONTROLLIT JA KÄÄNNÖKSET
// ---------------------------------------------------------------------------

const themeOptions = [
  { id: 'indigo', color: '#6366f1', darker: '#4338ca' },
  { id: 'emerald', color: '#059669', darker: '#047857' },
  { id: 'coral', color: '#e11d48', darker: '#be123c' },
  { id: 'violet', color: '#7c3aed', darker: '#6d28d9' },
  { id: 'amber', color: '#d97706', darker: '#b45309' },
  { id: 'cyan', color: '#0284c7', darker: '#0369a1' }
]

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
    tabLinks: "Linkit",
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
    formerCostTitle: "Päihteiden asetukset",
    formerCostDesc: "Muokkaa kunkin päihteen aloituspäivää ja päivittäistä entistä kulutusta.",
    formerCostInputLabel: "/ pvä",
    savedFromDateLabel: "Säästetty rahaa päihteistä yhteensä",
    addTitle: "Lisää uusi päihde tai tapa",
    substanceNameLabel: "Päihde / Tapa",
    soberDateLabel: "Raittiuden aloituspäivä",
    dailyCostBeforeLabel: "Paljonko käytit ennen päivässä rahaa tähän?",
    addBtn: "Aloita seuranta",
    journalTitle: "Päiväkirja & Ajatukset",
    selectJournalDateLabel: "Valitse tarkasteltava tai muokattava päivä:",
    journalEntryFor: "Päivän",
    journalEntrySuffix: " merkintä:",
    journalPlaceholderToday: "Kirjoita päivän ajatuksesi ja fiiliksesi tähän...",
    saveJournalBtn: "Tallenna merkintä",
    allEntriesTitle: "Tallennetut merkinnät",
    noEntries: "Ei vielä tallennettuja päiväkirjamerkintöjä.",
    linksTitle: "Hyödylliset linkit ja tuki",
    linksDesc: "Täältä löydät tukea, kokouksia ja materiaaleja toipumisen tueksi.",
    settingsTitle: "Asetukset",
    settingsDesc: "Mukauta sovelluksen ulkoasua, kieltä ja yläpalkin teemaväriä.",
    langLabel: "Kieli / Language",
    currencyLabel: "Valuutta",
    themeLabel: "Yläpalkin teemaväri",
    darkModeLabel: "Tumma tila (Dark Mode)",
    notificationsLabel: "Mobiili-ilmoitukset",
    enableNotificationsBtn: "🔔 Ota ilmoitukset käyttöön",
    nameChangeLabel: "Muokkaa nimeä",
    nameChangePlaceholder: "Kirjoita uusi nimi",
    saveNameBtn: "Tallenna nimi",
    logoutBtn: "Kirjaudu ulos",
    deleteAccountBtn: "Poista tili pysyvästi",
    confirmDeleteAccount: "Haluatko VARMASTI poistaa tilisi ja kaikki tietosi pysyvästi? Tätä toimintoa ei voi peruuttaa!",
    confirmDelete: "Haluatko varmasti poistaa tämän seurannan?",
    setupWelcome: "Tervetuloa Raittiusseurantaan",
    setupWelcomeDesc: "Aloitetaan syöttämällä perustietosi ja ensimmäinen seurattava kohde.",
    setupCardTitle: "Käyttöönotto",
    yourName: "Nimesi",
    birthDate: "Syntymäaika",
    firstSubstance: "Ensimmäinen päihde / tapa",
    startTrackingBtn: "Jatka sovellukseen",
    darkModeOptions: { light: "Vaalea", dark: "Tumma" }
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
    tabLinks: "Links",
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
    formerCostTitle: "Substance Settings",
    formerCostDesc: "Edit start date and previous daily expenditure for each habit.",
    formerCostInputLabel: "/ day",
    savedFromDateLabel: "Total money saved from habits",
    addTitle: "Add a New Habit or Substance",
    substanceNameLabel: "Habit / Substance Name",
    soberDateLabel: "Sobriety Start Date",
    dailyCostBeforeLabel: "Previous daily expenditure on this habit?",
    addBtn: "Start Tracking",
    journalTitle: "Journal & Reflections",
    selectJournalDateLabel: "Select date to view or write:",
    journalEntryFor: "Journal entry for",
    journalEntrySuffix: ":",
    journalPlaceholderToday: "Write your thoughts and feelings here...",
    saveJournalBtn: "Save Entry",
    allEntriesTitle: "Recorded Journal Entries",
    noEntries: "No journal entries recorded yet.",
    linksTitle: "Useful Links & Support",
    linksDesc: "Find resources, meeting directories, and support networks to aid your recovery.",
    settingsTitle: "Preferences & Settings",
    settingsDesc: "Customize language, currency, and header theme color.",
    langLabel: "Language / Kieli",
    currencyLabel: "Currency",
    themeLabel: "Header Theme Color",
    darkModeLabel: "Dark Mode",
    notificationsLabel: "Mobile Notifications",
    enableNotificationsBtn: "🔔 Enable Notifications",
    nameChangeLabel: "Edit Name",
    nameChangePlaceholder: "Enter new name",
    saveNameBtn: "Save Name",
    logoutBtn: "Log Out",
    deleteAccountBtn: "Delete Account Permanently",
    confirmDeleteAccount: "Are you SURE you want to delete your account and all your data permanently? This action cannot be undone!",
    confirmDelete: "Are you sure you want to remove this tracked habit?",
    setupWelcome: "Welcome to Sobriety Tracker",
    setupWelcomeDesc: "Let's set up your profile and your first goal.",
    setupCardTitle: "Initial Setup",
    yourName: "Your Name",
    birthDate: "Date of Birth",
    firstSubstance: "First Habit or Substance",
    startTrackingBtn: "Complete Setup",
    darkModeOptions: { light: "Light", dark: "Dark" }
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

// ---------------------------------------------------------------------------
// 3. PÄÄKOMPONENTTI: App
// ---------------------------------------------------------------------------
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

  const [selectedJournalDate, setSelectedJournalDate] = useState(todayStr)
  const [journalMap, setJournalMap] = useState({})
  const [journalText, setJournalText] = useState('')

  const [trackerStats, setTrackerStats] = useState([])
  const [totalSaved, setTotalSaved] = useState(0)

  const [newSubstanceName, setNewSubstanceName] = useState('Alkoholi')
  const [newSoberDate, setNewSoberDate] = useState(todayStr)
  const [newDailyCost, setNewDailyCost] = useState('10')

  // ---------------------------------------------------------------------------
  // 4. EFEKTIT JA TIETOKANTAHAUT (SUPABASE)
  // ---------------------------------------------------------------------------

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
      
      setSubstances(subs || [])

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

  // ---------------------------------------------------------------------------
  // 5. MOBIILI-ILMOITUSTEN AKTIVOINTI (NOTIFICATION API)
  // ---------------------------------------------------------------------------
  const enableMobileNotifications = async () => {
    if (!('Notification' in window)) {
      alert('Selaimesi ei tue ilmoituksia.')
      return
    }

    try {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        alert(language === 'en' ? 'Notifications enabled successfully!' : 'Ilmoitukset otettu käyttöön!')
        new Notification('Raittiusseuranta 🎉', {
          body: language === 'en' ? 'Notifications are now active.' : 'Ilmoitukset ovat nyt päällä.'
        })
      } else {
        alert(language === 'en' ? 'Permission denied.' : 'Ilmoituslupa hylättiin.')
      }
    } catch (err) {
      console.error('Virhe ilmoitusluvan pyynnössä:', err)
    }
  }

  // ---------------------------------------------------------------------------
  // 6. TAPAHTUMANKÄSITTELIJÄT (AUTH, DATA, TILIN POISTO)
  // ---------------------------------------------------------------------------

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

  const handleDeleteAccount = async () => {
    if (!window.confirm(t.confirmDeleteAccount)) return

    try {
      const userId = session.user.id

      await supabase.from('substances').delete().eq('user_id', userId)
      await supabase.from('daily_costs').delete().eq('user_id', userId)
      await supabase.from('journal_entries').delete().eq('user_id', userId)
      await supabase.from('profiles').delete().eq('id', userId)

      await supabase.auth.signOut()
      setSession(null)
      setIsSetupComplete(false)
      alert(language === 'en' ? 'Account deleted successfully.' : 'Tili poistettu onnistuneesti.')
    } catch (err) {
      console.error('Virhe tilin poistossa:', err)
      alert('Tilin poistaminen epäonnistui: ' + err.message)
    }
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

  const handleSoberDateChange = async (id, newDate) => {
    await supabase.from('substances').update({ sober_date: newDate }).eq('id', id)
    setSubstances(substances.map(item => item.id === id ? { ...item, sober_date: newDate } : item))
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

  // ---------------------------------------------------------------------------
  // 7. LASKENTALOGIIKKA
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!substances || substances.length === 0) {
      setTrackerStats([])
      setTotalSaved(0)
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
  }, [substances])

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

  // ---------------------------------------------------------------------------
  // 8. RENDERÖINTI (UI)
  // ---------------------------------------------------------------------------

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

              <button type="submit" className="btn-primary" style={{ marginBottom: '16px', backgroundColor: currentTheme.color }}>
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
              <button type="submit" className="btn-primary" style={{ backgroundColor: currentTheme.color }}>{t.startTrackingBtn}</button>
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
          <button className={`nav-tab ${activeTab === 'links' ? 'active' : ''}`} onClick={() => setActiveTab('links')}>{t.tabLinks}</button>
          <button className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>{t.tabSettings}</button>
        </nav>
      </header>

      <main className="main-content" style={{ marginTop: '24px' }}>
        
        {/* SEURANTA - TAB */}
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

                    <div style={{ marginTop: '14px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      {t.savedWithSubstance}: <strong style={{ color: 'var(--text-color)' }}>{formatMoney(item.savedMoney, currency)}</strong>
                    </div>
                  </div>
                ))
              )}
            </section>
          </>
        )}

        {/* ARKI - TAB */}
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
            <div className="card-total-box" style={{ padding: '20px', borderRadius: '14px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', textAlign: 'center', marginTop: '20px' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{t.totalSpentRangeLabel} ({formatDate(moneyStartDate)} – {formatDate(todayStr)})</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: currentTheme.color }}>{formatMoney(totalLivingSpentRange, currency)}</div>
            </div>
          </section>
        )}

        {/* SÄÄSTÖT - TAB (KOHTEISEN ALOITUSPÄIVÄ JA KULUTUS) */}
        {activeTab === 'savings' && (
          <section className="card">
            <h2>{t.savingsTitle}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{t.formerCostDesc}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
              {substances.map(sub => (
                <div key={sub.id} style={{ background: 'var(--input-bg)', padding: '16px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '12px', color: currentTheme.color }}>
                    {sub.name}
                  </div>

                  <div className="form-group" style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '0.85rem' }}>{t.soberDateLabel}:</label>
                    <input 
                      type="date" 
                      value={sub.sober_date} 
                      max={todayStr} 
                      onChange={(e) => handleSoberDateChange(sub.id, e.target.value)} 
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '0' }}>
                    <label style={{ fontSize: '0.85rem' }}>Päivittäinen entinen kulu ({currency}):</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input 
                        type="number" 
                        value={sub.default_daily_cost} 
                        onChange={(e) => handleDefaultCostChange(sub.id, e.target.value)} 
                        style={{ flex: 1 }} 
                      />
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.formerCostInputLabel}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-total-box" style={{ padding: '20px', borderRadius: '14px', background: 'var(--card-bg)', border: '1px solid var(--border-color)', textAlign: 'center', marginTop: '24px' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{t.savedFromDateLabel}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '700', color: currentTheme.color }}>{formatMoney(totalSaved, currency)}</div>
            </div>
          </section>
        )}

        {/* UUSI - TAB */}
        {activeTab === 'add' && (
          <section className="card">
            <h2>{t.addTitle}</h2>
            <form onSubmit={handleAddSubstance}>
              <div className="form-group">
                <label>{t.substanceNameLabel}</label>
                <input type="text" value={newSubstanceName} onChange={(e) => setNewSubstanceName(e.target.value)} placeholder="Esim. Tupakka" required />
              </div>
              <div className="form-group">
                <label>{t.soberDateLabel}</label>
                <input type="date" value={newSoberDate} max={todayStr} onChange={(e) => setNewSoberDate(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>{t.dailyCostBeforeLabel}</label>
                <input type="number" value={newDailyCost} onChange={(e) => setNewDailyCost(e.target.value)} />
              </div>
              <button type="submit" className="btn-primary" style={{ backgroundColor: currentTheme.color }}>{t.addBtn}</button>
            </form>
          </section>
        )}

        {/* PÄIVÄKIRJA - TAB */}
        {activeTab === 'journal' && (
          <section className="card">
            <h2>{t.journalTitle}</h2>
            <div className="form-group" style={{ background: 'var(--input-bg)', padding: '14px', borderRadius: '14px', marginBottom: '14px' }}>
              <label style={{ fontWeight: '600' }}>{t.selectJournalDateLabel}</label>
              <input type="date" value={selectedJournalDate} max={todayStr} onChange={(e) => setSelectedJournalDate(e.target.value)} />
            </div>
            <form onSubmit={handleSaveJournalEntry}>
              <div className="form-group">
                <label style={{ fontWeight: '600' }}>{t.journalEntryFor} {formatDate(selectedJournalDate)}{t.journalEntrySuffix}</label>
                <textarea 
                  rows="5" 
                  value={journalText} 
                  onChange={(e) => setJournalText(e.target.value)} 
                  placeholder={t.journalPlaceholderToday}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'var(--input-bg)', color: 'var(--text-color)', border: '1px solid var(--border-color)', resize: 'vertical' }}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ backgroundColor: currentTheme.color }}>{t.saveJournalBtn}</button>
            </form>
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '12px' }}>{t.allEntriesTitle}</h3>
              {Object.keys(journalMap).length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>{t.noEntries}</p>
              ) : (
                Object.entries(journalMap).sort().reverse().map(([date, content]) => (
                  <div key={date} style={{ background: 'var(--input-bg)', padding: '14px', borderRadius: '12px', marginBottom: '10px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem', color: currentTheme.color, marginBottom: '6px' }}>{formatDate(date)}</div>
                    <div style={{ fontSize: '0.9rem', whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>{content}</div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* LINKIT - TAB */}
        {activeTab === 'links' && (
          <section className="card">
            <h2>{t.linksTitle}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{t.linksDesc}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="https://alcoholics-anonymous.eu/meetings"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--input-bg)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-color)',
                  textDecoration: 'none'
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '6px', color: currentTheme.color }}>
                  Alcoholics Anonymous (AA) Meetings ↗
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.85, lineHeight: '1.4' }}>
                  Löydä lähimmät AA-kokoukset ja vertaistukiryhmät alkoholismista toipumiseen.
                </div>
              </a>

              <a
                href="https://na.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--input-bg)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-color)',
                  textDecoration: 'none'
                }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '6px', color: currentTheme.color }}>
                  Narcotics Anonymous (NA) ↗
                </div>
                <div style={{ fontSize: '0.9rem', opacity: 0.85, lineHeight: '1.4' }}>
                  Kansainvälinen vertaistukiverkosto ja materiaalit toipumisen tueksi.
                </div>
              </a>
            </div>
          </section>
        )}

        {/* ASETUKSET - TAB */}
        {activeTab === 'settings' && (
          <section className="card">
            <h2>{t.settingsTitle}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>{t.settingsDesc}</p>
            
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>{t.nameChangeLabel}</label>
              <form onSubmit={handleUpdateName} style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  value={tempUsername} 
                  onChange={(e) => setTempUsername(e.target.value)} 
                  placeholder={t.nameChangePlaceholder}
                  style={{ flex: 1 }}
                  required 
                />
                <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '10px 16px', backgroundColor: currentTheme.color, margin: 0 }}>
                  {t.saveNameBtn}
                </button>
              </form>
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>{t.langLabel}</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="button" 
                  onClick={async () => {
                    setLanguage('fi')
                    await supabase.from('profiles').upsert({ id: session.user.id, username, birth_date: birthDate, language: 'fi' })
                  }}
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', backgroundColor: language === 'fi' ? currentTheme.color : 'var(--input-bg)', color: language === 'fi' ? '#fff' : 'var(--text-color)', border: '1px solid var(--border-color)', cursor: 'pointer', fontWeight: '600' }}
                >
                  Suomi
                </button>
                <button 
                  type="button" 
                  onClick={async () => {
                    setLanguage('en')
                    await supabase.from('profiles').upsert({ id: session.user.id, username, birth_date: birthDate, language: 'en' })
                  }}
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', backgroundColor: language === 'en' ? currentTheme.color : 'var(--input-bg)', color: language === 'en' ? '#fff' : 'var(--text-color)', border: '1px solid var(--border-color)', cursor: 'pointer', fontWeight: '600' }}
                >
                  English
                </button>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>{t.currencyLabel}</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setCurrency('EUR')}
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', backgroundColor: currency === 'EUR' ? currentTheme.color : 'var(--input-bg)', color: currency === 'EUR' ? '#fff' : 'var(--text-color)', border: '1px solid var(--border-color)', cursor: 'pointer', fontWeight: '600' }}
                >
                  EUR (€)
                </button>
                <button 
                  type="button" 
                  onClick={() => setCurrency('USD')}
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', backgroundColor: currency === 'USD' ? currentTheme.color : 'var(--input-bg)', color: currency === 'USD' ? '#fff' : 'var(--text-color)', border: '1px solid var(--border-color)', cursor: 'pointer', fontWeight: '600' }}
                >
                  USD ($)
                </button>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>{t.darkModeLabel}</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsDarkMode(false)}
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', backgroundColor: !isDarkMode ? currentTheme.color : 'var(--input-bg)', color: !isDarkMode ? '#fff' : 'var(--text-color)', border: '1px solid var(--border-color)', cursor: 'pointer', fontWeight: '600' }}
                >
                  {t.darkModeOptions.light}
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsDarkMode(true)}
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', backgroundColor: isDarkMode ? currentTheme.color : 'var(--input-bg)', color: isDarkMode ? '#fff' : 'var(--text-color)', border: '1px solid var(--border-color)', cursor: 'pointer', fontWeight: '600' }}
                >
                  {t.darkModeOptions.dark}
                </button>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '10px' }}>{t.themeLabel}</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {themeOptions.map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setSelectedThemeId(th.id)}
                    style={{
                      height: '48px',
                      borderRadius: '14px',
                      backgroundColor: th.color,
                      border: selectedThemeId === th.id ? '3px solid var(--text-color)' : '2px solid transparent',
                      cursor: 'pointer',
                      boxShadow: selectedThemeId === th.id ? '0 4px 12px rgba(0,0,0,0.2)' : 'none',
                      transition: 'transform 0.1s ease'
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>{t.notificationsLabel}</label>
              <button 
                type="button" 
                onClick={enableMobileNotifications}
                className="btn-primary"
                style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-color)', border: '1px solid var(--border-color)' }}
              >
                {t.enableNotificationsBtn}
              </button>
            </div>

            <div className="divider" style={{ margin: '20px 0', height: '1px', background: 'var(--border-color)' }}></div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button onClick={handleLogout} className="btn-primary" style={{ backgroundColor: 'var(--input-bg)', color: 'var(--text-color)', border: '1px solid var(--border-color)' }}>
                {t.logoutBtn}
              </button>
              <button onClick={handleDeleteAccount} className="btn-primary" style={{ backgroundColor: '#dc2626', color: '#fff' }}>
                {t.deleteAccountBtn}
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App