import API_URL from '../constant/apiConfig';

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

export async function getTopicById(id) {
  const response = await fetch(
    `${API_URL}/topics/${Number(id)}`
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Lỗi HTTP: ${response.status}`);
  }

  return response.json();
}