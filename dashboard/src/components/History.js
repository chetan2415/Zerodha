import React, { useState, useEffect } from 'react';
import axios from 'axios';

function History() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const addFundsRes = await axios.get("http://localhost:5000/addFunds");
                const withdrawRes = await axios.get("http://localhost:5000/Withdraw");

                const addFundsData = addFundsRes.data.map(txn => ({
                    id: txn._id,
                    type: "Credit",
                    amount: txn.amount,
                    date: txn.createdAt,
                }));

                const withdrawData = withdrawRes.data.map(txn => ({
                    id: txn._id,
                    type: "Debit",
                    amount: txn.withdrawAmount,
                    date: txn.createdAt,
                }));

                const combinedData = [...addFundsData, ...withdrawData];
                combinedData.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date
                setTransactions(combinedData);
            } catch (error) {
                console.error("Error fetching transaction history:", error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <>
            <h3 className="title">Transaction History ({transactions.length})</h3>

            <div className="order-table">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Amount (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(txn => (
                            <tr key={txn.id}>
                                <td>
                                    {`${new Date(txn.date).toLocaleDateString()}   ,   ${new Date(txn.date).toLocaleTimeString()}`}
                                </td>
                                <td style={{
                                    fontWeight: txn.type === "Credit" ? "bold" : "normal",
                                    color: txn.type === "Credit" ? "#44FF7D" : "#FF3333"
                                }}>
                                    {txn.type}
                                </td>
                                <td style={{ fontSize: "18px", fontWeight: "bold" }}>
                                    {txn.amount.toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default History;
