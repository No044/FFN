const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Định nghĩa schema cho bảng hóa đơn
const InvoiceSchema = new Schema({
    iduser: { type: String}, // Tham chiếu đến ID của người dùng
    fullName : {type : String},
    total: { type: Number }, // Tổng tiền hóa đơn
    email: { type: String }, // Email của người đặt hàng
    Phone: { type: String }, // Số điện thoại của người đặt hàng
    orderStatus: { type: String , default : "Waiting for Confirmation" }, // Trạng thái đơn hàng, mặc định là "Pending"
    orderDate: { type: Date, default: Date.now }, // Ngày đặt hàng, mặc định là ngày hiện tại
    paymentMethod: { type: String} ,// Phương thức thanh toán
    address: String,
    City : String
});

// Tạo model từ schema và xuất nó
const Invoice = mongoose.model('Invoice', InvoiceSchema,"invoices");

module.exports = Invoice;