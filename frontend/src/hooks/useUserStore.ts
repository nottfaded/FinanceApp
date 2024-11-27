import { create } from "zustand"
import Bill from "../types/Bill";

export interface UserState {
    email: string;
    bills: Bill[];

    loading: boolean;

    isLogged: () => boolean;
    setUserData: (data: Partial<UserState>) => void;
    resetUserData: () => void;
    fetch: () => void;
    getBillTotal: () => number;
    updateBillsData: (index: number, newData: Partial<Bill>) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
    email: '',
    bills: [],
    loading: true,

    isLogged: () => get().email !== '',
    setUserData: (data: Partial<UserState>) => {
        set((state) => {
            const newState = { ...state, ...data };

            localStorage.setItem('userData', JSON.stringify(newState))

            return newState;
        });
    },
    resetUserData: () => {
        set({
            email: '',
            bills: [],
        });

        localStorage.removeItem('userData');
    },
    fetch(): void {
        const response = localStorage.getItem('userData');

        if (response) {
            const data = JSON.parse(response);
            get().setUserData(data);
        }

        get().loading = false;
    },
    getBillTotal(): number {
        const bills = get().bills.filter(i => i.inTotal);
        const total = bills.reduce((sum, item) => sum + item.amount, 0);

        return total;
    },
    updateBillsData(index, newData) {
        set((state) => {
            const updatedBills = [...state.bills];
            
            updatedBills[index] = { ...updatedBills[index], ...newData };

            return { ...state, bills: updatedBills };
        });
    }
}));

