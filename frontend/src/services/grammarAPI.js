import API_URL from '../constant/apiConfig';

export async function getGrammarCategories() {
    const response = await fetch(
        `${API_URL}/grammar/categories`
    );

    if (!response.ok) {
        throw new Error(`Lỗi HTTP: ${response.status}`);
    }

    return response.json();
}