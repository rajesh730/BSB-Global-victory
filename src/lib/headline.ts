/** Headlines and labels read as titles, not sentences, so they never end in a full stop. Dashboard copy may still carry one. */
export function headline(text: string) {
  return text.trim().replace(/\.$/, '');
}
