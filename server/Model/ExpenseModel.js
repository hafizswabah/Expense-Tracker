import Mongoose from "mongoose";

const ExpenseSchema = new Mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        default: "other",
    },
    description: {
        type: String,
        default: "chelavenne",
    },
    date: {
        type: Date,
        default: Date.now,
    },
     userId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
});

const ExpenseModel = Mongoose.model("Expenses", ExpenseSchema);

export default ExpenseModel;
