import bcrypt from 'bcrypt';
const saltRounds =12;

const adminHash = async(password : string) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    password="";
    return hash;
}

const adminHashCompare= async(password:string,passwordHash:string)=>{
    let result = await bcrypt.compare(password,passwordHash);
    return result;
}
export {adminHash,adminHashCompare};