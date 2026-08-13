// بتحوّل نص عادي (من غير أي HTML) لفقرات آمنة تتعرض في صفحة المقال
// كل سطرين فاضيين = فقرة جديدة، وسطر واحد جوه نفس الفقرة = سطر جديد
export function plainTextToHtml(text: string): string {
  const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, "<br/>")}</p>`)
    .join("\n");
}