export function snackEmoji(name: string) {
  switch (name.toLowerCase()) {
    case 'burger':
      return '🍔'
    case 'pizza':
      return '🍕'
    case 'drink':
      return '🥤'
    case 'desserts':
      return '🍨'
    default:
      return '✔'
  }
}
