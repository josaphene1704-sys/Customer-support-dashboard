import { useSyncExternalStore } from 'react'
import { CHART_COLORS } from '../utils/constants'

const isDark = () => document.documentElement.classList.contains('dark')

function subscribe(onChange) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

/** Returns the chart color set for the current theme and updates when the theme toggles. */
export function useChartTheme() {
  const dark = useSyncExternalStore(subscribe, isDark)
  return CHART_COLORS[dark ? 'dark' : 'light']
}
