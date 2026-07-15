export const indianTimeZone = "Asia/Kolkata";

const indianDateFormatter = new Intl.DateTimeFormat("en-IN", {
  timeZone: indianTimeZone,
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

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

function getDateParts(value: Date | string | number): Record<string, string> | null {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return Object.fromEntries(
    indianDateFormatter.formatToParts(date).map((part) => [part.type, part.value]),
  );
}

export function formatIndianDate(value: Date | string | number): string {
  const parts = getDateParts(value);

  if (!parts) {
    return String(value);
  }

  return `${parts.day}/${parts.month}/${parts.year}`;
}

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
