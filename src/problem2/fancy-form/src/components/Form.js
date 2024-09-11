import { useState, useEffect } from "react";

export default function Form({ from, to, setReceived, setIsMoneyReceived }) {
  const [amount, setAmount] = useState(0);
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (from === "Select currency" || to === "Select currency") return;
    const fromUsd = amount * from.price;
    const receive = fromUsd / to.price;
    setReceiveAmount(receive);
  }, [to]);

  function handleConfirmSwap(number) {
    setTimeout(() => {
      setReceived(number);
      closeModal();
      setAmount(0);
      setReceiveAmount(0);
      setIsMoneyReceived(true);
    }, 1000);
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h1>Swap</h1>
      <div className="caixa">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row justify-center items-center w-1/3">
            {from !== "Select currency" && (
              <img
                src={require(`./icons/${from.currency}.svg`)}
                alt={from.currency}
                width={24}
              />
            )}
            <h3>{from.currency}</h3>
          </div>
          <div>
            <h1>To</h1>
          </div>
          <div className="flex flex-row justify-center items-center w-1/3">
            {to !== "Select currency" && (
              <img
                src={require(`./icons/${to.currency}.svg`)}
                alt={to.currency}
                width={24}
              />
            )}
            <h3>{to.currency}</h3>
          </div>
        </div>
      </div>
      <div className="amount caixa">
        <div className="p-2">
          <label for="input-amount">
            <h1>Amount to send</h1>
          </label>
          <input
            id="input-amount"
            value={amount}
            type="number"
            onChange={(e) => {
              setAmount(Number(e.target.value));
              const toUsd = Number(e.target.value) * from.price;
              const receive = toUsd / to.price;
              setReceiveAmount(receive);
            }}
          />
        </div>
        <div className="p-2">
          <label for="output-amount">
            <h1>Amount to receive</h1>
          </label>
          <input
            id="output-amount"
            value={receiveAmount}
            type="number"
            onChange={(e) => {
              setReceiveAmount(Number(e.target.value));
              const toUsd2 = Number(e.target.value) * to.price;
              const send = toUsd2 / from.price;
              setAmount(send);
            }}
          />
        </div>
        <div>
          <button
            className="rounded bg-[#fcd34d] p-2 mt-6 text-black font-bold"
            onClick={openModal}
          >
            CONFIRM SWAP
          </button>
          {isModalOpen && (
            <div className="modal-overlay" onClick={closeModal}>
              <div
                className="modal-content text-black"
                onClick={(e) => e.stopPropagation()}
              >
                <p>Are you sure you want to swap?</p>
                <button
                  className="rounded bg-[#fcd34d] p-2 m-3 text-black font-bold"
                  onClick={() => handleConfirmSwap(receiveAmount)}
                >
                  Confirm
                </button>
                <button
                  className="rounded bg-white p-2 m-3 text-black font-bold"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
