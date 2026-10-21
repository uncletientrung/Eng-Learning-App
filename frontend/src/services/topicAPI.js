import API_URL from './apiConfig';

export async function getTopics() {
  const response = await fetch(
    `${API_URL}/topics`
  );

  if (!response.ok) {
    throw new Error(`Lỗi HTTP: ${response.status}`);
  }

  return response.json();
}

export async function getTopicByModule(module_type) {
  const response = await fetch(
    `${API_URL}/topics/module/${module_type}`
  );

  if (!response.ok) {
    throw new Error(`Lỗi HTTP: ${response.status}`);
  }

  return response.json();
}