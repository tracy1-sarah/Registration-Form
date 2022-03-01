
const validate = (inputs) => {
    
    const errors = {};
    //required
    if(!inputs.name && !inputs.username && !inputs.email && !inputs.password){
        errors.inputs = 'Fields cannot be empty';
    }
    //email errors
    if(!inputs.email){
        errors.email = 'Check email'
    }else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/.test(inputs.email)){
        errors.email ='Invalid email address';
    }

    //password errors
    if(!inputs.password || inputs.password.length < 8){
        errors.password = 'Maximum length of password is six.'
    } 
  return errors;
   
}

export default validate