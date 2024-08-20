import React from 'react';

const BoardDetailModal = ({ detailData, isOpen, onClose }) => {
    if (!isOpen) return null;
    if (!detailData) {
        return (
            <div className="modal">
                <button onClick={onClose}>Close</button>
                <p>Loading...</p>
            </div>
        );
    }


    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <h2>게시판 상세보기</h2>
                    <div>ID: {detailData.boardId}</div>
                    <div>Title: {detailData.boardTitle}</div>
                    <div>Content: {detailData.boardContent}</div>
                    <div>Date: {detailData.boardDate}</div>
                    <div>File: {detailData.boardFile}</div>
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default BoardDetailModal;
