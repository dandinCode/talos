export function getUserFirstName(user: any): string {

  if (!user?.name) return ''

  const firstName = user.name.split(' ')[0] || ''

  return capitalize(firstName)
}

function capitalize(text: string) {
  if (!text) return ''

  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export function getUserInitials(user: any): string {

  if (!user?.name) return ''

  const parts = user.name.trim().split(' ').filter(Boolean)

  if (parts.length === 0) return ''

  if (parts.length === 1) {
    return (parts[0]?.[0] || '').toUpperCase()
  }

  return ((parts[0]?.[0] || '') + (parts[parts.length - 1]?.[0] || '')).toUpperCase()
}

export function decodeUTF8(str: string) {
  try {
    return decodeURIComponent(escape(str))
  } catch {
    return str
  }
}
