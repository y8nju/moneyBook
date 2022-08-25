/* 

*/

import bcrypt from 'bcrypt';
! async function() {
    const plain = '1q2w3e4r';
    const salt = 10;
    
    // hash 비동기 callback
    bcrypt.hash(plain, salt, (err, data) => {
        // (암호화할 정보, 암호화 할 값, (에러였을 때, 성공했을 때))
        console.log('err = ', err);
        console.log('data=', data);
    })

    //async / await 암호화 시킬 때
    const result = await bcrypt.hash(plain, salt);
    console.log(result)

    // 확인할 때
    const check = await bcrypt.compare(plain, result);
    console.log(check);

}()