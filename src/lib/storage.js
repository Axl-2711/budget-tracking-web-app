const STORAGE_KEYS = {
    TRANSACTIONS: 'budget_transactions',
    CATEGORIES: 'budget_categories',
    BUDGETS: 'budget_budgets',
};
const DEFAULT_CATEGORIES = [
    { id: '1', name: 'Salary', type: 'income', color: 'hsl(142, 76%, 36%)' },
    { id: '2', name: 'Freelance', type: 'income', color: 'hsl(199, 89%, 48%)' },
    { id: '3', name: 'Investments', type: 'income', color: 'hsl(262, 83%, 58%)' },
    { id: '4', name: 'Food & Dining', type: 'expense', color: 'hsl(0, 72%, 50%)' },
    { id: '5', name: 'Transportation', type: 'expense', color: 'hsl(25, 95%, 53%)' },
    { id: '6', name: 'Shopping', type: 'expense', color: 'hsl(340, 82%, 52%)' },
    { id: '7', name: 'Bills & Utilities', type: 'expense', color: 'hsl(215, 16%, 46%)' },
    { id: '8', name: 'Entertainment', type: 'expense', color: 'hsl(280, 65%, 60%)' },
    { id: '9', name: 'Healthcare', type: 'expense', color: 'hsl(172, 66%, 50%)' },
];
export const getTransactions = () => {
    const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return data ? JSON.parse(data) : [];
};
export const saveTransactions = (transactions) => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
};
export const getCategories = () => {
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (!data) {
        saveCategories(DEFAULT_CATEGORIES);
        return DEFAULT_CATEGORIES;
    }
    return JSON.parse(data);
};
export const saveCategories = (categories) => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
};
export const getBudgets = () => {
    const data = localStorage.getItem(STORAGE_KEYS.BUDGETS);
    return data ? JSON.parse(data) : [];
};
export const saveBudgets = (budgets) => {
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
};
export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
