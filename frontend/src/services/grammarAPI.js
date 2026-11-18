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

export async function getGrammarTopics(categoryId) {
    const response = await fetch(`${API_URL}/grammar/categories/${categoryId}/topics`);

    if (!response.ok) {
        throw new Error(`Lỗi HTTP: ${response.status}`);
    }

    return response.json();
}

export async function getGrammarSections(categoryId) {
    const response = await fetch(`${API_URL}/grammar/categories/${categoryId}/sections`);

    if (!response.ok) {
        throw new Error(`Lỗi HTTP: ${response.status}`);
    }

    return response.json();
}
