import React, { useState } from "react";

const Modal = ({ currencyTo, setIsMoneyReceived, received }) => {
  return (
    <div>
      <div className="modal-overlay" onClick={() => setIsMoneyReceived(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <p className="text-black font-bold">You received</p>
          <h3>
            {currencyTo.currency}:{received}
          </h3>

          <button
            className="rounded bg-[#fcd34d] p-2 mt-6 text-black font-bold"
            onClick={() => setIsMoneyReceived(false)}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
