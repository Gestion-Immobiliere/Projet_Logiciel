// lib/api.js
export async function getMyProfile(token) {
  const res = await fetch('http://localhost:4000/api/user/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la récupération du profil");
  }

  return res.json();
}
