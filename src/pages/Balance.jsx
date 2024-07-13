import React, { useState, useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import NavBar from "../components/NavBar";
import Controls from "../components/controls/Controls";
import getBalances from "../libs/Balance/getBalances";
import dayjs from "dayjs";

export default function Balance() {
  const [currentMonthBalance, setCurrentMonthBalance] = useState({
    income: 0,
    expenses: 0,
    total: 0,
  });
  const [globalBalance, setGlobalBalance] = useState({
    income: 0,
    expenses: 0,
    total: 0,
  });
  const [isGlobal, setIsGlobal] = useState(false);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const { balances } = await getBalances();

        const currentMonth = dayjs().startOf("month").toISOString();

        const currentMonthData = balances.find(
          (b) => dayjs(b.month).startOf("month").toISOString() === currentMonth
        ) || { income: 0, expenses: 0 };

        const currentMonthTotal =
          currentMonthData.income - currentMonthData.expenses;
        setCurrentMonthBalance({
          income: currentMonthData.income,
          expenses: currentMonthData.expenses,
          total: currentMonthTotal,
        });

        const globalIncome = balances.reduce((sum, b) => sum + b.income, 0);
        const globalExpenses = balances.reduce((sum, b) => sum + b.expenses, 0);
        const globalTotal = globalIncome - globalExpenses;
        setGlobalBalance({
          income: globalIncome,
          expenses: globalExpenses,
          total: globalTotal,
        });
      } catch (error) {
        console.error("Error fetching balances:", error);
      }
    };

    fetchBalances();
  }, []);

  const handleSwitchBalance = () => {
    setIsGlobal(!isGlobal);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Container fixed>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h1>Balance {isGlobal ? "Global" : "Mes Actual"}</h1>
            </Grid>
            <Grid item xs={4}>
              <p>Ganancias</p>
              <Controls.MyBox
                text={`$ ${
                  isGlobal
                    ? globalBalance.income.toFixed(2)
                    : currentMonthBalance.income.toFixed(2)
                }`}
              />
            </Grid>
            <Grid item xs={4}>
              <p>Perdidas</p>
              <Controls.MyBox
                text={`$ ${
                  isGlobal
                    ? globalBalance.expenses.toFixed(2)
                    : currentMonthBalance.expenses.toFixed(2)
                }`}
              />
            </Grid>
            <Grid item xs={4}>
              <p>Balance</p>
              <Controls.MyBox
                text={`$ ${
                  isGlobal
                    ? globalBalance.total.toFixed(2)
                    : currentMonthBalance.total.toFixed(2)
                }`}
              />
            </Grid>
            <Grid item xs={12}>
              <Controls.MyButton
                text={isGlobal ? "Balance Mes Actual" : "Balance Global"}
                type="button"
                variant="outlined"
                onClick={handleSwitchBalance}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
