export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // hilangkan koma ,00
  }).format(amount);
}

export function formatRupiahTyping(num: string | number): string {
  if (!num) return "";
  const number =
    typeof num === "string" ? parseInt(num.replace(/\D/g, ""), 10) : num;
  if (isNaN(number)) return "";
  return "Rp. " + number.toLocaleString("id-ID");
}
