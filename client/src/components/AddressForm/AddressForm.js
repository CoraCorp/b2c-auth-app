import React, { useRef } from 'react';
import { saveAddress } from '../../services/addressService';
import styles from './AddressForm.module.css';

const AddressForm = ({ address }) => {
  const formRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    const controls = Array.from(formRef.current.elements);
    const address = controls
      .filter(c => c.name)
      .reduce((acc, cur) => {
        acc[cur.name] = cur.value;
        return acc;
      }, {});
    saveAddress(address).then(res => console.log(res.status));
  }
  return (
    <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
      <label>
        Name
        <input name="name" defaultValue={address.name} />
      </label>
      <label>
        Street
        <input name="street" defaultValue={address.street} />
      </label>
      <label>
        Appartment/Suite/Room
        <input name="apt" defaultValue={address.apt} />
      </label>
      <label>
        City
        <input name="city" defaultValue={address.city} />
      </label>
      <label>
        State
        <input name="state" defaultValue={address.state} />
      </label>
      <label>
        Zip
        <input name="zip" defaultValue={address.zip} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default AddressForm;
