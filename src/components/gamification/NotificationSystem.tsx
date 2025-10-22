'use client'

import { useEffect, useState } from 'react'
import { X, Award, TrendingUp, Trophy, Flame, Star } from 'lucide-react'

export type NotificationType = 'xp' | 'level' | 'achievement' | 'streak' | 'badge'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  value?: number
  icon?: React.ReactNode
  duration?: number
}

interface NotificationSystemProps {
  notifications: Notification[]
  onDismiss: (id: string) => void
}

function NotificationCard({
  notification,
  onDismiss,
}: {
  notification: Notification
  onDismiss: () => void
}) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => onDismiss(), 300) // Wait for exit animation
    }, notification.duration || 5000)

    return () => clearTimeout(timer)
  }, [notification.duration, onDismiss])

  const getIcon = () => {
    if (notification.icon) return notification.icon

    switch (notification.type) {
      case 'xp':
        return <Star className="h-5 w-5" />
      case 'level':
        return <TrendingUp className="h-5 w-5" />
      case 'achievement':
        return <Trophy className="h-5 w-5" />
      case 'streak':
        return <Flame className="h-5 w-5" />
      case 'badge':
        return <Award className="h-5 w-5" />
      default:
        return <Star className="h-5 w-5" />
    }
  }

  const getColorClasses = () => {
    switch (notification.type) {
      case 'xp':
        return 'bg-blue-500 text-white'
      case 'level':
        return 'bg-purple-500 text-white'
      case 'achievement':
        return 'bg-yellow-500 text-white'
      case 'streak':
        return 'bg-orange-500 text-white'
      case 'badge':
        return 'bg-emerald-500 text-white'
      default:
        return 'bg-slate-500 text-white'
    }
  }

  return (
    <div
      className={`transform transition-all duration-300 ${
        isExiting
          ? 'translate-x-full opacity-0'
          : 'translate-x-0 opacity-100'
      }`}
    >
      <div className="mb-3 flex items-start gap-3 rounded-lg border bg-card p-4 shadow-lg">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${getColorClasses()}`}
        >
          {getIcon()}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">{notification.title}</h4>
          <p className="text-sm text-muted-foreground">{notification.message}</p>
          {notification.value !== undefined && (
            <p className="mt-1 text-lg font-bold">+{notification.value}</p>
          )}
        </div>
        <button
          onClick={() => {
            setIsExiting(true)
            setTimeout(onDismiss, 300)
          }}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default function NotificationSystem({
  notifications,
  onDismiss,
}: NotificationSystemProps) {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 w-96 max-w-full">
      <div className="pointer-events-auto">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onDismiss={() => onDismiss(notification.id)}
          />
        ))}
      </div>
    </div>
  )
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random()}`
    setNotifications((prev) => [...prev, { ...notification, id }])
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const addXPNotification = (xp: number) => {
    addNotification({
      type: 'xp',
      title: 'XP Gained!',
      message: `You earned ${xp} experience points`,
      value: xp,
    })
  }

  const addLevelNotification = (newLevel: number) => {
    addNotification({
      type: 'level',
      title: 'Level Up!',
      message: `You reached level ${newLevel}`,
      value: newLevel,
      duration: 7000,
    })
  }

  const addAchievementNotification = (achievementName: string) => {
    addNotification({
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: achievementName,
      duration: 7000,
    })
  }

  const addStreakNotification = (streak: number) => {
    addNotification({
      type: 'streak',
      title: `${streak}-Day Streak!`,
      message: `You're on fire! Keep it going!`,
      value: streak,
      duration: 6000,
    })
  }

  const addBadgeNotification = (badgeName: string) => {
    addNotification({
      type: 'badge',
      title: 'Badge Earned!',
      message: badgeName,
      duration: 7000,
    })
  }

  return {
    notifications,
    addNotification,
    dismissNotification,
    addXPNotification,
    addLevelNotification,
    addAchievementNotification,
    addStreakNotification,
    addBadgeNotification,
  }
}
