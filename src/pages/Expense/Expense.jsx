import React from "react";
import ExpenseHeader from "../../components/Main/ExpenseHeader";
import ExpenseTable from "../../components/NewExpense/ExpenseTable";
import UpcomingExpense from "../../components/NewExpense/UpcommingExpense";
const Expense = () => {
  return (
    <>
      <ExpenseHeader />
      <div className="flex gap-4 p-4">
        <div className="w-2/3 p-2">
          <div className="sticky top-0">
            <ExpenseTable />
          </div>
        </div>
        <div className="w-1/3 overflow-y-auto p-2 h-[calc(100vh-4rem)]">
          <UpcomingExpense />
        </div>
      </div>
    </>
  );
};

export default Expense;
