import Mongoose from 'mongoose'
function DBConnect(){
Mongoose.connect("mongodb://localhost:27017/expenseTracker")
.then(()=>{console.log('DB Connected');})
.catch((err)=>{console.log('db error :',err);})
}
export default DBConnect