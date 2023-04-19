const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ["Deposit", "Cash Back"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3 className="mt-3">{choice[Number(!isDeposit)]}</h3>
      <div className="form-inline form-group">
        <input
          id="number-input"
          type="number"
          width="200"
          className="form-control"
          onChange={onChange}
        ></input>
        <button
          type="submit"
          disabled={!isValid}
          width="200"
          value="Submit"
          className="btn btn-primary ml-2"
          id="submit-input"
        >
          Submit
        </button>
      </div>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    const val = Number(event.target.value);
    console.log(`handleChange ${val}`);
    if (val <= 0) {
      return setValidTransaction(false);
    }
    if (atmMode === "Cash Back" && val > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(val);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
  };

  const handleModeSelect = (e) => {
    let mode = e.target.value;
    setAtmMode(mode);
    if (mode)
      return mode === "Cash Back" ? setIsDeposit(false) : setIsDeposit(true);
  };

  return (
    <div>
      <div className="modal" style={{ display: "block" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{status}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Select an action below to continue.</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <select
                    onChange={(e) => handleModeSelect(e)}
                    name="mode"
                    id="mode-select"
                    className="form-control"
                  >
                    <option id="no-selection" value=""></option>
                    <option id="deposit-selection" value="Deposit">
                      Deposit
                    </option>
                    <option id="cashback-selection" value="Cash Back">
                      Cash Back
                    </option>
                  </select>
                  {atmMode && (
                    <ATMDeposit
                      onChange={handleChange}
                      isDeposit={isDeposit}
                      isValid={validTransaction}
                    ></ATMDeposit>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
