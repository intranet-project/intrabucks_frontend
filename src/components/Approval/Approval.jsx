import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');


const Approval = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setModalIsOpen(true)}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
              <span>결재 정보</span>
              <button onClick={() => setModalIsOpen(false)}>X</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', padding: '10px 0' }}>
              <div style={{ flex: 1, borderRight: '1px solid #ddd', padding: '10px' }}>
                <div>조직도</div>
                <ul>
                  <li>김상수 대표이사</li>
                  <li>각관 사장</li>
                  <li>이현준 상무</li>
                  <li>영업팀</li>
                  <li>경영지원팀</li>
                  <li>개발팀</li>
                  <li>서비스팀</li>
                </ul>
              </div>
              <div style={{ flex: 2, padding: '10px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <input type="text" placeholder="이름/직책/부서/조직" />
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th>타입</th>
                      <th>이름</th>
                      <th>부서</th>
                      <th>상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>개인</td>
                      <td>김상수</td>
                      <td>다우그룹</td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                  <button>결재 라인으로 저장</button>
                  <div>
                    <label>
                      <input type="radio" name="option" value="상무확인" />
                      상무확인
                    </label>
                    <label>
                      <input type="radio" name="option" value="반려됨" />
                      반려됨
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 0' }}>
              <button onClick={() => setModalIsOpen(false)}>확인</button>
              <button onClick={() => setModalIsOpen(false)}>취소</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  };
export default Approval;