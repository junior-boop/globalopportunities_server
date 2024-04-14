export function FileConvertSize(aSize: number | string) {
  aSize = Math.abs(parseInt(aSize as string, 10));
  let def = [
    [1, "octets"],
    [1024, "ko"],
    [1024 * 1024, "Mo"],
    [1024 * 1024 * 1024, "Go"],
    [1024 * 1024 * 1024 * 1024, "To"],
  ];
  for (let i = 0; i < def.length; i++) {
    if (aSize < def[i][0]) {
      return (aSize / def[i - 1][0]).toFixed(2) + " " + def[i - 1][1];
    }
  }
}

export function secondsToMinutes(seconds: number): string {
  const float = seconds / 60;
  const entier = Math.floor(seconds / 60);
  if (entier > 60) {
    const heure = Math.floor(entier / 60);
    const reste = entier / 60 - heure;

    const minute = Math.floor(60 * reste);
    const value = 60 * reste - minute;

    const second =
      Math.floor(60 * value) <= 9
        ? `0${Math.floor(60 * value)}`
        : Math.floor(60 * value);
    const m = minute <= 9 ? `0${minute}` : minute;
    const h = heure <= 9 ? `0${heure}` : heure;

    return `${h}h ${m} ${second}`;
  }
  const decimal = float - entier;

  const second = Math.floor(60 * decimal);
  return `${entier}min ${second}s`;
}
