export function getTitleCase(str?: string) {
  if (!str) {
    return "";
  }
  //   str = str.toLowerCase();
  //   str = str.split(" ");
  //   for (var i = 0; i < str.length; i++) {
  //     str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  //   }
  //   return str.join(" ");
  return str.toLowerCase().replace(/\b(\w)/g, (s) => s.toUpperCase());
}
