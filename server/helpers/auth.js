import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
  // return new Promise((resolve,reject)=>{
  //   bcrypt.genSalt(12,(err, salt)=>{
  //     if(err) reject(err)
  //     bcrypt.hash(password,salt, (err,hash)=>{
  //       if (err) reject(err)
  //       resolve(hash)
  //     });
  //   })
  // })
};
export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
