import React, { useState } from 'react';

function AddAddressModal({ addAddress }){
  const [ethaddress, setEthaddress] = useState('');
  const [amount, setAmount] = useState(0);
  
  const add = () => {
    addAddress(ethaddress, amount);
    setEthaddress('');
    setAmount(0);
  }

  return(
    <div className="container my-5">
      <div className="modal fade" id="addAddressModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 class="modal-title">Add</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group mt-3 mb-4">
                <label className="text-muted font-weight-bold" htmlFor="text">Eth Address</label>
                <input
                  className="form-control"
                  name="Eth Address"
                  type="text"
                  placeholder="Eth Address"
                  onChange={e => setEthaddress(e.target.value)}
                  value={ethaddress} />
              </div>

              <div className="form-group mt-3 mb-4">
                <label className="text-muted font-weight-bold" htmlFor="text">Amount</label>
                <input
                    className="form-control"
                    name="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} 
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-light" data-dismiss="modal">Cancel</button>
              <button
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => add()}>
                  Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddAddressModal;