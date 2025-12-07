import { useState, useEffect, useCallback } from 'react';
import { getTransactions, saveTransactions, getCategories, saveCategories, getBudgets, saveBudgets, generateId, } from '@/lib/storage';
export const useBudget = () => {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTransactions(getTransactions());
        setCategories(getCategories());
        setBudgets(getBudgets());
        setIsLoading(false);
    }, []);
    const addTransaction = useCallback((data) => {
        const newTransaction = {
            ...data,
            id: generateId(),
            createdAt: new Date().toISOString(),
        };
        const updated = [newTransaction, ...transactions];
        setTransactions(updated);
        saveTransactions(updated);
        return newTransaction;
    }, [transactions]);
    const updateTransaction = useCallback((id, data) => {
        const updated = transactions.map((t) => t.id === id ? { ...t, ...data } : t);
        setTransactions(updated);
        saveTransactions(updated);
    }, [transactions]);
    const deleteTransaction = useCallback((id) => {
        const updated = transactions.filter((t) => t.id !== id);
        setTransactions(updated);
        saveTransactions(updated);
    }, [transactions]);
    const addCategory = useCallback((data) => {
        const newCategory = { ...data, id: generateId() };
        const updated = [...categories, newCategory];
        setCategories(updated);
        saveCategories(updated);
        return newCategory;
    }, [categories]);
    const deleteCategory = useCallback((id) => {
        const updated = categories.filter((c) => c.id !== id);
        setCategories(updated);
        saveCategories(updated);
    }, [categories]);
    const addBudget = useCallback((data) => {
        const newBudget = { ...data, id: generateId() };
        const updated = [...budgets, newBudget];
        setBudgets(updated);
        saveBudgets(updated);
        return newBudget;
    }, [budgets]);
    const updateBudget = useCallback((id, data) => {
        const updated = budgets.map((b) => b.id === id ? { ...b, ...data } : b);
        setBudgets(updated);
        saveBudgets(updated);
    }, [budgets]);
    const deleteBudget = useCallback((id) => {
        const updated = budgets.filter((b) => b.id !== id);
        setBudgets(updated);
        saveBudgets(updated);
    }, [budgets]);
    const getTotalIncome = useCallback((month) => {
        return transactions
            .filter((t) => t.type === 'income' && (!month || t.date.startsWith(month)))
            .reduce((sum, t) => sum + t.amount, 0);
    }, [transactions]);
    const getTotalExpenses = useCallback((month) => {
        return transactions
            .filter((t) => t.type === 'expense' && (!month || t.date.startsWith(month)))
            .reduce((sum, t) => sum + t.amount, 0);
    }, [transactions]);
    const getBalance = useCallback((month) => {
        return getTotalIncome(month) - getTotalExpenses(month);
    }, [getTotalIncome, getTotalExpenses]);
    const getCategorySpending = useCallback((categoryName, month) => {
        return transactions
            .filter((t) => t.category === categoryName && t.type === 'expense' && (!month || t.date.startsWith(month)))
            .reduce((sum, t) => sum + t.amount, 0);
    }, [transactions]);
    return {
        transactions,
        categories,
        budgets,
        isLoading,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addCategory,
        deleteCategory,
        addBudget,
        updateBudget,
        deleteBudget,
        getTotalIncome,
        getTotalExpenses,
        getBalance,
        getCategorySpending,
    };
};
