export function getUserAvatar(name, size = 128) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=random&size=${size}`;
}
