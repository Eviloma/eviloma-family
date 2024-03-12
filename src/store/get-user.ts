export default async function getUser() {
  return fetch('/api/user').then((res) => res.json());
}
