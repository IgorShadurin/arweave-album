import React, { useState } from 'react';
import { Modal, Input, Select, InputNumber, message } from 'antd';
import { addTransaction } from '../api';

const AddTransaction = ({ visible, closeModal }) => {
  const [coinName, setCoinName] = useState('');
  const [amount, setAmount] = useState(0);
  const [transactionType, setTransactionType] = useState('BUY');

  const submitForm = async () => {
    const transaction = { coinName, amount, transactionType };
    try {
      await addTransaction(transaction);
      closeModal();
    } catch (e) {
      message.error(`something went wrong, please try again.`);
    } finally {
      // reset form to its initial state
      setCoinName('');
      setAmount(0);
      setTransactionType('BUY');
    }
  };

  return (
    <Modal
      visible={visible}
      onOk={submitForm}
      onCancel={() => closeModal(null)}
    >
      <Input
        type="text"
        placeholder="Coin Name"
        onChange={event => setCoinName(event.target.value)}
        name="coin-name"
        required
      />
      <InputNumber
        placeholder="Amount"
        onChange={setAmount}
        name="rate"
        required
      />
      <Select
        style={{ width: 70 }}
        name="transaction-type"
        onChange={value => setTransactionType(value)}
        required
        defaultValue="BUY"
      >
        <Select.Option value="BUY">BUY</Select.Option>
        <Select.Option value="SELL">SELL</Select.Option>
      </Select>
    </Modal>
  );
};

export default AddTransaction;