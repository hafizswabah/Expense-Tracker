import ExpenseModel from "../Model/ExpenseModel.js";
import UserModel from "../Model/UserModel.js";

export async function getExpense(req, res) {
    let _id = req.query.userId;

    try {
        let user = await UserModel.findOne({ _id }, { MonthlyExpense: 1 });

        if (user) {
            const MonthlyExpense = user.MonthlyExpense;
            res.json({ err: false, MonthlyExpense });
        } else {
            res.status(404).json({ err: true, message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: true, message: 'Internal server error' });
    }
}
export async function getCompleteExpense(req, res) {
    let _id = req.query.userId;

    try {
        let expenses = await ExpenseModel.find({ userId: _id },);
        res.json({ err: false, expenses });

    } catch (error) {
        console.error(error);
        res.status(500).json({ err: true, message: 'Internal server error' });
    }
}


export async function getTotalExpense(req, res) {
    const userId = req.query.userId;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Months are 0-indexed
    const currentYear = currentDate.getFullYear();

    try {
        // Define the start and end dates for the current month
        const startDate = new Date(currentYear, currentMonth, 1);
        const endDate = new Date(currentYear, currentMonth + 1, 0);

        // Find all documents for the specified user within the date range
        const totalExpense = await ExpenseModel.find({
            userId: userId,
            date: { $gte: startDate, $lte: endDate }
        });

        let totalspent = 0;
        totalExpense.map((item) => {
            totalspent += item.amount
        })
        res.json({ err: false, totalspent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: true, message: 'Internal server error' });
    }
}

export async function updateMonthlyExpense(req, res) {
    let { _id, monthlyExpense } = req.body
    try {
        let update = await UserModel.findByIdAndUpdate({ _id }, { MonthlyExpense: monthlyExpense });
        res.json({ err: false, message: "updated" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ err: true, message: 'Internal server error' });
    }
}
export async function addExpense(req, res) {
    let { expense, category, description, userId } = req.body
    try {
        let newExpense = new ExpenseModel({
            amount: expense,
            category,
            description,
            userId,
        })
        await newExpense.save()
        res.json({ err: false, message: "expense added" })

    } catch (error) {
        console.error(error);
        res.status(500).json({ err: true, message: 'Internal server error' });
    }
}