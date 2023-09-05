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