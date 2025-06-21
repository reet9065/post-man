// utils/saveRequest.js

export async function saveRequest(reqObj) {
  try {
    const response = await fetch(`${import.meta.env.VITE_HOST}requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify({ reqObj }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to save request');
    }

    return { success: true, data };
  } catch (error) {
    console.error('saveRequest error:', error.message);
    return { success: false, error: error.message };
  }
}
