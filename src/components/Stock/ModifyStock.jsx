import React from 'react';


const modifyStock= () => {
  
}

const cancelStock= () => {
  
}

const DetailStock = () => {
  return (
    <div>
         <h1>재고 상세보기</h1>
               <div>
                   상품명
                   <input type="text" />
               </div>
               <div>
                   원자재ID
                   <input type="text" />
               </div>
               <div>
                   거래처 코드
                   <input type="text" />
               </div>

               <div>
                   <button onClick={modifyStock}>수정하기</button>
                   <button onClick={cancelStock}>취소</button>
               </div>

    </div>
   );

};

export default DetailStock;