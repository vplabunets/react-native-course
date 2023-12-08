import axios from "axios";
const BACKEND_URL =
  "https://expense-tracker-1f0f4-default-rtdb.europe-west1.firebasedatabase.app";

export async function storeExprense(expenseData) {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`,
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);

  const expenses = [];
  for (const key in response.data) {
    const exepenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(exepenseObj);
  }
  return expenses;
}

export async function updatedExpense(id, exepenseData) {
  const response = await axios.put(
    `${BACKEND_URL}/expenses/${id}.json`,
    exepenseData
  );
  return response;
}

export function deleteExpense(id) {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
}
