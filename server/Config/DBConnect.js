import Mongoose from 'mongoose'
function DBConnect(){
Mongoose.connect("mongodb+srv://swabahaavd121:2ES93iAWAAcn94CB@cluster0.ykczcfn.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log('DB Connected');})
.catch((err)=>{console.log('db error :',err);})
}
export default DBConnect