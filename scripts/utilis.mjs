// ORGANIZING DATA
// 1. LOCAL STORAGE

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export async function getJSON(url) {
  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`HTTP error. Status: ${res.status}`);
    }
        
     const data = await res.json();
     return data;
  } catch (error) {
    console.error("Error fetching JSON:", error);
    throw null;
  }
}
