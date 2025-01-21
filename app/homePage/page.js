'use client'
import HomeHeader from "../components/HomeHeader/index"
import HomeFooter from "../components/HomeFooter/index"
import MirrorList from "./MirrorList/page"
import OsDownload from "./Download/page"
import styles from './page.module.css'
import { useState } from "react"
function Home() {
  const [currentCategory, setCurrentCategory] = useState('os')
  const [currentView, setCurrentView] = useState('mirrorList')

  const handleCategorySelect = (category) => {
    console.log('App handling category:', category)
    setCurrentCategory(category)
    setCurrentView('osDownload')
  }

  const handleViewChange = (view) => {
    setCurrentView(view)
  }

  return (
    <div className={styles.container}>
      <HomeHeader 
        onCategorySelect={handleCategorySelect}
        onViewChange={handleViewChange}
      />
      <main>
        {currentView === 'mirrorList' ? (
          <MirrorList />
        ) : (
          <OsDownload category={currentCategory} />
        )}
      </main>
      <HomeFooter />
    </div>
  )
}

export default Home