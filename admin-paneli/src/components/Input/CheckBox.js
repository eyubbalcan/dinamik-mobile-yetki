import React, { useState } from "react";

function CheckBox({ labelTitle, labelStyle, containerStyle, defaultValue, updateFormValue, updateType }) {
  const [checked, setChecked] = useState(defaultValue || false);

  const updateCheckboxValue = (isChecked) => {
    setChecked(isChecked);
    updateFormValue({ updateType, value: isChecked });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
      </label>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => updateCheckboxValue(e.target.checked)}
        className="checkbox"
      />
    </div>
  );
}

export default CheckBox;
