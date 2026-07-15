export const indianTimeZone = "Asia/Kolkata";

const indianDateTimeFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: indianTimeZone,
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export function formatIndianDateTime(value: Date | string | number = new Date()): string {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  const parts = Object.fromEntries(
    indianDateTimeFormatter.formatToParts(date).map((part) => [part.type, part.value]),
  );

  return `${parts.day}/${parts.month}/${parts.year} ${parts.hour}:${parts.minute}:${parts.second} IST`;
}

export function getIndianTimestamp(): string {
  return formatIndianDateTime(new Date());
}
