import { isEmail } from 'validator';
import mongoose, { Schema, Document } from "mongoose";
import { generatePasswordHash } from '../utils'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import parseISO from 'date-fns/parseISO'


export interface IUser extends Document {
    email?: string,
    fullname?: string,
    password?: string,
    confirmed?: boolean,
    avatar?: string,
    confirm_hash?: string,
    last_seen?: Date
}


//TODO: Create last visit
const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            validate: [isEmail, 'Invalid email'],
            unique: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        confirmed: {
            type: Boolean,
            default: false,
        },
        avatar: String,
        confirm_hash: String,
        last_seen: {
            type: Date,
            default: new Date()
        },
    },
    {
        timestamps: true,
    }
);
UserSchema.virtual('isOnline').get(function (this: any) {
    return differenceInMinutes(parseISO(new Date().toISOString()), this.last_seen) < 5
})

UserSchema.set("toJSON", {
    virtuals: true
})


UserSchema.pre('save', function (next) {
    const user: IUser = this;

    if (!user.isModified('password')) return next();


    generatePasswordHash(user.password).then((hash) => {
        user.password = String(hash);
        generatePasswordHash(+new Date() + "").then(confirmHash => {
            user.confirm_hash = String(confirmHash);
            next();
        })
    }).catch(err => {
        next(err)
    })
})

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
