import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    api_key: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', UserSchema);
export default User;

