// Utilidad para combinar clases CSS
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
